import { writeFileSync } from 'node:fs'
import pkgJson from '../package.json' with { type: 'json' }
import { PACKAGE_JSON_PATH } from './constants'

export function restoreDependencies() {
  // Restore original dependencies after build
  try {
    pkgJson.dependencies['recently-codes-cli'] = 'workspace:*'
    writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(pkgJson, null, 2)}\n`)
    console.log('Restored original dependencies')
  }
  catch (error) {
    console.error('Error in buildEnd hook:', error)
  }
}

restoreDependencies()
