import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { installSkills, uninstallSkills } from '../src/installer.js';
import { runCli } from '../src/cli.js';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const EXPECTED_PACKS = [
  'starter-pack',
  'research-pack',
  'webdev-pack',
  'marketing-seo-pack',
  'data-pack',
  'media-pack',
  'devops-pack',
  'qa-git-pack'
];

test('pack-skills: all 8 consolidated pack SKILL.md files and ZIPs exist and are valid', () => {
  for (const packName of EXPECTED_PACKS) {
    const skillMd = path.join(REPO_ROOT, 'dist', 'pack-skills', packName, 'SKILL.md');
    assert.ok(fs.existsSync(skillMd), `Missing pack SKILL.md: ${skillMd}`);
    const content = fs.readFileSync(skillMd, 'utf-8');
    assert.match(content, new RegExp(`^---\\nname: ${packName}\\ndescription: "`));
    assert.match(content, /## Included Skills Routing Matrix/);

    const zipFile = path.join(REPO_ROOT, 'dist', 'pack-zips', `${packName}.zip`);
    assert.ok(fs.existsSync(zipFile), `Missing pack ZIP: ${zipFile}`);
    assert.ok(fs.statSync(zipFile).size > 500, `Pack ZIP too small: ${zipFile}`);
  }

  const allPacksZip = path.join(REPO_ROOT, 'dist', 'pack-zips', 'all-8-packs.zip');
  assert.ok(fs.existsSync(allPacksZip), 'Missing combined all-8-packs.zip');
  assert.ok(fs.statSync(allPacksZip).size > 5000);
});

test('pack-skills: root LLM discovery files (llms.txt, llms-full.txt, AGENTS.md, CLAUDE.md, GEMINI.md) exist', () => {
  for (const rel of ['llms.txt', 'llms-full.txt', 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'docs/universal/ONE_PROMPT_INSTALL.md']) {
    const full = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(full), `Missing LLM discovery file: ${rel}`);
    const content = fs.readFileSync(full, 'utf-8');
    assert.ok(content.length > 500, `Discovery file ${rel} should be non-trivial`);
    assert.match(content, /--pack-skills/);
  }
});

test('pack-skills: CLI --pack-skills installs all 8 consolidated packs across native, rule, and index adapters', () => {
  for (const agentId of ['gemini', 'antigravity', 'claude-code', 'cursor', 'generic', 'manus']) {
    const tmpProject = fs.mkdtempSync(path.join(os.tmpdir(), `mr-pack-skills-${agentId}-`));
    try {
      const res = installSkills({
        packSkills: true,
        agentId,
        scope: 'project',
        projectRoot: tmpProject
      });
      assert.equal(res.length, 1);
      assert.equal(res[0].installed.length, 8, `Expected 8 pack skills installed on ${agentId}`);
      assert.equal(res[0].failed.length, 0);

      // Verify uninstall cleans up all 8 pack skills
      const unRes = uninstallSkills({
        skillNames: EXPECTED_PACKS,
        agentId,
        scope: 'project',
        projectRoot: tmpProject
      });
      assert.equal(unRes.uninstalled.length, 8);
      assert.equal(unRes.failed.length, 0);
    } finally {
      fs.rmSync(tmpProject, { recursive: true, force: true });
    }
  }
});
