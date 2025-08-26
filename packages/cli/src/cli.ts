import type { CAC } from 'cac'
import type { CommandOptions } from './types'
import process from 'node:process'
import { cac } from 'cac'
import { getRecentlyCodes } from 'recently-codes'
import { name, version } from '../package.json'

try {
  const cli: CAC = cac(name)

  cli
    .command('')
    .option('--codes <codes...>', 'The editor to use')
    .option('--git-branch', 'Show git branch', { default: false })
    .action(async (options: CommandOptions) => {
      if (options.codes && !Array.isArray(options.codes)) {
        options.codes = [options.codes]
      }
      const RecentlyCodes = await getRecentlyCodes({
        codes: options.codes,
        gitBranch: options.gitBranch,
      })
      console.log(JSON.stringify(RecentlyCodes, null, 2))
    })

  cli.help()
  cli.version(version)
  cli.parse()
}
catch (error) {
  console.error(error)
  process.exit(1)
}
