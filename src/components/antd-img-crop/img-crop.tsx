import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useEffect,
} from 'react';
import AntModal from 'antd/es/modal';
import type Cropper from 'react-easy-crop';
import type { ImgCropProps } from './types';
import type { EasyCropHandle } from './easy-crop';
import { PREFIX, INIT_ZOOM, INIT_ROTATE } from './constants';
import EasyCrop from './easy-crop';
import './img-crop.scss';

const ImgCrop = forwardRef<Cropper, ImgCropProps>((props, ref) => {
  const {
    aspect = 1,
    shape = 'rect',
    grid = false,
    quality = 0.4,
    fillColor = 'white',

    zoom = true,
    rotate = false,
    minZoom = 1,
    maxZoom = 3,

    modalTitle,
    modalWidth,
    modalOk,
    modalCancel,
    modalMaskTransitionName,
    modalTransitionName,
    modalClassName,
    onModalOk,
    onModalCancel,

    beforeCrop,
    cropperProps,
    image,
    onImageCroped,
  } = props;

  const [modalOpen, setModalOpen] = useState(true)
  useEffect(() => {
    if (!modalOpen) onImageCroped('')
  }, [modalOpen])
  
  const cb = useRef<
    Pick<
      ImgCropProps,
      'onModalOk' | 'onModalCancel' | 'beforeCrop' 
    >
  >({});
  cb.current.onModalOk = onModalOk;
  cb.current.onModalCancel = onModalCancel;
  cb.current.beforeCrop = beforeCrop;

  /**
   * Crop
   */
  const easyCropRef = useRef<EasyCropHandle>({} as EasyCropHandle);

  /**
   * Modal
   */
  const modalProps = useMemo(() => {
    let obj: any = {};
    if (modalWidth) obj["width"] = modalWidth
    if (modalOk) obj["okText"] = modalOk
    if (modalCancel) obj["cancelText"] = modalCancel
    if (modalMaskTransitionName) obj["maskTransitionName"] = modalMaskTransitionName
    if (modalTransitionName) obj["transitionName"] = modalTransitionName
    return obj;
  }, [
    modalCancel,
    modalMaskTransitionName,
    modalOk,
    modalTransitionName,
    modalWidth,
  ]);

  const onClose = () => {
    easyCropRef.current.setZoomVal(INIT_ZOOM);
    easyCropRef.current.setRotateVal(INIT_ROTATE);
  };

  const onCancel = useCallback(() => {
    cb.current.onModalCancel?.();
    setModalOpen(false)
    onClose();
  }, []);

  const onOk = useCallback(async () => {
    onClose();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("cannot call canvas.getContext")
    const imgSource = document.querySelector(
      `.${PREFIX}-media`
    ) as CanvasImageSource & {
      naturalWidth: number;
      naturalHeight: number;
    };
    const {
      width: cropWidth,
      height: cropHeight,
      x: cropX,
      y: cropY,
    } = easyCropRef.current.cropPixelsRef.current;

    if (rotate && easyCropRef.current.rotateVal !== INIT_ROTATE) {
      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource;
      const angle = easyCropRef.current.rotateVal * (Math.PI / 180);

      // get container for rotated image
      const sine = Math.abs(Math.sin(angle));
      const cosine = Math.abs(Math.cos(angle));
      const squareWidth = imgWidth * cosine + imgHeight * sine;
      const squareHeight = imgHeight * cosine + imgWidth * sine;

      canvas.width = squareWidth;
      canvas.height = squareHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, squareWidth, squareHeight);

      // rotate container
      const squareHalfWidth = squareWidth / 2;
      const squareHalfHeight = squareHeight / 2;
      ctx.translate(squareHalfWidth, squareHalfHeight);
      ctx.rotate(angle);
      ctx.translate(-squareHalfWidth, -squareHalfHeight);

      // draw rotated image
      const imgX = (squareWidth - imgWidth) / 2;
      const imgY = (squareHeight - imgHeight) / 2;
      ctx.drawImage(
        imgSource,
        0,
        0,
        imgWidth,
        imgHeight,
        imgX,
        imgY,
        imgWidth,
        imgHeight
      );

      // crop rotated image
      const imgData = ctx.getImageData(0, 0, squareWidth, squareHeight);
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.putImageData(imgData, -cropX, -cropY);
    } else {
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, cropWidth, cropHeight);

      ctx.drawImage(
        imgSource,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
    }

    // get the new image
    // const { type, name, uid } = fileRef.current;
    let imageUrl = canvas.toDataURL("png")
    onImageCroped(imageUrl)
    setModalOpen(false)
  }, [fillColor, quality, rotate]);

  const getComponent = (titleOfModal: React.ReactNode) => (
    <>
        <AntModal
          visible={modalOpen}
          wrapClassName={`${PREFIX}-modal ${modalClassName || ''}`}
          title={titleOfModal}
          onOk={onOk}
          onCancel={onCancel}
          maskClosable={false}
          destroyOnClose
          {...modalProps}
        >
          <EasyCrop
            ref={easyCropRef}
            cropperRef={ref}
            image={image}
            aspect={aspect}
            shape={shape}
            grid={grid}
            zoom={zoom}
            rotate={rotate}
            minZoom={minZoom}
            maxZoom={maxZoom}
            cropperProps={cropperProps||{}}
          />
        </AntModal>
    </>
  );

  return getComponent(modalTitle||"Edit Image");
});

export { ImgCrop }