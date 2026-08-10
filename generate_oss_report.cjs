const fs = require('fs');
const path = require('path');

const root = process.cwd();
const nodeModulesDir = path.join(root, 'node_modules');
const outputFile = path.join(root, 'oss.md');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.bin' || entry.name === '.cache' || entry.name === 'dist' || entry.name === 'docs' || entry.name === 'test' || entry.name === 'tests' || entry.name === 'example' || entry.name === 'examples') {
        continue;
      }
      walk(fullPath, out);
    } else if (entry.isFile() && entry.name === 'package.json') {
      out.push(fullPath);
    }
  }
  return out;
}

const packageJsonFiles = walk(nodeModulesDir);
const packages = [];
const seen = new Set();

for (const file of packageJsonFiles) {
  try {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!pkg.name) continue;
    const key = `${pkg.name}@${pkg.version || 'unknown'}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const license = pkg.license || pkg.licenses?.[0]?.type || 'unknown';
    packages.push({ name: pkg.name, version: pkg.version || 'unknown', license });
  } catch {
    // ignore invalid package.json files
  }
}

packages.sort((a, b) => a.name.localeCompare(b.name));

const lines = [
  '# OSS一覧',
  '',
  '| Package | Version | License |',
  '| --- | --- | --- |'
];

for (const pkg of packages) {
  lines.push(`| ${pkg.name} | ${pkg.version} | ${pkg.license} |`);
}

fs.writeFileSync(outputFile, lines.join('\n') + '\n');
console.log(`Wrote ${packages.length} packages to ${path.relative(root, outputFile)}`);
