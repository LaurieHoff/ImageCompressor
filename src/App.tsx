import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import CompressionControls from './components/CompressionControls';
import ImagePreview from './components/ImagePreview';
import { batchCompressImages, CompressionOptions, CompressedImage } from './utils/imageCompression';

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setCompressedImages([]);
  };

  const handleCompress = async (options: CompressionOptions) => {
    if (selectedFiles.length === 0) return;
    
    setIsCompressing(true);
    try {
      const compressed = await batchCompressImages(selectedFiles, options);
      setCompressedImages(compressed);
    } catch (error) {
      console.error('Compression failed:', error);
    }
    setIsCompressing(false);
  };

  const handleDownload = (image: CompressedImage) => {
    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = image.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    compressedImages.forEach((image, index) => {
      setTimeout(() => {
        handleDownload(image);
      }, index * 100);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Compressor</h1>
        <p>Compress your images with ease</p>
      </header>
      <main className="App-main">
        <FileUpload onFilesSelected={handleFilesSelected} />
        
        {selectedFiles.length > 0 && (
          <>
            <div className="selected-files">
              <h3>Selected Files ({selectedFiles.length})</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>

            <CompressionControls
              onCompress={handleCompress}
              isCompressing={isCompressing}
            />
          </>
        )}

        {compressedImages.length > 0 && (
          <ImagePreview
            images={compressedImages}
            onDownload={handleDownload}
            onDownloadAll={handleDownloadAll}
          />
        )}
      </main>
    </div>
  );
}

export default App;