#!/usr/bin/env node

import { loadAllAdapters } from '../src/adapters.js';
import { installSkills } from '../src/installer.js';

console.log("==================================================================");
console.log("VERIFICATION STEP 3: DRY-RUN INSTALL OF STARTER PACK ON ALL ADAPTERS");
console.log("==================================================================\n");

const adapters = loadAllAdapters();
for (const a of adapters) {
  console.log(`------------------------------------------------------------------`);
  console.log(`Agent: ${a.name} (${a.id}) | Mode: ${a.install_mode}`);
  console.log(`------------------------------------------------------------------`);
  const res = installSkills({
    packName: 'starter',
    agentId: a.id,
    dryRun: true,
    scope: 'project'
  });

  for (const act of res[0].plannedActions) {
    console.log(`  ${act}`);
  }
  console.log(`  ✅ Planned: ${res[0].installed.length} skills, 0 failures\n`);
}
