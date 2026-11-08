import fs from 'node:fs';
import path from 'node:path';

export function getLockfilePath(projectRoot = process.cwd()) {
  return path.join(projectRoot, '.mr-agents', 'lock.json');
}

export function loadLockfile(projectRoot = process.cwd()) {
  const p = getLockfilePath(projectRoot);
  if (!fs.existsSync(p)) {
    return { version: '1.0.0', installations: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return { version: '1.0.0', installations: {} };
  }
}

export function saveLockfile(data, projectRoot = process.cwd()) {
  const p = getLockfilePath(projectRoot);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

export function backupPath(targetPath, projectRoot = process.cwd()) {
  if (!fs.existsSync(targetPath)) return null;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(projectRoot, '.mr-agents', 'backup', timestamp);
  fs.mkdirSync(backupDir, { recursive: true });

  const dest = path.join(backupDir, path.basename(targetPath));
  if (fs.statSync(targetPath).isDirectory()) {
    fs.cpSync(targetPath, dest, { recursive: true });
  } else {
    fs.copyFileSync(targetPath, dest);
  }
  return dest;
}
