import { access, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileAsync } from './utils'

export async function getGitBranch(uri: string): Promise<string | undefined> {
  try {
    // If it's a file URL, convert it to a file path
    if (uri.startsWith('file://')) {
      uri = fileURLToPath(uri)
    }

    // If it's a file path, get its directory
    const stats = await stat(uri)
    if (!stats.isDirectory()) {
      uri = dirname(uri)
    }

    // Check if .git directory exists
    const gitDir = join(uri, '.git')
    const isGitRepo = await access(gitDir)
      .then(() => true)
      .catch(() => false)

    if (!isGitRepo) {
      return
    }

    // Run git command to get current branch
    const { stdout } = await execFileAsync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: uri,
      encoding: 'utf-8',
    })

    const branch = stdout.trim()
    return branch || undefined
  }
  catch {
    // ignore error
  }
}
