import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'fashion-images');
const files = fs.readdirSync(imagesDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

console.log(`Found ${files.length} images to optimize into WebP...`);

let totalOriginalBytes = 0;
let totalWebpBytes = 0;

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const baseName = path.parse(file).name;
  const outputPath = path.join(imagesDir, `${baseName}.webp`);

  const statOriginal = fs.statSync(inputPath);
  totalOriginalBytes += statOriginal.size;

  await sharp(inputPath)
    .webp({ quality: 85, effort: 4 })
    .toFile(outputPath);

  const statWebp = fs.statSync(outputPath);
  totalWebpBytes += statWebp.size;

  const origKB = Math.round(statOriginal.size / 1024);
  const webpKB = Math.round(statWebp.size / 1024);
  const savings = Math.round(((statOriginal.size - statWebp.size) / statOriginal.size) * 100);

  console.log(`✓ ${file}: ${origKB}KB -> ${webpKB}KB (${savings}% savings)`);
}

const totalOrigMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
const totalWebpMB = (totalWebpBytes / (1024 * 1024)).toFixed(2);
const totalSavings = Math.round(((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100);

console.log(`\n🎉 Conversion complete! Total: ${totalOrigMB}MB -> ${totalWebpMB}MB (${totalSavings}% overall bandwidth savings)`);
