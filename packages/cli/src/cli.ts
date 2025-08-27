import type { CAC } from 'cac'
import type { CommandOptions } from './types'
import process from 'node:process'
import { cac } from 'cac'
import { getRecentlyCodes, updateRecentlyCodes } from 'recently-codes'
import { name, version } from '../package.json'
import { resolveConfig } from './config'

try {
  const cli: CAC = cac(name)

  cli
    .command('[mode]', 'The mode to use')
    .option('--editors <editors...>', 'The editors to use')
    .option('--git-branch', 'Show git branch', { default: false })
    .option('--entries <entries>', 'The entries to operation, it\'s a JSON string')
    .action(async (mode, options: CommandOptions) => {
      resolveConfig(mode, options)

      switch (options.mode) {
        case 'search': {
          const RecentlyCodes = await getRecentlyCodes({
            editors: options.editors,
            gitBranch: options.gitBranch,
          })
          console.log(JSON.stringify(RecentlyCodes, null, 2))
          break
        }
        case 'update': {
          if (options.entries) {
            await updateRecentlyCodes({
              editors: options.editors,
              entries: JSON.parse(options.entries),
            })
          }
          break
        }
        case 'clean': {
          await updateRecentlyCodes({
            editors: options.editors,
            entries: [],
          })
          break
        }
      }
    })

  cli.help()
  cli.version(version)
  cli.parse()
}
catch (error) {
  console.error(error)
  process.exit(1)
}
