import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  format: ['esm'],
  external: ['better-sqlite3'],
  dts: true,
  clean: true,
})
