#!/usr/bin/env node

/**
 * Script untuk memonitor dan debug masalah di mode production
 *
 * Cara penggunaan:
 * 1. Di terminal: NODE_ENV=production node debug-production.js
 * 2. Buka browser dan kunjungi aplikasi di localhost:9999
 * 3. Log error dan event akan ditulis ke console dan file debug-log.txt
 */

const fs = require('fs');
const { EventEmitter } = require('events');
const { spawn } = require('child_process');
const path = require('path');

// Meningkatkan batas listener default
EventEmitter.defaultMaxListeners = 30;

// Buat file log
const logFile = path.join(__dirname, 'debug-log.txt');
fs.writeFileSync(
  logFile,
  `=== DEBUG LOG STARTED ${new Date().toISOString()} ===\n\n`
);

// Fungsi untuk mencatat log
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Tulis ke file log
  fs.appendFileSync(logFile, logMessage);

  // Tampilkan di console
  console.log(`[DEBUG] ${message}`);
}

// Setup listener untuk memory leaks
process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    log(`MEMORY LEAK WARNING: ${warning.message}`);
    log(`Emitter type: ${warning.emitter?.constructor?.name}`);

    // Mencoba mengambil stack trace
    if (warning.stack) {
      log(`Stack: ${warning.stack}`);
    }
  }
});

// Setup listener untuk uncaught exception
process.on('uncaughtException', (error) => {
  log(`UNCAUGHT EXCEPTION: ${error.message}`);
  log(`Stack: ${error.stack}`);
});

// Setup listener untuk unhandled rejection
process.on('unhandledRejection', (reason, promise) => {
  log(`UNHANDLED REJECTION: ${reason}`);
});

// Jalankan aplikasi Next.js di mode production
log('Starting Next.js in production mode...');

const nextStart = spawn('npm', ['run', 'prod-local'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: 9999,
    DEBUG: '*',
  },
  stdio: ['inherit', 'pipe', 'pipe'],
});

// Tangkap output dari Next.js
nextStart.stdout.on('data', (data) => {
  const output = data.toString().trim();
  console.log(output);

  // Cari pola error dan catat
  if (
    output.includes('Error:') ||
    output.includes('error:') ||
    output.includes('MaxListenersExceededWarning')
  ) {
    log(`NEXTJS OUTPUT (ERROR): ${output}`);
  }

  // Tangkap log browser request
  if (
    (output.includes('Request') && output.includes('200')) ||
    output.includes('304') ||
    output.includes('404') ||
    output.includes('500')
  ) {
    log(`REQUEST: ${output}`);
  }
});

// Tangkap error dari Next.js
nextStart.stderr.on('data', (data) => {
  const errorOutput = data.toString().trim();
  console.error(errorOutput);
  log(`NEXTJS ERROR: ${errorOutput}`);
});

// Handle close
nextStart.on('close', (code) => {
  log(`Next.js process exited with code ${code}`);
});

log('Debug monitor started. Logs will be written to debug-log.txt');
log('Open http://localhost:9999 in your browser to test the application.');
