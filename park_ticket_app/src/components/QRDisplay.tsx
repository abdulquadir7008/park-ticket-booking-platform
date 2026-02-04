import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from './Button';
import '../styles/QRDisplay.css';

/**
 * QRDisplay Component
 * Displays QR code with download functionality
 */
const QRDisplay = ({ value, size = 200, bookingId }) => {
  const qrRef = useRef(null);

  /**
   * Download QR code as image
   */
  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `ticket-${bookingId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="qr-display-container">
      <div className="qr-code" ref={qrRef}>
        <QRCodeSVG 
          value={value} 
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      <Button onClick={downloadQR} variant="secondary">
        Download QR Code
      </Button>
    </div>
  );
};

export default QRDisplay;