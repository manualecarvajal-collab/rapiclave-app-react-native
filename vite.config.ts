import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const stubs = path.resolve(__dirname, 'web/stubs');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rn-web-stubs',
      enforce: 'pre',
      resolveId(source) {
        if (source === 'react-native/Libraries/Utilities/codegenNativeComponent') {
          return this.resolve(
            path.join(stubs, 'Libraries/Utilities/codegenNativeComponent.js'),
          );
        }
        if (source === 'react-native/Libraries/EventEmitter/NativeEventEmitter') {
          return this.resolve(
            path.join(stubs, 'Libraries/EventEmitter/NativeEventEmitter.js'),
          );
        }
        if (source === 'react-native') {
          return this.resolve('react-native-web');
        }
        if (source.startsWith('react-native/')) {
          const webPath = source.replace('react-native/', 'react-native-web/dist/');
          return this.resolve(webPath);
        }
        return null;
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
