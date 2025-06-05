export const rasterizeSVG = (
  svgString: string, 
  width: number, 
  height: number,
  scale: number = 6
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a canvas with scaled dimensions
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    // Set canvas size (scaled up for quality)
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    // Create an image from the SVG
    const img = new Image();
    
    img.onload = () => {
      // Draw the SVG to canvas at scaled size
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert to PNG data URL
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load SVG'));
    };
    
    // Convert SVG string to data URL and load it
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
    
    // Clean up the URL after loading
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
  });
};

export const downloadPNG = (dataURL: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 