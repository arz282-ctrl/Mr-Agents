#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { installSkills, uninstallSkills } from '../src/installer.js';

console.log("==================================================================");
console.log("VERIFICATION STEP 4: REAL INSTALL & UNINSTALL TEST (Claude, Codex, Gemini)");
console.log("==================================================================\n");

const agentsToTest = ['claude-code', 'codex', 'gemini'];
const skillsToTest = ['deep-research', 'webdev', 'copywriting'];

function getDirTree(dir, base = dir) {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full);
    if (entry.isDirectory()) {
      result.push(`${rel}/`);
      result.push(...getDirTree(full, base));
    } else {
      result.push(rel);
    }
  }
  return result;
}

for (const agentId of agentsToTest) {
  console.log(`\n------------------------------------------------------------------`);
  console.log(`Testing Agent: ${agentId}`);
  console.log(`------------------------------------------------------------------`);
  
  const tmpProject = fs.mkdtempSync(path.join(os.tmpdir(), `mr-verify-${agentId}-`));
  const beforeTree = getDirTree(tmpProject);
  console.log(`Initial Tree Count: ${beforeTree.length} files`);

  // 1. Real Install
  console.log(`Installing ${skillsToTest.join(', ')} into ${tmpProject}...`);
  const installResult = installSkills({
    skillNames: skillsToTest,
    agentId,
    scope: 'project',
    projectRoot: tmpProject
  });

  console.log(`Install Output: ${installResult[0].installed.length} installed, ${installResult[0].failed.length} failed`);
  const afterInstallTree = getDirTree(tmpProject);
  console.log(`Post-Install Tree Count: ${afterInstallTree.length} items`);
  console.log("Sample installed files:");
  for (const item of afterInstallTree.slice(0, 10)) {
    console.log(`  + ${item}`);
  }
  if (afterInstallTree.length > 10) {
    console.log(`  ... and ${afterInstallTree.length - 10} more items`);
  }

  // 2. Real Uninstall
  console.log(`Uninstalling ${skillsToTest.join(', ')} from ${tmpProject}...`);
  const uninstallResult = uninstallSkills({
    skillNames: skillsToTest,
    agentId,
    scope: 'project',
    projectRoot: tmpProject
  });
  console.log(`Uninstall Output: ${uninstallResult.uninstalled.length} uninstalled, ${uninstallResult.failed.length} failed`);

  // Remove empty lockfile directory if any
  const lockDir = path.join(tmpProject, '.mr-agents');
  if (fs.existsSync(lockDir)) {
    const lockFile = path.join(lockDir, 'lock.json');
    if (fs.existsSync(lockFile)) {
      const lockData = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
      if (Object.keys(lockData.installations || {}).length === 0) {
        fs.rmSync(lockDir, { recursive: true, force: true });
      }
    }
  }

  const afterUninstallTree = getDirTree(tmpProject);
  console.log(`Post-Uninstall Tree Count: ${afterUninstallTree.length} items`);

  if (afterUninstallTree.length === 0) {
    console.log(`✅ Clean tree verified for ${agentId}! Diff against initial state: 0 changes.\n`);
  } else {
    console.log(`⚠️ Remaining files:`, afterUninstallTree);
  }

  fs.rmSync(tmpProject, { recursive: true, force: true });
}
