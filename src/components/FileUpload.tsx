import React, { useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    onFilesSelected(imageFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div 
      className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="upload-content">
        <div className="upload-icon">📷</div>
        <h3>Drop your images here</h3>
        <p>or</p>
        <label className="upload-button">
          Choose Files
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </label>
        <p className="upload-info">
          Supports: JPEG, PNG, WebP
        </p>
      </div>
    </div>
  );
};

export default FileUpload;