import os from 'node:os';
import path from 'node:path';

export function getHomeDir() {
  return process.env.HOME || process.env.USERPROFILE || os.homedir();
}

export function getXdgConfigHome() {
  if (process.env.XDG_CONFIG_HOME) return process.env.XDG_CONFIG_HOME;
  return path.join(getHomeDir(), '.config');
}

export function getAppDataDir() {
  if (process.env.APPDATA) return process.env.APPDATA;
  if (process.platform === 'darwin') {
    return path.join(getHomeDir(), 'Library', 'Application Support');
  }
  return path.join(getHomeDir(), 'AppData', 'Roaming');
}

export function resolvePathPattern(pattern, vars = {}, projectRoot = process.cwd()) {
  let resolved = pattern;
  for (const [k, v] of Object.entries(vars)) {
    resolved = resolved.replaceAll(`{${k}}`, v);
  }

  if (resolved.startsWith('~')) {
    resolved = path.join(getHomeDir(), resolved.slice(1));
  } else if (resolved.startsWith('%APPDATA%')) {
    resolved = path.join(getAppDataDir(), resolved.slice(9));
  } else if (!path.isAbsolute(resolved)) {
    resolved = path.resolve(projectRoot, resolved);
  }

  return path.normalize(resolved);
}
