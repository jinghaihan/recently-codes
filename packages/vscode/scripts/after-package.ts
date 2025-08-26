import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkgJson from '../package.json' with { type: 'json' }

const __dirname = join(fileURLToPath(import.meta.url), '../../')
const PACKAGE_JSON_PATH = join(__dirname, 'package.json')

export function restoreDependencies() {
  // Restore original dependencies after build
  try {
    pkgJson.dependencies['recently-codes-cli'] = 'workspace:*'
    writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(pkgJson, null, 2)}\n`)
    console.log('✅ Restored original dependencies')
  }
  catch (error) {
    console.error('❌ Error in buildEnd hook:', error)
  }
}

restoreDependencies()
