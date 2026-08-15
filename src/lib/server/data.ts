import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

function resolveDataPath(filename: string) {
	const relativePath = `./data/${filename}`;
	const sourcePath = fileURLToPath(new URL(relativePath, import.meta.url));
	if (existsSync(sourcePath)) return sourcePath;

	const repoPath = path.join(process.cwd(), 'src', 'lib', 'server', 'data', filename);
	if (existsSync(repoPath)) return repoPath;

	throw new Error(`JSON data file not found: ${filename}`);
}

export function readJsonData<T>(filename: string): T {
	const dataPath = resolveDataPath(filename);
	return JSON.parse(readFileSync(dataPath, 'utf-8')) as T;
}
