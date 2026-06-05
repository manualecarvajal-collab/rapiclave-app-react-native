import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const stubs = path.resolve(__dirname, 'web/stubs');
const rnWebRoot = path.resolve(__dirname, 'node_modules/react-native-web');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rn-web',
      enforce: 'pre',
      resolveId(source) {
        if (source === 'react-native/Libraries/Utilities/codegenNativeComponent') {
          return path.join(stubs, 'Libraries/Utilities/codegenNativeComponent.js');
        }
        if (source === 'react-native/Libraries/EventEmitter/NativeEventEmitter') {
          return path.join(stubs, 'Libraries/EventEmitter/NativeEventEmitter.js');
        }
        if (source === 'react-native') {
          return path.join(rnWebRoot, 'dist/index.js');
        }
        if (source.startsWith('react-native/')) {
          const webPath = source.replace('react-native/', '');
          return path.join(rnWebRoot, 'dist', webPath);
        }
        return null;
      },
    },
  ],
  optimizeDeps: {
    exclude: ['react-native', 'react-native-safe-area-context'],
    include: ['react-native-web'],
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
