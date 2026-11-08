import test from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalog, loadPacks } from '../src/catalog.js';
import { loadAllAdapters } from '../src/adapters.js';
import { installSkills } from '../src/installer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

test('full-corpus: python normalize.py verifies 276/276 skills with 0 failures', () => {
  const output = execSync('python3 tools/normalize.py --dry-run', {
    cwd: REPO_ROOT,
    encoding: 'utf-8'
  });
  assert.match(output, /All 276 skills valid/);
});

test('full-corpus: catalog and packs consistency', () => {
  const cat = loadCatalog();
  assert.equal(cat.total_skills, 276);
  assert.equal(cat.skills.length, 276);

  const packs = loadPacks();
  assert.equal(packs.packs.starter.count, 8);
  for (const sName of packs.packs.starter.skills) {
    const found = cat.skills.find(s => s.name === sName);
    assert.ok(found, `Starter skill missing: ${sName}`);
  }
});

test('full-corpus: dry-run install of starter pack across all 13 adapters', () => {
  const adapters = loadAllAdapters();
  for (const adapter of adapters) {
    const res = installSkills({
      packName: 'starter',
      agentId: adapter.id,
      dryRun: true,
      scope: 'project'
    });
    assert.equal(res.length, 1);
    assert.equal(res[0].installed.length, 8, `Starter pack dry-run incomplete on ${adapter.id}`);
    assert.equal(res[0].failed.length, 0, `Starter pack dry-run had failures on ${adapter.id}`);
    assert.ok(res[0].plannedActions.length > 0, `No planned actions generated for ${adapter.id}`);
  }
});

test('full-corpus: dry-run install of all 276 skills on generic adapter', () => {
  const res = installSkills({
    all: true,
    agentId: 'generic',
    dryRun: true,
    scope: 'project'
  });
  assert.equal(res.length, 1);
  assert.equal(res[0].installed.length, 276);
  assert.equal(res[0].failed.length, 0);
});
