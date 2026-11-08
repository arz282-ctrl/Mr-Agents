import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSkill, loadCatalog, loadPacks } from './catalog.js';
import { getAdapter, detectInstalledAgents } from './adapters.js';
import { resolvePathPattern } from './paths.js';
import { computeFolderSha256, hashFile } from './hasher.js';
import { updateManagedBlock, removeManagedBlock, extractManagedBlock } from './managed_block.js';
import { loadLockfile, saveLockfile, backupPath } from './lockfile.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DIST_SKILLS_DIR = path.join(REPO_ROOT, 'dist', 'skills');
const MANUS_ZIPS_DIR = path.join(REPO_ROOT, 'manus-ready', 'zips');

export function installSkills({
  skillNames = [],
  packName = null,
  all = false,
  agentId = 'auto',
  scope = 'project',
  dryRun = false,
  force = false,
  projectRoot = process.cwd()
} = {}) {
  const cat = loadCatalog();
  const packs = loadPacks();

  // 1. Resolve skills to install
  let targets = [];
  if (all) {
    targets = cat.skills.map(s => s.name);
  } else if (packName) {
    const p = packs.packs?.[packName.toLowerCase()];
    if (!p) {
      throw new Error(`Unknown pack '${packName}'. Available packs: ${Object.keys(packs.packs || {}).join(', ')}`);
    }
    targets = p.skills || [];
  } else {
    targets = skillNames;
  }

  if (targets.length === 0) {
    throw new Error('No skills specified to install.');
  }

  // 2. Resolve agent(s)
  let targetAgents = [];
  if (agentId === 'auto') {
    const detected = detectInstalledAgents(projectRoot).filter(d => d.detected);
    if (detected.length === 0) {
      // Fallback to generic
      targetAgents = [getAdapter('generic')];
    } else {
      // Pick first detected non-generic, or generic
      const nonGeneric = detected.find(d => d.adapter.id !== 'generic');
      targetAgents = [nonGeneric ? nonGeneric.adapter : detected[0].adapter];
    }
  } else if (agentId === 'all') {
    const detected = detectInstalledAgents(projectRoot).filter(d => d.detected);
    targetAgents = detected.length > 0 ? detected.map(d => d.adapter) : [getAdapter('generic')];
  } else {
    const a = getAdapter(agentId);
    if (!a) {
      throw new Error(`Unknown agent '${agentId}'. Run 'mr-agents detect' or check 'adapters/' directory.`);
    }
    targetAgents = [a];
  }

  const results = [];
  const lock = loadLockfile(projectRoot);

  for (const agent of targetAgents) {
    const agentResults = {
      agent: agent.id,
      agentName: agent.name,
      installed: [],
      skipped: [],
      failed: [],
      plannedActions: []
    };

    const targetPattern = agent.paths?.[scope];
    if (!targetPattern) {
      throw new Error(`Agent '${agent.id}' does not define an install path for scope '${scope}'.`);
    }

    // Process each skill
    for (const sName of targets) {
      const skillMeta = getSkill(sName);
      if (!skillMeta) {
        agentResults.failed.push({ skill: sName, reason: `Skill '${sName}' not found in catalog.` });
        continue;
      }

      const sourceDistDir = path.join(DIST_SKILLS_DIR, sName);
      if (!fs.existsSync(sourceDistDir)) {
        agentResults.failed.push({ skill: sName, reason: `Source directory for '${sName}' missing from dist/.` });
        continue;
      }

      // Check SHA-256 before doing anything
      const expectedSha = skillMeta.sha256;
      const actualSha = computeFolderSha256(sourceDistDir);
      if (expectedSha !== actualSha) {
        agentResults.failed.push({
          skill: sName,
          reason: `Integrity check failed for '${sName}'! Expected ${expectedSha}, got ${actualSha}`
        });
        continue;
      }

      // Resolve destination
      const destPath = resolvePathPattern(targetPattern, { skill: sName }, projectRoot);

      // Perform installation based on mode
      try {
        if (agent.install_mode === 'native-skill') {
          installNativeSkill({
            skillName: sName,
            sourceDistDir,
            destPath,
            agent,
            dryRun,
            force,
            projectRoot,
            agentResults
          });
        } else if (agent.install_mode === 'rule-file') {
          installRuleFile({
            skillName: sName,
            skillMeta,
            sourceDistDir,
            destPath,
            agent,
            dryRun,
            force,
            projectRoot,
            agentResults
          });
        } else if (agent.install_mode === 'instruction-index') {
          installInstructionIndex({
            skillName: sName,
            skillMeta,
            sourceDistDir,
            agent,
            scope,
            dryRun,
            force,
            projectRoot,
            agentResults
          });
        } else if (agent.install_mode === 'command') {
          installCommandExport({
            skillName: sName,
            skillMeta,
            sourceDistDir,
            destPath,
            agent,
            dryRun,
            force,
            projectRoot,
            agentResults
          });
        }

        // Update lockfile tracking if not dry run
        if (!dryRun) {
          const lockKey = `${agent.id}:${scope}:${sName}`;
          lock.installations[lockKey] = {
            skill: sName,
            agent: agent.id,
            scope,
            install_mode: agent.install_mode,
            target_path: path.relative(projectRoot, destPath) || destPath,
            sha256: actualSha,
            installed_at: new Date().toISOString()
          };
        }
      } catch (err) {
        agentResults.failed.push({ skill: sName, reason: err.message });
      }
    }

    if (!dryRun) {
      saveLockfile(lock, projectRoot);
    }
    results.push(agentResults);
  }

  return results;
}

