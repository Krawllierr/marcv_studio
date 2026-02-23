#!/usr/bin/env node
/**
 * Production start for Next.js in Docker/Easypanel.
 * Uses process.env.PORT (no shell expansion) and binds to 0.0.0.0.
 */
const { spawn } = require('child_process');
const path = require('path');

const port = String(process.env.PORT || '80');
const cwd = path.join(__dirname, '..');
const nextBin = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next');

const child = spawn(
  process.execPath,
  [nextBin, 'start', '-H', '0.0.0.0', '-p', port],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
    cwd,
  }
);

child.on('error', (err) => {
  console.error('child error:', err);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  console.error('child exit code=%s signal=%s', code, signal);
  process.exit(code ?? 0);
});
