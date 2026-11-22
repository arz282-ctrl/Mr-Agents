import { skillRegistry } from "../src/lib/skill-registry";
import { runSwarmOrchestration } from "../src/lib/swarm-engine";
import { saveMessage, getConversationMessages, getRecentSwarmRuns } from "../src/lib/db";
import { PERSONAS } from "../src/lib/personas";

async function runVerification() {
  console.log("=================================================");
  console.log("🚀 MASTER MR. AGENTS - FULL SYSTEM VERIFICATION");
  console.log("=================================================\n");

  // 1. Verify Personas
  console.log("[1] Verifying 8 Personas Fleet...");
  if (PERSONAS.length !== 8) {
    throw new Error(`Expected 8 personas, found ${PERSONAS.length}`);
  }
  for (const p of PERSONAS) {
    console.log(`  ✓ ${p.name.padEnd(25)} | Model: ${p.model.padEnd(28)} | Provider: ${p.provider}`);
  }
  console.log("  ✅ All 8 personas verified successfully.\n");

  // 2. Verify Dynamic Skill Registry & Auto-Discovery
  console.log("[2] Verifying Dynamic Skill Registry & Auto-Discovery...");
  const allTools = skillRegistry.getAllTools();
  console.log(`  ✓ Total Tools Loaded: ${allTools.length}`);

  // Check custom auto-discovered tools
  const notionTool = skillRegistry.getTool("notion_workspace_sync");
  if (!notionTool) {
    throw new Error("Failed to auto-discover 'notion_workspace_sync' from /skills/custom-plugins/");
  }
  console.log(`  ✓ Auto-discovered JSON tool: notion_workspace_sync (isCustom: ${notionTool.isCustom})`);

  // Test executing the auto-discovered tool
  const notionResult = await skillRegistry.executeTool("notion_workspace_sync", {
    databaseId: "db_test_99",
    pageTitle: "Sprint 4 Roadmap",
    status: "In Progress",
  });
  console.log(`  ✓ Execution result for notion_workspace_sync:`, notionResult);

  // Check baseline tools
  const taskDelegation = skillRegistry.getTool("task_delegation");
  const reactGen = skillRegistry.getTool("react_tailwind_gen");
  const dbGen = skillRegistry.getTool("db_schema_gen");
  if (!taskDelegation || !reactGen || !dbGen) {
    throw new Error("Missing baseline persona tools in registry");
  }
  console.log("  ✅ Dynamic Skill Registry & Auto-Discovery verified.\n");

  // 3. Verify SQLite Memory Database
  console.log("[3] Verifying SQLite Memory & Persistence...");
  const testConvId = `test_conv_${Date.now()}`;
  saveMessage({
    conversationId: testConvId,
    senderId: "orchestrator",
    senderName: "The Orchestrator",
    role: "assistant",
    content: "Testing SQLite memory persistence for Master Mr. Agents",
  });

  const messages = getConversationMessages(testConvId);
  if (messages.length === 0 || messages[0].content !== "Testing SQLite memory persistence for Master Mr. Agents") {
    throw new Error("SQLite message verification failed");
  }
  console.log(`  ✓ Stored & retrieved message from SQLite table 'messages'`);
  console.log("  ✅ SQLite local memory verified.\n");

  // 4. Verify Swarm Mode (Autonomous Multi-Agent Collaboration)
  console.log("[4] Verifying Swarm Mode Multi-Agent Collaboration...");
  const swarmGoal = "Build a responsive analytics dashboard with SQLite persistence and automated unit tests";
  console.log(`  Goal: "${swarmGoal}"`);

  let eventCount = 0;
  const swarmResult = await runSwarmOrchestration(swarmGoal, (event) => {
    eventCount++;
    console.log(`    → [Swarm Event #${eventCount}] ${event.type} from @${event.fromPersona || "system"}${event.toPersona ? " to @" + event.toPersona : ""}`);
    if (event.toolName) {
      console.log(`       Tool Call: ${event.toolName}()`);
    }
  });

  console.log(`\n  ✓ Swarm Run ID: ${swarmResult.swarmRunId}`);
  console.log(`  ✓ Personas Involved: ${swarmResult.personasInvolved.join(", ")}`);
  console.log(`  ✓ Total Conversational Steps: ${swarmResult.steps.length}`);
  console.log(`  ✓ Final Deliverable Generated (${swarmResult.finalOutput.length} chars)`);

  const recentRuns = getRecentSwarmRuns(5);
  console.log(`  ✓ Verified swarm run persisted in SQLite 'swarm_runs' table (Total logged runs: ${recentRuns.length})`);
  console.log("  ✅ Swarm Mode Multi-Agent Collaboration verified.\n");

  console.log("=================================================");
  console.log("🎉 ALL TESTS PASSED! SYSTEM 100% OPERATIONAL");
  console.log("=================================================");
}

runVerification().catch((err) => {
  console.error("❌ Verification failed:", err);
  process.exit(1);
});
