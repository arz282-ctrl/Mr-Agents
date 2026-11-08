import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalog, loadPacks, findSkills, getSkill } from './catalog.js';
import { loadAllAdapters, detectInstalledAgents, getAdapter } from './adapters.js';
import { installSkills, uninstallSkills } from './installer.js';
import { loadLockfile } from './lockfile.js';
import { computeFolderSha256 } from './hasher.js';
import { createZipArchive } from './zip.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

export function runCli(args = process.argv.slice(2)) {
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    return 0;
  }

  const cmd = args[0];
  const rest = args.slice(1);

  try {
    switch (cmd) {
      case 'list':
        return handleList(rest);
      case 'search':
        return handleSearch(rest);
      case 'info':
        return handleInfo(rest);
      case 'detect':
        return handleDetect(rest);
      case 'install':
        return handleInstall(rest);
      case 'uninstall':
        return handleUninstall(rest);
      case 'update':
        return handleUpdate(rest);
      case 'doctor':
        return handleDoctor(rest);
      case 'export':
        return handleExport(rest);
      default:
        console.error(`Error: Unknown command '${cmd}'. Run 'mr-agents --help' for usage.`);
        return 2;
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}

function printHelp() {
  console.log(`
mr-agents - Universal AI Agent Skills Hub CLI

USAGE:
  mr-agents <command> [options]

COMMANDS:
  list        List available skills (supports --pack, --category, --agent)
  search      Search skills by keyword
  info        Show detailed information for a skill
  detect      Detect installed AI agents on this machine
  install     Install skills into target agent(s)
  uninstall   Remove installed skills from target agent
  update      Update installed skills or check for updates (--check)
  doctor      Verify installations, checksums, and environment health
  export      Export skill packages for offline use (--out <dir|zip>)

OPTIONS:
  -h, --help  Show this help screen
  -v, --version Show version

EXAMPLES:
  mr-agents detect
  mr-agents list --pack starter
  mr-agents search "react tailwind"
  mr-agents install webdev --agent claude-code
  mr-agents install --pack starter --agent auto
  mr-agents uninstall webdev --agent claude-code
`);
}

function parseFlags(args) {
  const flags = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        flags[key] = args[i + 1];
        i++;
      } else {
        flags[key] = true;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        flags[key] = args[i + 1];
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      flags._.push(arg);
    }
  }
  return flags;
}

function handleList(args) {
  const flags = parseFlags(args);
  const pack = flags.pack || flags.p;
  const category = flags.category || flags.c;
  const agent = flags.agent || flags.a;

  const skills = findSkills({ pack, category, agent });
  console.log(`Found ${skills.length} skill(s):\n`);
  for (const s of skills) {
    const pad = s.name.padEnd(32);
    const cat = `[${s.category}]`.padEnd(16);
    const desc = s.description.length > 70 ? `${s.description.slice(0, 67)}...` : s.description;
    console.log(`  ${pad} ${cat} ${desc}`);
  }
  return 0;
}

function handleSearch(args) {
  const flags = parseFlags(args);
  const query = flags._.join(' ').trim();
  if (!query) {
    console.error("Usage: mr-agents search <query>");
    return 2;
  }
  const skills = findSkills({ query });
  console.log(`Search results for '${query}' (${skills.length} found):\n`);
  for (const s of skills) {
    console.log(`- ${s.name} [${s.category}]`);
    console.log(`  ${s.description}\n`);
  }
  return 0;
}

function handleInfo(args) {
  const flags = parseFlags(args);
  const skillName = flags._[0];
  if (!skillName) {
    console.error("Usage: mr-agents info <skill-name>");
    return 2;
  }
  const skill = getSkill(skillName);
  if (!skill) {
    console.error(`Skill '${skillName}' not found.`);
    return 1;
  }

  console.log(`\nSkill: ${skill.name}`);
  console.log(`Category: ${skill.category}`);
  console.log(`Size: ${(skill.size / 1024).toFixed(1)} KB (${skill.size} bytes)`);
  console.log(`Files: ${skill.file_count}`);
  console.log(`SHA-256: ${skill.sha256}`);
  console.log(`License: ${skill.license}`);
  console.log(`Required Capabilities: ${skill.required_capabilities?.join(', ') || 'none'}`);
  console.log(`\nDescription:\n${skill.description}\n`);
  return 0;
}

