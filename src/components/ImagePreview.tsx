import React from 'react';
import './ImagePreview.css';
import { CompressedImage } from '../utils/imageCompression';

interface ImagePreviewProps {
  images: CompressedImage[];
  onDownload: (image: CompressedImage) => void;
  onDownloadAll: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onDownload,
  onDownloadAll
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (images.length === 0) return null;

  return (
    <div className="image-preview-container">
      <div className="preview-header">
        <h3>Compressed Images ({images.length})</h3>
        <button 
          className="download-all-btn"
          onClick={onDownloadAll}
        >
          Download All
        </button>
      </div>
      
      <div className="images-grid">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <div className="image-thumbnail">
              <img 
                src={image.dataUrl} 
                alt={`Compressed ${image.file.name}`}
              />
            </div>
            
            <div className="image-info">
              <h4>{image.file.name}</h4>
              
              <div className="size-comparison">
                <div className="size-row">
                  <span className="label">Original:</span>
                  <span className="size">{formatFileSize(image.originalSize)}</span>
                </div>
                <div className="size-row">
                  <span className="label">Compressed:</span>
                  <span className="size">{formatFileSize(image.compressedSize)}</span>
                </div>
                <div className="size-row compression-ratio">
                  <span className="label">Saved:</span>
                  <span className="ratio">{image.compressionRatio}%</span>
                </div>
              </div>
              
              <button 
                className="download-btn"
                onClick={() => onDownload(image)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;