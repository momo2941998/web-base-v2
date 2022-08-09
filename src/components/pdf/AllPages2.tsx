import React from 'react'
// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance


export const AllPages2 = (props:{url: string}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (!props.url) return null
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
      <Viewer
      fileUrl={props.url}
      plugins={[
          defaultLayoutPluginInstance,
      ]}
      />
    </Worker>
  )
}