function installNativeSkill({ skillName, sourceDistDir, destPath, agent, dryRun, force, projectRoot, agentResults }) {
  if (agent.use_prebuilt_zips) {
    const zipSource = path.join(MANUS_ZIPS_DIR, `${skillName}.zip`);
    if (!fs.existsSync(zipSource)) {
      throw new Error(`Prebuilt Manus zip not found at ${zipSource}`);
    }
    if (dryRun) {
      agentResults.plannedActions.push(`Copy ${zipSource} -> ${destPath}`);
      agentResults.installed.push(skillName);
      return;
    }
    if (fs.existsSync(destPath) && !force) {
      agentResults.skipped.push({ skill: skillName, reason: 'Already exists (use --force to overwrite)' });
      return;
    }
    backupPath(destPath, projectRoot);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(zipSource, destPath);
    agentResults.installed.push(skillName);
    return;
  }

  if (dryRun) {
    agentResults.plannedActions.push(`Copy directory ${sourceDistDir} -> ${destPath}`);
    agentResults.installed.push(skillName);
    return;
  }

  if (fs.existsSync(destPath)) {
    const existingSha = computeFolderSha256(destPath);
    const sourceSha = computeFolderSha256(sourceDistDir);
    if (existingSha === sourceSha) {
      agentResults.skipped.push({ skill: skillName, reason: 'Identical installation already present' });
      return;
    }
    if (!force) {
      agentResults.skipped.push({ skill: skillName, reason: 'Destination exists with different content (use --force to overwrite)' });
      return;
    }
    backupPath(destPath, projectRoot);
    fs.rmSync(destPath, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.cpSync(sourceDistDir, destPath, { recursive: true });
  agentResults.installed.push(skillName);
}

function installRuleFile({ skillName, skillMeta, sourceDistDir, destPath, agent, dryRun, force, projectRoot, agentResults }) {
  const skillMdPath = path.join(sourceDistDir, 'SKILL.md');
  const skillContent = fs.readFileSync(skillMdPath, 'utf-8');

  let ruleContent = '';
  if (agent.transform?.type === 'cursor-mdc') {
    // Extract body and clean description
    const desc = (skillMeta.description || '').replace(/"/g, '\\"');
    ruleContent = `---\ndescription: "${desc}"\nglobs: ""\nalwaysApply: false\n---\n\n${skillContent}`;
  } else {
    // Standard markdown rule for Windsurf / Cline
    ruleContent = `# ${skillName} Rule\n\n> **Category:** ${skillMeta.category}\n> **Guidance:** ${skillMeta.description}\n\n${skillContent}`;
  }

  if (dryRun) {
    agentResults.plannedActions.push(`Write rule file -> ${destPath}`);
    agentResults.installed.push(skillName);
    return;
  }

  if (fs.existsSync(destPath)) {
    const existing = fs.readFileSync(destPath, 'utf-8');
    if (existing === ruleContent) {
      agentResults.skipped.push({ skill: skillName, reason: 'Identical rule file already present' });
      return;
    }
    if (!force) {
      agentResults.skipped.push({ skill: skillName, reason: 'Destination file exists (use --force to overwrite)' });
      return;
    }
    backupPath(destPath, projectRoot);
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, ruleContent, 'utf-8');
  agentResults.installed.push(skillName);
}

function installInstructionIndex({ skillName, skillMeta, sourceDistDir, agent, scope, dryRun, force, projectRoot, agentResults }) {
  const indexCfg = agent.index_config || {};
  const targetFileRel = indexCfg.target_file || (scope === 'user' ? '~/.agents/AGENTS.md' : 'AGENTS.md');
  const skillsDirRel = indexCfg.skills_dir || (scope === 'user' ? '~/.agents/skills' : '.agents/skills');

  const targetFilePath = resolvePathPattern(targetFileRel, {}, projectRoot);
  const skillsDirPath = resolvePathPattern(skillsDirRel, {}, projectRoot);
  const skillDestDir = path.join(skillsDirPath, skillName);

  if (dryRun) {
    agentResults.plannedActions.push(`Copy skill payload -> ${skillDestDir}`);
    agentResults.plannedActions.push(`Update managed index block in ${targetFilePath}`);
    agentResults.installed.push(skillName);
    return;
  }

  // 1. Copy skill payload
  if (fs.existsSync(skillDestDir)) {
    if (!force) {
      const existingSha = computeFolderSha256(skillDestDir);
      const sourceSha = computeFolderSha256(sourceDistDir);
      if (existingSha !== sourceSha) {
        backupPath(skillDestDir, projectRoot);
        fs.rmSync(skillDestDir, { recursive: true, force: true });
        fs.cpSync(sourceDistDir, skillDestDir, { recursive: true });
      }
    } else {
      backupPath(skillDestDir, projectRoot);
      fs.rmSync(skillDestDir, { recursive: true, force: true });
      fs.cpSync(sourceDistDir, skillDestDir, { recursive: true });
    }
  } else {
    fs.mkdirSync(path.dirname(skillDestDir), { recursive: true });
    fs.cpSync(sourceDistDir, skillDestDir, { recursive: true });
  }

  // 2. Update target instruction index file
  let originalContent = '';
  if (fs.existsSync(targetFilePath)) {
    originalContent = fs.readFileSync(targetFilePath, 'utf-8');
  }

  const currentBlock = extractManagedBlock(originalContent) || '';
  const lines = currentBlock.split('\n').filter(l => l.trim().startsWith('-'));
  const header = indexCfg.header || '## Mr-Agents Installed Skills';

  // Build entry
  const fullSkillPath = path.relative(path.dirname(targetFilePath), path.join(skillDestDir, 'SKILL.md')).split(path.sep).join('/');
  const entryLine = `- **${skillName}**: ${skillMeta.description} ([Instructions](${fullSkillPath}))`;

  // Merge entry into lines if not present
  const existingLineIdx = lines.findIndex(l => l.includes(`- **${skillName}**:`));
  if (existingLineIdx >= 0) {
    lines[existingLineIdx] = entryLine;
  } else {
    lines.push(entryLine);
  }
  lines.sort();

  const newBlockContent = `${header}\n\n${lines.join('\n')}`;
  const updatedFileContent = updateManagedBlock(originalContent, newBlockContent);

  fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
  fs.writeFileSync(targetFilePath, updatedFileContent, 'utf-8');

  // If Aider, ensure .aider.conf.yml mentions CONVENTIONS.md
  if (agent.id === 'aider' && indexCfg.config_file) {
    const aiderConfPath = resolvePathPattern(indexCfg.config_file, {}, projectRoot);
    if (!fs.existsSync(aiderConfPath)) {
      fs.writeFileSync(aiderConfPath, "read:\n  - CONVENTIONS.md\n", 'utf-8');
    }
  }

  agentResults.installed.push(skillName);
}

function installCommandExport({ skillName, skillMeta, sourceDistDir, destPath, agent, dryRun, force, projectRoot, agentResults }) {
  if (dryRun) {
    agentResults.plannedActions.push(`Export project knowledge -> ${destPath}`);
    agentResults.installed.push(skillName);
    return;
  }
  if (fs.existsSync(destPath) && !force) {
    agentResults.skipped.push({ skill: skillName, reason: 'Destination exists (use --force to overwrite)' });
    return;
  }
  backupPath(destPath, projectRoot);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.cpSync(sourceDistDir, destPath, { recursive: true });
  agentResults.installed.push(skillName);
}

export function uninstallSkills({
  skillNames = [],
  agentId,
  scope = 'project',
  projectRoot = process.cwd()
} = {}) {
  const agent = getAdapter(agentId);
  if (!agent) {
    throw new Error(`Unknown agent '${agentId}'.`);
  }

  const lock = loadLockfile(projectRoot);
  const uninstalled = [];
  const failed = [];

  for (const sName of skillNames) {
    const lockKey = `${agent.id}:${scope}:${sName}`;
    const entry = lock.installations[lockKey];
    const targetPattern = agent.paths?.[scope];
    const destPath = entry?.target_path 
      ? path.resolve(projectRoot, entry.target_path)
      : resolvePathPattern(targetPattern, { skill: sName }, projectRoot);

    try {
      if (fs.existsSync(destPath)) {
        if (fs.statSync(destPath).isDirectory()) {
          fs.rmSync(destPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(destPath);
        }

        // Clean up empty parent directories up to projectRoot
        let parentDir = path.dirname(destPath);
        while (parentDir && parentDir !== projectRoot && parentDir.startsWith(projectRoot)) {
          try {
            if (fs.existsSync(parentDir) && fs.readdirSync(parentDir).length === 0) {
              fs.rmdirSync(parentDir);
              parentDir = path.dirname(parentDir);
            } else {
              break;
            }
          } catch {
            break;
          }
        }
      }

      // If instruction-index, remove from managed block
      if (agent.install_mode === 'instruction-index') {
        const indexCfg = agent.index_config || {};
        const targetFileRel = indexCfg.target_file || (scope === 'user' ? '~/.agents/AGENTS.md' : 'AGENTS.md');
        const targetFilePath = resolvePathPattern(targetFileRel, {}, projectRoot);

        if (fs.existsSync(targetFilePath)) {
          const original = fs.readFileSync(targetFilePath, 'utf-8');
          const currentBlock = extractManagedBlock(original);
          if (currentBlock) {
            const lines = currentBlock.split('\n').filter(l => l.trim().startsWith('-') && !l.includes(`- **${sName}**:`));
            if (lines.length === 0) {
              const cleaned = removeManagedBlock(original);
              fs.writeFileSync(targetFilePath, cleaned, 'utf-8');
            } else {
              const header = indexCfg.header || '## Mr-Agents Installed Skills';
              const updatedBlock = `${header}\n\n${lines.join('\n')}`;
              const updated = updateManagedBlock(original, updatedBlock);
              fs.writeFileSync(targetFilePath, updated, 'utf-8');
            }
          }
        }
      }

      delete lock.installations[lockKey];
      uninstalled.push(sName);
    } catch (err) {
      failed.push({ skill: sName, reason: err.message });
    }
  }

  saveLockfile(lock, projectRoot);
  return { agent: agent.id, uninstalled, failed };
}
