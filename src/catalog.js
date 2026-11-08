import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(REPO_ROOT, 'dist', 'catalog.json');
const PACKS_PATH = path.join(REPO_ROOT, 'packs.json');

export function loadCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(`Catalog not found at ${CATALOG_PATH}. Run 'npm run normalize' or 'python3 tools/normalize.py' first.`);
  }
  return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));
}

export function loadPacks() {
  if (!fs.existsSync(PACKS_PATH)) {
    return { packs: {} };
  }
  return JSON.parse(fs.readFileSync(PACKS_PATH, 'utf-8'));
}

export function findSkills({ pack, category, query, agent } = {}) {
  const cat = loadCatalog();
  const packsData = loadPacks();
  let skills = cat.skills;

  if (pack) {
    const p = packsData.packs?.[pack.toLowerCase()];
    if (!p) {
      throw new Error(`Unknown pack '${pack}'. Available packs: ${Object.keys(packsData.packs || {}).join(', ')}`);
    }
    const packSkillNames = new Set(p.skills || []);
    skills = skills.filter(s => packSkillNames.has(s.name));
  }

  if (category) {
    skills = skills.filter(s => s.category?.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    skills = skills.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q)
    );
  }

  return skills;
}

export function getSkill(skillName) {
  const cat = loadCatalog();
  return cat.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase()) || null;
}
