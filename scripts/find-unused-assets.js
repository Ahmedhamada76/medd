const fs = require('fs');
const path = require('path');

const roots = ['index.html', 'js', 'scripts', 'package.json', 'tailwind.config.js'];

function collectText(targetPath) {
  if (!fs.existsSync(targetPath)) return '';

  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    return fs.readdirSync(targetPath)
      .map((name) => collectText(path.join(targetPath, name)))
      .join('\n');
  }

  return fs.readFileSync(targetPath, 'utf8');
}

const text = roots.map(collectText).join('\n');
const refs = new Set();

for (const match of text.matchAll(/assets\/[^"'`)<]+/g)) {
  refs.add(match[0].trim());
}

function walkAssets(dirPath) {
  for (const name of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, name);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkAssets(fullPath);
      continue;
    }

    const relativePath = fullPath.split(path.sep).join('/');
    if (!refs.has(relativePath)) {
      console.log(relativePath);
    }
  }
}

walkAssets(path.join(process.cwd(), 'assets'));
