const fs = require('fs');
const path = require('path');
const sharp = require('../client/node_modules/sharp');

const clientDir = path.resolve(__dirname, '../client');

async function convertDirectory(dirPath, targetExt = '.webp', maxWidth = 1200, maxHeight = 1200, quality = 82) {
  if (!fs.existsSync(dirPath)) {
    console.log('Directory not found:', dirPath);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  const converted = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const baseName = path.basename(file, ext);
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, `${baseName}${targetExt}`);

      try {
        const originalSize = fs.statSync(inputPath).size;
        
        await sharp(inputPath)
          .resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality, effort: 4 })
          .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const savings = Math.round(((originalSize - newSize) / originalSize) * 100);

        converted.push({
          oldName: file,
          newName: `${baseName}${targetExt}`,
          oldSize: (originalSize / 1024).toFixed(1) + ' KB',
          newSize: (newSize / 1024).toFixed(1) + ' KB',
          savings: `${savings}%`
        });

        // Delete the old heavy file
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }

  return converted;
}

async function run() {
  console.log('--- Converting Organic Images ---');
  const organicDir = path.join(clientDir, 'public/organic-images');
  const orgConverted = await convertDirectory(organicDir);
  console.log(`Organic: converted ${orgConverted.length} images.`);

  console.log('--- Converting Footwear Images ---');
  const footwearDir = path.join(clientDir, 'public/footwear-images');
  const ftConverted = await convertDirectory(footwearDir);
  console.log(`Footwear: converted ${ftConverted.length} images.`);

  console.log('--- Converting Gadgets Images ---');
  const gadgetsDir = path.join(clientDir, 'src/assets/gadgets');
  const gdConverted = await convertDirectory(gadgetsDir);
  console.log(`Gadgets: converted ${gdConverted.length} images.`);

  console.log('--- Cleaning Unused Fashion JPGs ---');
  const fashionDir = path.join(clientDir, 'public/fashion-images');
  if (fs.existsSync(fashionDir)) {
    const fashionFiles = fs.readdirSync(fashionDir);
    let deletedCount = 0;
    for (const f of fashionFiles) {
      if (/\.jpg$/i.test(f)) {
        const webpVersion = f.replace(/\.jpg$/i, '.webp');
        if (fs.existsSync(path.join(fashionDir, webpVersion))) {
          fs.unlinkSync(path.join(fashionDir, f));
          deletedCount++;
        }
      }
    }
    console.log(`Fashion: deleted ${deletedCount} duplicate heavy JPGs.`);
  }

  console.log('All image conversions complete!');
}

run();
