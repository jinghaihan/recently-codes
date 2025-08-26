import type { EntryLike, SearchOptions } from 'recently-codes'
import process from 'node:process'
import { execFileAsync } from 'recently-codes'

export * from './types'
export { execFileAsync, hasSqlite3 } from 'recently-codes'

export async function processCli(path: string, options: SearchOptions = {}) {
  const { editors, gitBranch = false } = options
  const args: string[] = [path]
  editors?.forEach(i => args.push('--editors', `"${i}"`))
  if (gitBranch) {
    args.push('--git-branch')
  }

  let stdout: string
  try {
    // Try to use node if it's available
    const result = await execFileAsync('node', args, { encoding: 'utf-8' })
    stdout = result.stdout
  }
  catch {
    // Fallback to using the current process path
    const result = await execFileAsync(process.execPath, args, { encoding: 'utf-8' })
    stdout = result.stdout
  }

  return JSON.parse(stdout) as EntryLike[]
}
