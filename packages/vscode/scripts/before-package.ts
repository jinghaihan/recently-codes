import { readFileSync, writeFileSync } from 'node:fs'
import pkgJson from '../package.json' with { type: 'json' }
import { CLI_PACKAGE_JSON_PATH, PACKAGE_JSON_PATH } from './constants'

export function changeDependencies() {
  try {
    const cliPkgJson = JSON.parse(readFileSync(CLI_PACKAGE_JSON_PATH, 'utf8'))

    if (pkgJson.dependencies['recently-codes-cli'] === 'workspace:*') {
      pkgJson.dependencies['recently-codes-cli'] = cliPkgJson.version
      writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(pkgJson, null, 2)}\n`)
      console.log(`Replaced workspace:* with version ${cliPkgJson.version}`)
    }
  }
  catch (error) {
    console.error('Error in buildStart hook:', error)
  }
}

changeDependencies()