function handleDetect(args) {
  const results = detectInstalledAgents();
  console.log("\nDetected AI Agents on this system:\n");
  for (const r of results) {
    const statusIcon = r.detected ? "✅" : "❌";
    const statusText = r.detected ? "DETECTED" : "Not detected";
    console.log(`  ${statusIcon} ${r.adapter.name} (${r.adapter.id}) [${r.adapter.install_mode}]`);
    console.log(`     Status: ${statusText}`);
    if (r.reasons && r.reasons.length > 0) {
      console.log(`     Matched: ${r.reasons.join(', ')}`);
    }
    console.log("");
  }
  return 0;
}

function handleInstall(args) {
  const flags = parseFlags(args);
  const skillNames = flags._;
  const packName = flags.pack || flags.p;
  const all = Boolean(flags.all);
  const agentId = flags.agent || flags.a || 'auto';
  const scope = flags.scope || 'project';
  const dryRun = Boolean(flags['dry-run'] || flags.n);
  const force = Boolean(flags.force || flags.f);

  if (skillNames.length === 0 && !packName && !all) {
    console.error("Usage: mr-agents install <skill...|--pack X|--all> --agent <id|auto|all> [--scope user|project]");
    return 2;
  }

  const results = installSkills({
    skillNames,
    packName,
    all,
    agentId,
    scope,
    dryRun,
    force
  });

  let totalInstalled = 0;
  let totalFailed = 0;

  for (const res of results) {
    console.log(`\nAgent: ${res.agentName} (${res.agent}) [Scope: ${scope}]`);
    if (dryRun) {
      console.log("  Mode: DRY RUN (no files modified)");
      for (const act of res.plannedActions) {
        console.log(`  [PLAN] ${act}`);
      }
    } else {
      if (res.installed.length > 0) {
        console.log(`  Installed (${res.installed.length}): ${res.installed.join(', ')}`);
        totalInstalled += res.installed.length;
      }
      if (res.skipped.length > 0) {
        console.log(`  Skipped (${res.skipped.length}):`);
        for (const s of res.skipped) {
          console.log(`    - ${s.skill}: ${s.reason}`);
        }
      }
      if (res.failed.length > 0) {
        console.log(`  Failed (${res.failed.length}):`);
        for (const f of res.failed) {
          console.log(`    - ${f.skill}: ${f.reason}`);
        }
        totalFailed += res.failed.length;
      }
    }
  }

  if (totalFailed > 0) return 1;
  return 0;
}

function handleUninstall(args) {
  const flags = parseFlags(args);
  const skillNames = flags._;
  const agentId = flags.agent || flags.a;
  const scope = flags.scope || 'project';

  if (skillNames.length === 0 || !agentId) {
    console.error("Usage: mr-agents uninstall <skill...> --agent <id> [--scope user|project]");
    return 2;
  }

  const res = uninstallSkills({
    skillNames,
    agentId,
    scope
  });

  console.log(`\nUninstalled from agent: ${res.agent}`);
  if (res.uninstalled.length > 0) {
    console.log(`  Removed: ${res.uninstalled.join(', ')}`);
  }
  if (res.failed.length > 0) {
    console.log(`  Failures:`);
    for (const f of res.failed) {
      console.log(`    - ${f.skill}: ${f.reason}`);
    }
    return 1;
  }
  return 0;
}

function handleUpdate(args) {
  const flags = parseFlags(args);
  const checkOnly = Boolean(flags.check);
  const lock = loadLockfile();
  const installations = Object.values(lock.installations || {});

  if (installations.length === 0) {
    console.log("No skills currently recorded in .mr-agents/lock.json.");
    return 0;
  }

  console.log(`Checking ${installations.length} installed skill instance(s)...`);
  const outdated = [];

  for (const inst of installations) {
    const meta = getSkill(inst.skill);
    if (!meta) continue;
    if (meta.sha256 !== inst.sha256) {
      outdated.push({ inst, meta });
    }
  }

  if (outdated.length === 0) {
    console.log("✅ All installed skills are up to date!");
    return 0;
  }

  console.log(`Found ${outdated.length} update(s) available:`);
  for (const o of outdated) {
    console.log(`  - ${o.inst.skill} (${o.inst.agent}) [${o.inst.sha256.slice(0, 8)} -> ${o.meta.sha256.slice(0, 8)}]`);
  }

  if (checkOnly) return 0;

  console.log("\nApplying updates with --force...");
  for (const o of outdated) {
    installSkills({
      skillNames: [o.inst.skill],
      agentId: o.inst.agent,
      scope: o.inst.scope,
      force: true
    });
  }
  console.log("✅ Updates completed.");
  return 0;
}

