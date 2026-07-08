import chokidar from 'chokidar';
import { exec } from 'child_process';

console.log('Starting custom CSS watcher using Chokidar (Polling mode)...');

let debounceTimer;
const debounceDelay = 150; // ms

function rebuild() {
  console.log(`[${new Date().toLocaleTimeString()}] Rebuilding CSS...`);
  exec('pnpm generate-css', (error, stdout, stderr) => {
    if (error) {
      console.error(`Build error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr.trim()}`);
    }
    console.log(stdout.trim());
  });
}

// Watch src folder with polling mode enabled to avoid EMFILE/FSEvents errors
const watcher = chokidar.watch('./src', {
  ignored: [/node_modules/, /\.git/, /output\.css/],
  persistent: true,
  ignoreInitial: true,
  usePolling: true,
  interval: 500, // Poll every 500ms
  binaryInterval: 1000 // Poll binary files every 1s
});

watcher.on('all', (event, path) => {
  const ext = path.split('.').pop();
  if (['svelte', 'ts', 'js', 'html', 'css'].includes(ext)) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(rebuild, debounceDelay);
  }
});

// Run initial build on start
rebuild();

console.log('Watching ./src recursively for changes (Polling mode)...');
