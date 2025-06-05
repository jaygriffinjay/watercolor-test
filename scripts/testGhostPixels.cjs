const sharp = require('sharp');
const fs = require('fs');

// Test the ghost pixel removal on one file
async function testGhostPixelRemoval() {
  const inputFile = './src/assets/high-res/watercolor-button-100x100-2563eb-10x.png';
  const outputFile = './test-ghost-removal.png';
  
  if (!fs.existsSync(inputFile)) {
    console.log('❌ No test file found. Put a 10x PNG in high-res folder first.');
    return;
  }

  console.log('🧪 Testing ghost pixel removal...');
  
  try {
    await sharp(inputFile)
      .resize(100, 100, { kernel: sharp.kernel.lanczos3, fit: 'fill' })
      .removeAlpha()
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        console.log(`📊 Processing ${info.width}x${info.height} pixels...`);
        
        const threshold = 150;
        let pixelsChanged = 0;
        let pixelsTotal = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const originalAlpha = data[i + 3];
          
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          
          if (brightness > threshold) {
            data[i + 3] = 0; // Make transparent
            pixelsChanged++;
          } else if (brightness > threshold - 30) {
            const alphaMultiplier = Math.max(0, (threshold - brightness) / 30);
            data[i + 3] = Math.round(255 * alphaMultiplier * alphaMultiplier * alphaMultiplier);
            if (data[i + 3] !== originalAlpha) pixelsChanged++;
          } else {
            data[i + 3] = 255;
            if (data[i + 3] !== originalAlpha) pixelsChanged++;
          }
        }
        
        console.log(`🎯 Changed ${pixelsChanged}/${pixelsTotal} pixels (${((pixelsChanged/pixelsTotal)*100).toFixed(1)}%)`);
        
        return sharp(data, {
          raw: { width: info.width, height: info.height, channels: 4 }
        })
        .png({ quality: 90, compressionLevel: 6, palette: false })
        .toFile(outputFile);
      });
    
    console.log(`✅ Test file created: ${outputFile}`);
    console.log('🔍 Compare this with the original to see if ghost pixels were removed.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testGhostPixelRemoval(); 