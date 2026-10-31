const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../client/src');

function updateFile(filePath, searchRegex, replacement) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content.replace(searchRegex, replacement);
  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated: ${path.relative(srcDir, filePath)}`);
  }
}

function processAllSrcFiles(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      processAllSrcFiles(full);
    } else if (/\.(jsx?|tsx?)$/.test(f)) {
      let content = fs.readFileSync(full, 'utf8');
      let changed = false;

      // Replace /organic-images/...jpg with ...webp
      if (/\/organic-images\/[^'\"`\s]+\.jpg/i.test(content)) {
        content = content.replace(/(\/organic-images\/[^'\"`\s]+)\.jpg/gi, '$1.webp');
        changed = true;
      }

      // Replace /footwear-images/...jpg with ...webp
      if (/\/footwear-images\/[^'\"`\s]+\.jpg/i.test(content)) {
        content = content.replace(/(\/footwear-images\/[^'\"`\s]+)\.jpg/gi, '$1.webp');
        changed = true;
      }

      // Replace gadgets imports from .jpg to .webp
      if (/assets\/gadgets\/[^'\"`\s]+\.jpg/i.test(content)) {
        content = content.replace(/(assets\/gadgets\/[^'\"`\s]+)\.jpg/gi, '$1.webp');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(full, content, 'utf8');
        console.log(`Processed: ${path.relative(srcDir, full)}`);
      }
    }
  }
}

processAllSrcFiles(srcDir);
console.log('Image reference updates complete!');
