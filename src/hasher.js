import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function computeFolderSha256(folderPath) {
  if (!fs.existsSync(folderPath)) return null;
  const fileHashes = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const rel = path.relative(folderPath, fullPath).split(path.sep).join('/');
        const h = hashFile(fullPath);
        fileHashes.push(`${rel}:${h}`);
      }
    }
  }

  walk(folderPath);
  fileHashes.sort();
  return crypto.createHash('sha256').update(fileHashes.join('\n')).digest('hex');
}
