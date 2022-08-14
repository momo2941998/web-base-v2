import { Image, Modal, Slider, Upload } from 'antd';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { AllPages2 } from '../components/pdf/AllPages2';
import { useScreenshot } from '../hook/useScreenShot';
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { ImgCrop } from '../components/antd-img-crop/img-crop';
export const PDFViewer = () => {
  const [url, setUrl] = useState('');
  const [image, takeScreenShot, reset] = useScreenshot()
  const ref = createRef<HTMLDivElement>()
  const [modalVisibled, setModalVisibled] = useState(false)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  // Handle the `onChange` event of the `file` input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      files && files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  const getImage = () => {
    return ref.current && takeScreenShot(ref.current)
  }

  useEffect(() => {
    if (image) setModalVisibled(true)
  }, [image])
  
  const handleModalOk = () => {
    setModalVisibled(false)
    console.log("sendImage...", image)
    reset()
  }

  const handleModalCancel = () => {
    setModalVisibled(false)
    reset()
  }
  return (
      <div>
          <input type="file" accept=".pdf" onChange={onChange} />
  
          <div style={{ height: '750px' }}>
              {url ? (
                  <div ref={ref}
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '100%',
                  }}
                  >
                    <button onClick={() => getImage()}>
                      Capture
                    </button>
                    <AllPages2
                      url={url}
                    />
                  </div>
              ) : (
                  <div
                      style={{
                          alignItems: 'center',
                          border: '2px dashed rgba(0, 0, 0, .3)',
                          display: 'flex',
                          fontSize: '2rem',
                          height: '100%',
                          justifyContent: 'center',
                          width: '100%',
                      }}
                  >
                      Preview area
                  </div>
              )}
          </div>
          {image && (
            <ImgCrop
              image={image}
              onImageCroped={(image) => { console.log(image); reset()}}
              minZoom={1}
              maxZoom={4}
              zoom={true}
              modalWidth={'80%'}
              aspect={16/9}
              rotate={false}
             />

          )}
      </div>
  );
  
}
