import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
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
        )}
      </main>
    </div>
  );
}

export default App;