export interface CompressionOptions {
  quality: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: 'jpeg' | 'png' | 'webp';
}

export interface CompressedImage {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dataUrl: string;
}

export const compressImage = (
  file: File,
  options: CompressionOptions
): Promise<CompressedImage> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      
      // Calculate new dimensions if max width/height specified
      if (options.maxWidth && width > options.maxWidth) {
        height = (height * options.maxWidth) / width;
        width = options.maxWidth;
      }
      
      if (options.maxHeight && height > options.maxHeight) {
        width = (width * options.maxHeight) / height;
        height = options.maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      const outputFormat = options.outputFormat || 'jpeg';
      const mimeType = `image/${outputFormat}`;
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Compression failed'));
            return;
          }
          
          const compressedFile = new File([blob], 
            file.name.replace(/\.[^/.]+$/, `.${outputFormat}`),
            { type: mimeType }
          );
          
          const dataUrl = canvas.toDataURL(mimeType, options.quality);
          
          resolve({
            file: compressedFile,
            originalSize: file.size,
            compressedSize: blob.size,
            compressionRatio: Math.round((1 - blob.size / file.size) * 100),
            dataUrl
          });
        },
        mimeType,
        options.quality
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const batchCompressImages = async (
  files: File[],
  options: CompressionOptions
): Promise<CompressedImage[]> => {
  const results: CompressedImage[] = [];
  
  for (const file of files) {
    try {
      const compressed = await compressImage(file, options);
      results.push(compressed);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
    }
  }
  
  return results;
};