function handleDoctor(args) {
  console.log("\n🩺 Running mr-agents environment and health doctor...\n");
  let issues = 0;

  // 1. Check catalog
  try {
    const cat = loadCatalog();
    console.log(`✅ Dist catalog valid: ${cat.total_skills} skills indexed`);
  } catch (err) {
    console.log(`❌ Catalog error: ${err.message}`);
    issues++;
  }

  // 2. Check packs
  try {
    const packs = loadPacks();
    const count = Object.keys(packs.packs || {}).length;
    console.log(`✅ Packs configuration valid: ${count} packs defined`);
  } catch (err) {
    console.log(`❌ Packs error: ${err.message}`);
    issues++;
  }

  // 3. Check adapters
  const adapters = loadAllAdapters();
  console.log(`✅ Loaded ${adapters.length} adapters from registry`);
  for (const a of adapters) {
    if (!a.id || !a.install_mode || !a.paths) {
      console.log(`❌ Adapter ${a.id || 'unnamed'} missing required configuration`);
      issues++;
    }
  }

  // 4. Check lockfile integrity
  const lock = loadLockfile();
  const installations = Object.values(lock.installations || {});
  console.log(`ℹ️  Found ${installations.length} skill installation(s) in active workspace`);
  for (const inst of installations) {
    const fullPath = path.resolve(process.cwd(), inst.target_path);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Installed skill path missing on disk: ${inst.target_path}`);
      issues++;
    }
  }

  if (issues === 0) {
    console.log("\n🎉 Doctor found 0 issues! System healthy.\n");
    return 0;
  }
  console.log(`\n⚠️ Doctor found ${issues} issue(s).\n`);
  return 1;
}

function handleExport(args) {
  const flags = parseFlags(args);
  const agentId = flags.agent || flags.a || 'generic';
  const outPath = flags.out || flags.o;

  let targets = [];
  const cat = loadCatalog();
  const packs = loadPacks();

  if (flags.all) {
    targets = cat.skills.map(s => s.name);
  } else if (flags.pack) {
    const p = packs.packs?.[flags.pack.toLowerCase()];
    if (!p) {
      console.error(`Unknown pack '${flags.pack}'. Available packs: ${Object.keys(packs.packs || {}).join(', ')}`);
      return 1;
    }
    targets = p.skills || [];
  } else {
    targets = flags._;
  }

  if (targets.length === 0 || !outPath) {
    console.error("Usage: mr-agents export <skill...|--pack X|--all> --agent <id> --out <dir|zip>");
    return 2;
  }

  const resolvedOut = path.resolve(process.cwd(), outPath);
  const isZip = resolvedOut.toLowerCase().endsWith('.zip');

  if (isZip) {
    const zipEntries = [];
    for (const sName of targets) {
      const skill = getSkill(sName);
      if (!skill) {
        console.error(`Skill '${sName}' not found in catalog.`);
        return 1;
      }
      const srcDir = path.join(REPO_ROOT, 'dist', 'skills', sName);
      if (!fs.existsSync(srcDir)) {
        console.error(`Source directory for skill '${sName}' not found at ${srcDir}`);
        return 1;
      }

      function addDirectoryToZip(dir, baseRel = '') {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name === '.git' || entry.name === '.DS_Store' || entry.name === 'Thumbs.db') {
            continue;
          }
          const full = path.join(dir, entry.name);
          const rel = baseRel ? `${baseRel}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            addDirectoryToZip(full, rel);
          } else if (entry.isFile()) {
            zipEntries.push({
              name: rel,
              content: fs.readFileSync(full)
            });
          }
        }
      }

      addDirectoryToZip(srcDir, sName);
    }

    createZipArchive(zipEntries, resolvedOut);
    console.log(`\n✅ Exported ${targets.length} skill(s) successfully to archive ${resolvedOut}`);
    return 0;
  } else {
    fs.mkdirSync(resolvedOut, { recursive: true });

    for (const sName of targets) {
      const skill = getSkill(sName);
      if (!skill) {
        console.error(`Skill '${sName}' not found in catalog.`);
        return 1;
      }
      const srcDir = path.join(REPO_ROOT, 'dist', 'skills', sName);
      const destDir = path.join(resolvedOut, sName);
      fs.cpSync(srcDir, destDir, { recursive: true });
      console.log(`Exported '${sName}' -> ${destDir}`);
    }

    console.log(`\n✅ Exported ${targets.length} skill(s) successfully to directory ${resolvedOut}`);
    return 0;
  }
}
