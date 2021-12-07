import React, { useRef } from 'react';
import PdfjsLib from 'pdfjs-dist';

interface PdfPreviewProps {
  className?: string;
  style?: React.CSSProperties;
  fileUrl: string;
}

function PdfPreview(props: PdfPreviewProps) {
  const {
    className = '',
    style,
    fileUrl,
  } = props;

  const canvasRef = useRef(null);

  PdfjsLib.getDocument(fileUrl)
    .promise
    .then(pdf => {
      console.log('pdf info:', pdf);
      pdf
        .getPage(1)
        .then(page => {
          const scale = 1.0;
          const viewport = page.getViewport({ scale });
          if (!canvasRef.current) {
            return;
          }
          // const context = canvasRef.current.getContext('2d');
        });
    })
    .catch(err => {
      console.error('Get pdf document failed:', err);
    })

  return (
    <div className={className} style={style}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default PdfPreview;
