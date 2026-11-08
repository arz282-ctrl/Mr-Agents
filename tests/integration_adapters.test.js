import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadAllAdapters } from '../src/adapters.js';
import { installSkills, uninstallSkills } from '../src/installer.js';
import { loadLockfile } from '../src/lockfile.js';

test('integration: install and clean uninstall on all 13 adapters', () => {
  const adapters = loadAllAdapters();
  const sampleSkills = ['deep-research', 'webdev', 'copywriting'];

  for (const adapter of adapters) {
    const tmpProject = fs.mkdtempSync(path.join(os.tmpdir(), `mr-int-${adapter.id}-`));

    try {
      // 1. Install
      const installRes = installSkills({
        skillNames: sampleSkills,
        agentId: adapter.id,
        scope: 'project',
        projectRoot: tmpProject
      });

      assert.equal(installRes.length, 1);
      assert.equal(installRes[0].installed.length, sampleSkills.length, `Failed to install all skills on ${adapter.id}`);
      assert.equal(installRes[0].failed.length, 0);

      // Verify lockfile
      const lock = loadLockfile(tmpProject);
      assert.equal(Object.keys(lock.installations).length, sampleSkills.length);

      // Verify files created according to mode
      if (adapter.install_mode === 'native-skill') {
        if (adapter.use_prebuilt_zips) {
          for (const s of sampleSkills) {
            assert.ok(fs.existsSync(path.join(tmpProject, 'manus-ready', 'zips', `${s}.zip`)));
          }
        } else {
          for (const s of sampleSkills) {
            const skillMd = path.join(tmpProject, adapter.paths.project.replace('{skill}', s), 'SKILL.md');
            assert.ok(fs.existsSync(skillMd), `Missing SKILL.md for ${s} on ${adapter.id}: ${skillMd}`);
          }
        }
      } else if (adapter.install_mode === 'rule-file') {
        for (const s of sampleSkills) {
          const ruleFile = path.join(tmpProject, adapter.paths.project.replace('{skill}', s));
          assert.ok(fs.existsSync(ruleFile), `Missing rule file for ${s} on ${adapter.id}: ${ruleFile}`);
          const content = fs.readFileSync(ruleFile, 'utf-8');
          assert.ok(content.length > 50);
        }
      } else if (adapter.install_mode === 'instruction-index') {
        const targetFile = path.join(tmpProject, adapter.index_config.target_file);
        assert.ok(fs.existsSync(targetFile), `Missing index file: ${targetFile}`);
        const content = fs.readFileSync(targetFile, 'utf-8');
        assert.match(content, /<!-- mr-agents:begin -->/);
        for (const s of sampleSkills) {
          assert.match(content, new RegExp(`- \\*\\*${s}\\*\\*:`));
        }
      }

      // 2. Uninstall
      const uninstallRes = uninstallSkills({
        skillNames: sampleSkills,
        agentId: adapter.id,
        scope: 'project',
        projectRoot: tmpProject
      });

      assert.equal(uninstallRes.uninstalled.length, sampleSkills.length);
      assert.equal(uninstallRes.failed.length, 0);

      // 3. Assert tree is clean
      const updatedLock = loadLockfile(tmpProject);
      assert.equal(Object.keys(updatedLock.installations).length, 0);

      if (adapter.install_mode === 'instruction-index') {
        const targetFile = path.join(tmpProject, adapter.index_config.target_file);
        if (fs.existsSync(targetFile)) {
          const content = fs.readFileSync(targetFile, 'utf-8');
          assert.doesNotMatch(content, /mr-agents:begin/, `Managed block should be removed after full uninstall on ${adapter.id}`);
        }
      } else if (adapter.install_mode === 'rule-file') {
        for (const s of sampleSkills) {
          const ruleFile = path.join(tmpProject, adapter.paths.project.replace('{skill}', s));
          assert.ok(!fs.existsSync(ruleFile), `Rule file should be removed on ${adapter.id}: ${ruleFile}`);
        }
      } else if (adapter.install_mode === 'native-skill' && !adapter.use_prebuilt_zips) {
        for (const s of sampleSkills) {
          const skillDir = path.join(tmpProject, adapter.paths.project.replace('{skill}', s));
          assert.ok(!fs.existsSync(skillDir), `Skill directory should be removed on ${adapter.id}: ${skillDir}`);
        }
      }
    } finally {
      fs.rmSync(tmpProject, { recursive: true, force: true });
    }
  }
});
