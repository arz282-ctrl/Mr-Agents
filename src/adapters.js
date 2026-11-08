import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolvePathPattern, getHomeDir } from './paths.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADAPTERS_ROOT = path.resolve(__dirname, '..', 'adapters');

export function loadAllAdapters() {
  if (!fs.existsSync(ADAPTERS_ROOT)) return [];
  const entries = fs.readdirSync(ADAPTERS_ROOT, { withFileTypes: true });
  const adapters = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const adapterFile = path.join(ADAPTERS_ROOT, entry.name, 'adapter.json');
      if (fs.existsSync(adapterFile)) {
        try {
          const cfg = JSON.parse(fs.readFileSync(adapterFile, 'utf-8'));
          adapters.push(cfg);
        } catch (e) {
          // ignore corrupted adapters
        }
      }
    }
  }

  adapters.sort((a, b) => a.id.localeCompare(b.id));
  return adapters;
}

export function getAdapter(id) {
  const adapters = loadAllAdapters();
  return adapters.find(a => a.id.toLowerCase() === id.toLowerCase()) || null;
}

export function isBinaryOnPath(binName) {
  try {
    const cmd = process.platform === 'win32' ? `where ${binName}` : `command -v ${binName}`;
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function detectInstalledAgents(projectRoot = process.cwd()) {
  const adapters = loadAllAdapters();
  const detected = [];

  for (const a of adapters) {
    let found = false;
    const reasons = [];

    // Check binaries
    if (a.detection?.binaries) {
      for (const bin of a.detection.binaries) {
        if (isBinaryOnPath(bin)) {
          found = true;
          reasons.push(`binary '${bin}' found on PATH`);
        }
      }
    }

    // Check detection paths
    if (a.detection?.paths) {
      for (const p of a.detection.paths) {
        const resolved = resolvePathPattern(p, {}, projectRoot);
        if (fs.existsSync(resolved)) {
          found = true;
          reasons.push(`path exists: ${p}`);
        }
      }
    }

    // Special fallback for generic: always available
    if (a.id === 'generic') {
      detected.push({ adapter: a, detected: true, reasons: ['universal standard AGENTS.md fallback'] });
      continue;
    }

    detected.push({
      adapter: a,
      detected: found,
      reasons
    });
  }

  return detected;
}
