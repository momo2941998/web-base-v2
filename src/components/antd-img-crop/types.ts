import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type Cropper from 'react-easy-crop';
import type { CropperProps } from 'react-easy-crop';

export interface ImgCropProps {
  image: string;
  onImageCroped: (image: string) => void;
  aspect?: number;
  shape?: 'rect' | 'round';
  grid?: boolean;
  quality?: number;
  fillColor?: string;

  zoom?: boolean;
  rotate?: boolean;
  minZoom?: number;
  maxZoom?: number;

  modalTitle?: string;
  modalWidth?: number | string;
  modalOk?: string;
  modalCancel?: string;
  modalMaskTransitionName?: string;
  modalClassName?: string;
  modalTransitionName?: string;
  onModalOk?: (file: void | boolean | string | Blob | File) => void;
  onModalCancel?: () => void;

  beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  cropperProps?: Partial<CropperProps>;
}

declare const ImgCrop: ForwardRefExoticComponent<
  ImgCropProps & RefAttributes<Cropper>
>;
export default ImgCrop;