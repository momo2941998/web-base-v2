import React, { useState } from 'react';
import { AllPages2 } from '../components/pdf/AllPages2';
export const PDFViewer = () => {
  const [url, setUrl] = React.useState<string>('');

  // Handle the `onChange` event of the `file` input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      files && files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  return (
      <div>
          <input type="file" accept=".pdf" onChange={onChange} />
  
          <div style={{ height: '750px' }}>
              {url ? (
                  <div
                      style={{
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                          height: '100%',
                      }}
                  >
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
      </div>
  );
}
