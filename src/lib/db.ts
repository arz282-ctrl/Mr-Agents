import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "mr_agents.db");
  const db = new DatabaseSync(dbPath);

  // Initialize tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      persona_id TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      sender_name TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      tool_calls TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id)
    );

    CREATE TABLE IF NOT EXISTS swarm_runs (
      id TEXT PRIMARY KEY,
      goal TEXT NOT NULL,
      status TEXT NOT NULL,
      personas_involved TEXT NOT NULL,
      final_output TEXT,
      created_at INTEGER NOT NULL,
      completed_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS swarm_messages (
      id TEXT PRIMARY KEY,
      swarm_run_id TEXT NOT NULL,
      from_persona TEXT NOT NULL,
      to_persona TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      tool_name TEXT,
      tool_payload TEXT,
      tool_result TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (swarm_run_id) REFERENCES swarm_runs(id)
    );

    CREATE TABLE IF NOT EXISTS agent_memory (
      key TEXT PRIMARY KEY,
      persona_id TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);

  dbInstance = db;
  return dbInstance;
}

// Memory & Conversation APIs
export function saveMessage(params: {
  id?: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolCalls?: any;
}) {
  const db = getDb();
  const id = params.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = Date.now();

  // Ensure conversation parent record exists
  const ensureConv = db.prepare(`
    INSERT OR IGNORE INTO conversations (id, persona_id, title, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  ensureConv.run(params.conversationId, params.senderId, "Active Session", now, now);

  const insert = db.prepare(`
    INSERT INTO messages (id, conversation_id, sender_id, sender_name, role, content, tool_calls, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    params.conversationId,
    params.senderId,
    params.senderName,
    params.role,
    params.content,
    params.toolCalls ? JSON.stringify(params.toolCalls) : null,
    now
  );

  return { id, ...params, created_at: now };
}

export function getConversationMessages(conversationId: string) {
  const db = getDb();
  const select = db.prepare(`
    SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC
  `);
  return select.all(conversationId) as any[];
}

export function createSwarmRun(goal: string, personasInvolved: string[]): string {
  const db = getDb();
  const id = `swarm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = Date.now();

  const insert = db.prepare(`
    INSERT INTO swarm_runs (id, goal, status, personas_involved, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  insert.run(id, goal, "in_progress", JSON.stringify(personasInvolved), now);
  return id;
}

export function logSwarmMessage(params: {
  swarmRunId: string;
  fromPersona: string;
  toPersona: string;
  stepIndex: number;
  role: string;
  content: string;
  toolName?: string;
  toolPayload?: any;
  toolResult?: any;
}) {
  const db = getDb();
  const id = `smsg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = Date.now();

  const insert = db.prepare(`
    INSERT INTO swarm_messages (id, swarm_run_id, from_persona, to_persona, step_index, role, content, tool_name, tool_payload, tool_result, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    params.swarmRunId,
    params.fromPersona,
    params.toPersona,
    params.stepIndex,
    params.role,
    params.content,
    params.toolName || null,
    params.toolPayload ? JSON.stringify(params.toolPayload) : null,
    params.toolResult ? JSON.stringify(params.toolResult) : null,
    now
  );

  return { id, ...params, created_at: now };
}

export function finishSwarmRun(swarmRunId: string, finalOutput: string) {
  const db = getDb();
  const now = Date.now();
  const update = db.prepare(`
    UPDATE swarm_runs SET status = 'completed', final_output = ?, completed_at = ? WHERE id = ?
  `);
  update.run(finalOutput, now, swarmRunId);
}

export function getRecentSwarmRuns(limit = 10) {
  const db = getDb();
  const select = db.prepare(`
    SELECT * FROM swarm_runs ORDER BY created_at DESC LIMIT ?
  `);
  return select.all(limit);
}
