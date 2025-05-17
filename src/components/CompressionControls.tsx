import React, { useState } from 'react';
import './CompressionControls.css';
import { CompressionOptions } from '../utils/imageCompression';

interface CompressionControlsProps {
  onCompress: (options: CompressionOptions) => void;
  isCompressing: boolean;
}

const CompressionControls: React.FC<CompressionControlsProps> = ({
  onCompress,
  isCompressing
}) => {
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState<number | ''>('');
  const [maxHeight, setMaxHeight] = useState<number | ''>('');
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

  const handleCompress = () => {
    const options: CompressionOptions = {
      quality,
      outputFormat,
      ...(maxWidth && { maxWidth: Number(maxWidth) }),
      ...(maxHeight && { maxHeight: Number(maxHeight) })
    };
    
    onCompress(options);
  };

  return (
    <div className="compression-controls">
      <h3>Compression Settings</h3>
      
      <div className="control-group">
        <label htmlFor="quality">
          Quality: {Math.round(quality * 100)}%
        </label>
        <input
          type="range"
          id="quality"
          min="0.1"
          max="1"
          step="0.1"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="format">Output Format:</label>
        <select
          id="format"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      <div className="size-controls">
        <h4>Resize Options (optional)</h4>
        
        <div className="size-inputs">
          <div className="input-group">
            <label htmlFor="maxWidth">Max Width:</label>
            <input
              type="number"
              id="maxWidth"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value ? Number(e.target.value) : '')}
              placeholder="Auto"
              min="1"
            />
            <span>px</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="maxHeight">Max Height:</label>
            <input
              type="number"
              id="maxHeight"
              value={maxHeight}
              onChange={(e) => setMaxHeight(e.target.value ? Number(e.target.value) : '')}
              placeholder="Auto"
              min="1"
            />
            <span>px</span>
          </div>
        </div>
      </div>

      <button
        className="compress-button"
        onClick={handleCompress}
        disabled={isCompressing}
      >
        {isCompressing ? 'Compressing...' : 'Compress Images'}
      </button>
    </div>
  );
};

export default CompressionControls;