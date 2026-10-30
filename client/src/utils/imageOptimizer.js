// Client-Side Canvas Image Optimizer & WebP Converter
export async function optimizeImage(file, options = {}) {
  const {
    maxWidth = 1000,
    maxHeight = 1000,
    quality = 0.82
  } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    const originalSizeKB = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        let mimeType = 'image/webp';

        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          mimeType = 'image/jpeg';
        }

        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const optimizedSizeKB = Math.round((base64Length * 3) / 4 / 1024);
        const savingsPct = Math.max(0, Math.round(((originalSizeKB - optimizedSizeKB) / originalSizeKB) * 100));

        resolve({
          dataUrl,
          width,
          height,
          originalSizeKB,
          optimizedSizeKB,
          savingsPct: `${savingsPct}%`,
          format: mimeType
        });
      };

      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error('FileReader error.'));
    reader.readAsDataURL(file);
  });
}
