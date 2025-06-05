const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './src/assets/high-res';     // Put your 10x PNGs here
const outputDir = './src/assets/compressed';   // Compressed versions go here
const targetScales = [1, 2, 3];              // Final scale multipliers (1x, 2x, 3x)

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function compressPNG(inputPath, outputPath, targetWidth, targetHeight) {
  try {
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        kernel: sharp.kernel.lanczos3,  // High-quality resampling
        fit: 'fill'
      })
      .ensureAlpha()  // Ensure alpha channel exists
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        // Target light pixels with low alpha (the actual ghost pixels)
        const lightPixelThreshold = 175; // Slightly less aggressive
        const lowAlphaThreshold = 75;    // Slightly lower alpha threshold
        let removedCount = 0;
        let totalPixels = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const originalAlpha = data[i + 3];
          
          totalPixels++;
          
          // Log first few pixels to see what we're working with
          if (totalPixels <= 5) {
            console.log(`Pixel ${totalPixels}: R=${r}, G=${g}, B=${b}, A=${originalAlpha}`);
          }
          
          // Target light blue pixels with low alpha (the real ghost pixels)
          if (b > lightPixelThreshold && originalAlpha < lowAlphaThreshold && originalAlpha > 0) {
            data[i + 3] = 0; // Make transparent
            removedCount++;
            if (removedCount <= 3) {
              console.log(`Removing light ghost pixel: R=${r}, G=${g}, B=${b}, A=${originalAlpha}`);
            }
          } else {
            // Keep original alpha value
            data[i + 3] = originalAlpha;
          }
        }
        
        console.log(`Processed ${totalPixels} pixels, removed ${removedCount} ghost pixels`);
        
        // Create new image from processed data
        return sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: 4
          }
        })
        .png({
          quality: 90,
          compressionLevel: 6,
          palette: false
        })
        .toFile(outputPath);
      });
    
    console.log(`✅ Created (simple ghost removal): ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function processAllPNGs() {
  if (!fs.existsSync(inputDir)) {
    console.log(`📁 Creating input directory: ${inputDir}`);
    fs.mkdirSync(inputDir, { recursive: true });
    console.log('📝 Place your 10x resolution PNGs in this folder and run the script again.');
    return;
  }

  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));
  
  if (files.length === 0) {
    console.log('🔍 No PNG files found in input directory.');
    return;
  }

  console.log(`🎨 Processing ${files.length} PNG files...`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    
    // Extract original dimensions from 10x filename (if available)
    const match = baseName.match(/(\d+)x(\d+)/);
    if (!match) {
      console.log(`⚠️  Skipping ${file} - couldn't parse dimensions from filename`);
      continue;
    }
    
    const originalWidth = parseInt(match[1]);
    const originalHeight = parseInt(match[2]);
    
    // Generate compressed versions at different scales
    for (const scale of targetScales) {
      const targetWidth = originalWidth * scale;
      const targetHeight = originalHeight * scale;
      const outputFile = `${baseName.replace(/10x|rasterized/, `${scale}x-compressed`)}.png`;
      const outputPath = path.join(outputDir, outputFile);
      
      await compressPNG(inputPath, outputPath, targetWidth, targetHeight);
    }
  }
  
  console.log('🎉 All done! Check the compressed folder for your optimized assets.');
}

// Run the script
processAllPNGs().catch(console.error); 