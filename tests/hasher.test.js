import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { hashFile, computeFolderSha256 } from '../src/hasher.js';

test('hasher: computes deterministic folder sha256 regardless of file ordering', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-test-hasher-'));
  
  try {
    fs.writeFileSync(path.join(tmpDir, 'b.txt'), 'hello');
    fs.writeFileSync(path.join(tmpDir, 'a.txt'), 'world');
    fs.mkdirSync(path.join(tmpDir, 'sub'));
    fs.writeFileSync(path.join(tmpDir, 'sub', 'c.txt'), 'nested content');

    const hash1 = computeFolderSha256(tmpDir);
    const hash2 = computeFolderSha256(tmpDir);
    assert.equal(hash1, hash2);
    assert.match(hash1, /^[a-f0-9]{64}$/);

    // Modifying one file changes hash
    fs.writeFileSync(path.join(tmpDir, 'b.txt'), 'hello modified');
    const hash3 = computeFolderSha256(tmpDir);
    assert.notEqual(hash1, hash3);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
