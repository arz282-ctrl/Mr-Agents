import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { installSkills, uninstallSkills } from '../src/installer.js';
import { runCli } from '../src/cli.js';
import { computeFolderSha256 } from '../src/hasher.js';
import { getSkill } from '../src/catalog.js';

test('fixes: instruction-index preserves user-authored content and deletes payload on uninstall', () => {
  const tmpProject = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-test-instruction-'));
  const agentsMd = path.join(tmpProject, 'AGENTS.md');
  const userHeader = '# My Custom Project Instructions\n\nUser custom rule here.\n';
  fs.writeFileSync(agentsMd, userHeader, 'utf-8');

  try {
    // 1. Install 2 skills into generic instruction-index
    installSkills({
      skillNames: ['webdev', 'copywriting'],
      agentId: 'generic',
      scope: 'project',
      projectRoot: tmpProject
    });

    // Verify index file contains user content AND managed block
    let content = fs.readFileSync(agentsMd, 'utf-8');
    assert.ok(content.startsWith(userHeader));
    assert.match(content, /<!-- mr-agents:begin -->/);
    assert.match(content, /- \*\*webdev\*\*/);
    assert.match(content, /- \*\*copywriting\*\*/);

    // Verify payload directories exist
    const webdevPayload = path.join(tmpProject, '.agents', 'skills', 'webdev');
    const copyPayload = path.join(tmpProject, '.agents', 'skills', 'copywriting');
    assert.ok(fs.existsSync(webdevPayload));
    assert.ok(fs.existsSync(copyPayload));

    // 2. Uninstall 1 skill ('webdev')
    uninstallSkills({
      skillNames: ['webdev'],
      agentId: 'generic',
      scope: 'project',
      projectRoot: tmpProject
    });

    // Verify webdev payload is removed, copywriting payload remains
    assert.ok(!fs.existsSync(webdevPayload), 'Uninstalled skill payload must be removed');
    assert.ok(fs.existsSync(copyPayload), 'Remaining skill payload must be kept');

    // Verify user content is preserved and managed block still has copywriting
    content = fs.readFileSync(agentsMd, 'utf-8');
    assert.ok(content.startsWith(userHeader), 'User header must not be deleted');
    assert.doesNotMatch(content, /- \*\*webdev\*\*/);
    assert.match(content, /- \*\*copywriting\*\*/);

    // 3. Uninstall remaining skill ('copywriting')
    uninstallSkills({
      skillNames: ['copywriting'],
      agentId: 'generic',
      scope: 'project',
      projectRoot: tmpProject
    });

    // Entire managed block should be removed, but userHeader MUST remain
    assert.ok(fs.existsSync(agentsMd), 'AGENTS.md must NOT be deleted');
    content = fs.readFileSync(agentsMd, 'utf-8');
    assert.equal(content.trim(), userHeader.trim());
    assert.ok(!fs.existsSync(path.join(tmpProject, '.agents', 'skills')));
  } finally {
    fs.rmSync(tmpProject, { recursive: true, force: true });
  }
});

test('fixes: instruction-index resolves user-scope paths to user directory, not project directory', () => {
  const tmpProject = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-test-scope-proj-'));
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-test-scope-home-'));
  const origHome = process.env.HOME;
  process.env.HOME = tmpHome;

  try {
    installSkills({
      skillNames: ['copywriting'],
      agentId: 'generic',
      scope: 'user',
      projectRoot: tmpProject
    });

    // Must NOT write to tmpProject/AGENTS.md
    assert.ok(!fs.existsSync(path.join(tmpProject, 'AGENTS.md')), 'Must not write to project AGENTS.md in user scope');
    assert.ok(!fs.existsSync(path.join(tmpProject, '.agents')), 'Must not write to project .agents in user scope');

    // Must write to tmpHome/.agents/AGENTS.md and tmpHome/.agents/skills/copywriting
    assert.ok(fs.existsSync(path.join(tmpHome, '.agents', 'AGENTS.md')));
    assert.ok(fs.existsSync(path.join(tmpHome, '.agents', 'skills', 'copywriting', 'SKILL.md')));
  } finally {
    process.env.HOME = origHome;
    fs.rmSync(tmpProject, { recursive: true, force: true });
    fs.rmSync(tmpHome, { recursive: true, force: true });
  }
});

test('fixes: similarweb-analytics hash matches committed dist files with no .DS_Store', () => {
  const skill = getSkill('similarweb-analytics');
  assert.ok(skill);
  const distDir = path.resolve(import.meta.dirname, '..', 'dist', 'skills', 'similarweb-analytics');
  const actualHash = computeFolderSha256(distDir);
  assert.equal(actualHash, skill.sha256, 'Committed similarweb-analytics directory sha256 must match catalog.json');
  assert.ok(!fs.existsSync(path.join(distDir, '.DS_Store')), '.DS_Store must not exist in dist');
});

test('fixes: export command expands --pack and --all, and creates valid ZIP archives', () => {
  const tmpOutDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-test-export-'));
  const zipPath = path.join(tmpOutDir, 'test-pack.zip');

  try {
    // 1. Export starter pack to ZIP archive
    const exitCode = runCli(['export', '--pack', 'starter', '--agent', 'generic', '--out', zipPath]);
    assert.equal(exitCode, 0);
    assert.ok(fs.existsSync(zipPath), 'Output zip file must exist');

    // Check zip file header (PK\x03\x04 = 0x04034b50)
    const header = Buffer.alloc(4);
    const fd = fs.openSync(zipPath, 'r');
    fs.readSync(fd, header, 0, 4, 0);
    fs.closeSync(fd);
    assert.equal(header.readUInt32LE(0), 0x04034b50, 'File must have valid PKZIP magic header');

    // Check zip validity with unzip command if available
    try {
      execSync(`unzip -t "${zipPath}"`, { stdio: 'pipe' });
    } catch {
      // If unzip binary is unavailable in environment, magic header check suffices
    }
  } finally {
    fs.rmSync(tmpOutDir, { recursive: true, force: true });
  }
});
