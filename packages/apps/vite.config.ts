import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../..');
const packagesRoot = path.join(workspaceRoot, 'packages');

function manualChunks (id: string): string | undefined {
  if (id.includes('/packages/apps-config/src/api/typesBundle')) {
    return 'type';
  }

  if (id.includes('/packages/apps-config/src/ui/logos/')) {
    return 'logo';
  }

  if (id.includes('/packages/apps-config/src/')) {
    return 'conf';
  }

  if (id.includes('/packages/react-components/src/IdentityIcon/RoboHash/')) {
    return 'robo';
  }

  if (/\/packages\/react-[^/]+\/src\//.test(id)) {
    return 'comm';
  }

  if (/\/packages\/page-[^/]+\/src\//.test(id)) {
    return 'page';
  }

  if (id.includes('/node_modules/')) {
    return 'vendor';
  }

  return undefined;
}

export default defineConfig({
  base: './',
  build: {
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true,
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks
      }
    },
    sourcemap: process.env.BUILD_ANALYZE === '1'
  },
  define: {
    'process.env.WS_URL': JSON.stringify(process.env.WS_URL ?? '')
  },
  optimizeDeps: {
    include: [
      'assert',
      'buffer',
      'crypto-browserify',
      'https-browserify',
      'os-browserify/browser',
      'path-browserify',
      'process',
      'stream-browserify',
      'stream-http'
    ]
  },
  plugins: [
    react(),
    tsconfigPaths({
      projects: [path.join(workspaceRoot, 'tsconfig.json')]
    }),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      include: ['assert', 'buffer', 'crypto', 'http', 'https', 'os', 'path', 'process', 'stream']
    })
  ],
  preview: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      assert: 'assert',
      crypto: 'crypto-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      path: 'path-browserify',
      stream: 'stream-browserify'
    },
    preserveSymlinks: true
  },
  server: {
    fs: {
      allow: [workspaceRoot, packagesRoot]
    },
    host: '0.0.0.0',
    port: 3000
  }
});
