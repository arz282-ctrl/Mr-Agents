import test from 'node:test';
import assert from 'node:assert/strict';
import { loadAllAdapters, getAdapter } from '../src/adapters.js';

test('adapters: all 13 required adapters are registered and valid', () => {
  const adapters = loadAllAdapters();
  const ids = adapters.map(a => a.id);
  const required = [
    'claude-code',
    'claude-desktop',
    'codex',
    'gemini',
    'kimi',
    'cursor',
    'windsurf',
    'copilot',
    'cline',
    'aider',
    'opencode',
    'generic',
    'manus'
  ];

  for (const req of required) {
    assert.ok(ids.includes(req), `Missing required adapter: ${req}`);
    const a = getAdapter(req);
    assert.equal(a.status, 'stable');
    assert.ok(a.install_mode, `Adapter ${req} missing install_mode`);
    assert.ok(a.paths?.project, `Adapter ${req} missing project path`);
  }
});

test('adapters: cursor transform defines valid MDC configuration', () => {
  const cursor = getAdapter('cursor');
  assert.equal(cursor.install_mode, 'rule-file');
  assert.equal(cursor.transform?.type, 'cursor-mdc');
  assert.equal(cursor.transform?.extension, '.mdc');
});

test('adapters: copilot and aider use instruction-index', () => {
  const copilot = getAdapter('copilot');
  assert.equal(copilot.install_mode, 'instruction-index');
  assert.equal(copilot.index_config?.target_file, '.github/copilot-instructions.md');

  const aider = getAdapter('aider');
  assert.equal(aider.install_mode, 'instruction-index');
  assert.equal(aider.index_config?.target_file, 'CONVENTIONS.md');
});
