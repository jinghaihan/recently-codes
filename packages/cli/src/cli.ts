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
    .option('--editor <editors...>', 'The editor to use')
    .action(async (options: CommandOptions) => {
      if (options.editor && !Array.isArray(options.editor)) {
        options.editor = [options.editor]
      }
      const RecentlyCodes = await getRecentlyCodes(options.editor)
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
