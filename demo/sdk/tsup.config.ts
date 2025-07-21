import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  treeshake: true,
  external: [
    '@dfinity/agent',
    '@dfinity/identity',
    'bip322-js',
    'axios'
  ],
  banner: {
    js: '/* Odin SDK - https://github.com/odin/odin-sdk */',
  },
}); 