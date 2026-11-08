import test from 'node:test';
import assert from 'node:assert/strict';
import { updateManagedBlock, removeManagedBlock, extractManagedBlock } from '../src/managed_block.js';

test('managed_block: inserts block cleanly into empty or new document', () => {
  const content = updateManagedBlock('', '### Skill Index\n- **webdev**: Build web apps');
  assert.match(content, /<!-- mr-agents:begin -->/);
  assert.match(content, /### Skill Index/);
  assert.match(content, /<!-- mr-agents:end -->/);
});

test('managed_block: preserves existing user content outside markers', () => {
  const existing = `# My Project\n\nCustom instructions for team.\n\n<!-- mr-agents:begin -->\nold block\n<!-- mr-agents:end -->\n\n## Footer Notes\nKeep this intact.`;
  const updated = updateManagedBlock(existing, 'new block content');

  assert.match(updated, /# My Project/);
  assert.match(updated, /Custom instructions for team\./);
  assert.match(updated, /new block content/);
  assert.doesNotMatch(updated, /old block/);
  assert.match(updated, /## Footer Notes/);
  assert.match(updated, /Keep this intact\./);
});

test('managed_block: idempotent on re-run with same content', () => {
  const existing = `# Header\n\n<!-- mr-agents:begin -->\ncontent line 1\n<!-- mr-agents:end -->`;
  const run1 = updateManagedBlock(existing, 'content line 1');
  const run2 = updateManagedBlock(run1, 'content line 1');
  assert.equal(run1, run2);
});

test('managed_block: safely repairs corrupted markers', () => {
  const corrupted = `# Header\n<!-- mr-agents:begin -->\norphaned begin without end\n# User Section\n`;
  const repaired = updateManagedBlock(corrupted, 'clean managed block');
  
  assert.match(repaired, /# Header/);
  assert.match(repaired, /# User Section/);
  assert.match(repaired, /<!-- mr-agents:begin -->\nclean managed block\n<!-- mr-agents:end -->/);
});

test('managed_block: removes block cleanly and leaves user content', () => {
  const full = `# Main Readme\n\n<!-- mr-agents:begin -->\nskills here\n<!-- mr-agents:end -->\n\nFooter`;
  const removed = removeManagedBlock(full);
  assert.doesNotMatch(removed, /mr-agents:begin/);
  assert.doesNotMatch(removed, /skills here/);
  assert.match(removed, /# Main Readme/);
  assert.match(removed, /Footer/);
});
