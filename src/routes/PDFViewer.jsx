// import React, { useState } from 'react';
// import { AllPages2 } from '../components/pdf/AllPages2';
// import { Test } from './Test';
// export const PDFViewer = () => {
//   const [url, setUrl] = React.useState<string>('');

//   // Handle the `onChange` event of the `file` input
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const files = e.target.files;
//       files && files.length > 0 && setUrl(URL.createObjectURL(files[0]));
//   };

//   // return (
//   //     <div>
//   //         <input type="file" accept=".pdf" onChange={onChange} />
  
//   //         <div style={{ height: '750px' }}>
//   //             {url ? (
//   //                 <div
//   //                     style={{
//   //                         border: '1px solid rgba(0, 0, 0, 0.3)',
//   //                         height: '100%',
//   //                     }}
//   //                 >
//   //                   <AllPages2 
//   //                     url={url}
//   //                   />
//   //                 </div>
//   //             ) : (
//   //                 <div
//   //                     style={{
//   //                         alignItems: 'center',
//   //                         border: '2px dashed rgba(0, 0, 0, .3)',
//   //                         display: 'flex',
//   //                         fontSize: '2rem',
//   //                         height: '100%',
//   //                         justifyContent: 'center',
//   //                         width: '100%',
//   //                     }}
//   //                 >
//   //                     Preview area
//   //                 </div>
//   //             )}
//   //         </div>
//   //     </div>
//   // );
  
// }

import React from 'react';
import ScreenCapture from '../components/pdf/ScreenCapture';

export class PDFViewer extends React.Component {
  state = {
    screenCapture: '',
  };

  handleScreenCapture = (screenCapture) => {
    this.setState({screenCapture});
  };

  handleSave = () => {
    const screenCaptureSource = this.state.screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  render() {
    const { screenCapture } = this.state;

    return (
      <div>
      <ScreenCapture onEndCapture={this.handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <button onClick={onStartCapture}>Capture</button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              distinctio exercitationem a tempore delectus ducimus necessitatibus
              dolor voluptatum aut est quaerat aspernatur, vero quod aperiam odio.
              Exercitationem distinctio in voluptates?
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut molestiae
              deserunt voluptas, labore a expedita error eligendi sunt fugit, nesciunt
              ullam corrupti quas natus, officia rerum? Officia cum amet quidem.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, iusto
              repellat quae quos in rerum sunt obcaecati provident placeat hic saepe
              possimus eaque repellendus consequuntur quisquam nihil, sit ullam
              ratione.
            </p>
            <div>
              <img src={screenCapture} alt='react-screen-capture' />
              <p>
                {screenCapture && <button onClick={this.handleSave}>Download</button>}
              </p>
            </div>
          </div>
        )}
      </ScreenCapture>
                    
      </div>
    );
  }
}