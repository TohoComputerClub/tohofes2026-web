// Temporary mitigation for GHSA-gcqx-w48m-w2h4 until upstream publishes a fix.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import path from 'node:path';
const root = path.dirname(require.resolve('deepmerge/package.json'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (pkg.version !== '4.3.1') {
	throw new Error('Review the deepmerge security patch for the new version');
}
for (const file of ['index.js', 'dist/cjs.js', 'dist/umd.js']) {
	const location = path.join(root, file);
	let source = fs.readFileSync(location, 'utf8');
	for (const input of ['target', 'source']) {
		const original = `getKeys(${input}).forEach(function(key) {`;
		const patched = `${original}\n\t\t\tif (key === '__proto__' || key === 'constructor' || key === 'prototype') return; // GHSA-gcqx-w48m-w2h4`;
		if (source.includes(patched)) continue;
		if (source.split(original).length !== 2) {
			throw new Error(`Unexpected deepmerge source in ${file}; review security patch`);
		}
		source = source.replace(original, patched);
	}
	fs.writeFileSync(location, source);
}
