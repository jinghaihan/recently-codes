import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'
import pkgJson from './package.json' with { type: 'json' }

const __dirname = join(fileURLToPath(import.meta.url), '../')
const PACKAGE_JSON_PATH = join(__dirname, 'package.json')
const CLI_PACKAGE_JSON_PATH = join(__dirname, '../cli/package.json')

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  external: ['vscode'],
  shims: false,
  dts: false,
  clean: true,
  sourcemap: true,
  hooks: {
    'build:before': () => {
      try {
        const cliPkgJson = JSON.parse(readFileSync(CLI_PACKAGE_JSON_PATH, 'utf8'))

        if (pkgJson.dependencies['recently-codes-cli'] === 'workspace:*') {
          pkgJson.dependencies['recently-codes-cli'] = cliPkgJson.version
          writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(pkgJson, null, 2)}\n`)
          console.log(`✅ Replaced workspace:* with version ${cliPkgJson.version}`)
        }
      }
      catch (error) {
        console.error('❌ Error in buildStart hook:', error)
      }
    },
  },
})
