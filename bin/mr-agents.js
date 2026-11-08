#!/usr/bin/env node

import { runCli } from '../src/cli.js';

const exitCode = runCli(process.argv.slice(2));
if (typeof exitCode === 'number') {
  process.exitCode = exitCode;
}
