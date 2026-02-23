#!/usr/bin/env node
/**
 * Production start for Next.js in Docker/Easypanel.
 * Uses process.env.PORT (no shell expansion) and binds to 0.0.0.0.
 */
const { spawn } = require('child_process');
const path = require('path');

const port = String(process.env.PORT || '80');
const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

const child = spawn(
  process.execPath,
  [nextBin, 'start', '-H', '0.0.0.0', '-p', port],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
    cwd: path.join(__dirname, '..'),
  }
);

child.on('exit', (code) => process.exit(code ?? 0));
