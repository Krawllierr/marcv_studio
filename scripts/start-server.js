#!/usr/bin/env node
/**
 * Production start for Next.js in Docker/Easypanel.
 * Uses process.env.PORT (no shell expansion) and binds to 0.0.0.0.
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const DEBUG = {
  endpoint: 'http://127.0.0.1:7608/ingest/88e86f95-ae6a-4466-9ee7-33e10967ec1d',
  sessionId: '9fd6fb',
  log(meta) {
    const payload = { sessionId: this.sessionId, location: 'start-server.js', timestamp: Date.now(), ...meta };
    console.error('[marcv-debug]', JSON.stringify(payload));
    if (typeof fetch !== 'undefined') {
      fetch(this.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': this.sessionId }, body: JSON.stringify(payload) }).catch(() => {});
    }
  },
};

// #region agent log
DEBUG.log({ message: 'start-server entry', data: { PORT: process.env.PORT, __dirname }, hypothesisId: 'H1' });
// #endregion

const port = String(process.env.PORT || '80');
const cwd = path.join(__dirname, '..');
const nextBin = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next');
const nextBinExists = fs.existsSync(nextBin);

// #region agent log
DEBUG.log({ message: 'paths resolved', data: { port, cwd, nextBin, nextBinExists }, hypothesisId: 'H1' });
// #endregion

const child = spawn(
  process.execPath,
  [nextBin, 'start', '-H', '0.0.0.0', '-p', port],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
    cwd,
  }
);

// #region agent log
DEBUG.log({ message: 'spawn called', data: { pid: child.pid }, hypothesisId: 'H3' });
// #endregion

child.on('error', (err) => {
  // #region agent log
  DEBUG.log({ message: 'child error', data: { err: String(err), code: err.code }, hypothesisId: 'H3' });
  // #endregion
  console.error('[marcv-debug] child error:', err);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  // #region agent log
  DEBUG.log({ message: 'child exit', data: { code, signal }, hypothesisId: 'H4' });
  // #endregion
  console.error('[marcv-debug] child exit code=%s signal=%s', code, signal);
  process.exit(code ?? 0);
});
