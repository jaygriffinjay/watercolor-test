// Utility to export watercolor elements as static images
export const exportWatercolorAsset = async (
  elementSelector: string,
  filename: string = 'watercolor-asset.png',
  width: number = 800,
  height: number = 20
): Promise<void> => {
  try {
    // Find the element
    const element = document.querySelector(elementSelector) as HTMLElement;
    if (!element) {
      console.error('Element not found:', elementSelector);
      return;
    }

    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create an SVG with the watercolor filter applied to a rectangle
    const svgData = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${getWatercolorFilterDef()}
        </defs>
        <rect width="100%" height="100%" fill="black" 
              filter="url(#watercolor2)" 
              opacity="0.75"
              rx="${height/2}" />
      </svg>
    `;

    // Convert SVG to blob and then to image
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      // Draw to canvas
      ctx.drawImage(img, 0, 0);
      
      // Export as PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = filename;
          link.href = URL.createObjectURL(blob);
          link.click();
          
          // Cleanup
          URL.revokeObjectURL(url);
          URL.revokeObjectURL(link.href);
        }
      }, 'image/png');
    };
    
    img.src = url;
  } catch (error) {
    console.error('Failed to export watercolor asset:', error);
  }
};

// Helper to get the watercolor filter definition
const getWatercolorFilterDef = (): string => {
  return `
    <filter id="watercolor2">
      <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency=".0125" numOctaves="2" seed="1222" />
      <feTurbulence result="noise-md" type="fractalNoise" baseFrequency=".12" numOctaves="3" seed="11413" />
      <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.35" k4="-.05" />
      <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" />
      <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" />
      <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" />
      <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" />
      <feComposite result="glow" in="glow" in2="glow-diff" operator="out" />
      <feGaussianBlur result="glow" in="glow" stdDeviation="4" />
      <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" />
    </filter>
  `;
};

// Generate a set of watercolor divider assets
export const generateWatercolorDividerAssets = (): void => {
  const configs = [
    { filename: 'watercolor-divider-default.png', width: 800, height: 3 },
    { filename: 'watercolor-divider-thick.png', width: 800, height: 5 },
    { filename: 'watercolor-divider-thin.png', width: 800, height: 2 },
    { filename: 'watercolor-divider-wide.png', width: 1200, height: 4 },
  ];

  configs.forEach(config => {
    setTimeout(() => {
      exportWatercolorAsset('hr', config.filename, config.width, config.height);
    }, 500); // Small delay between exports
  });
}; 