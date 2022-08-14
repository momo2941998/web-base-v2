import React from 'react'
// Core viewer
import { RenderPageProps, Viewer, Worker } from '@react-pdf-viewer/core';
import { version } from 'pdfjs-dist'

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance


const renderPage = (props: RenderPageProps) => {
  return (
      <>
          {props.canvasLayer.children}
          {props.textLayer.children}
          {props.annotationLayer.children}
      </>
  );
};

export const AllPages2 = (props:{url: string}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (!props.url) return null
  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.js`}>
      <Viewer
      fileUrl={props.url}
      plugins={[
          defaultLayoutPluginInstance,
      ]}
      renderPage={renderPage}
      />
    </Worker>
  )
}
