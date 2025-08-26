import type { ExtensionContext } from 'vscode'
import { exec, execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { useLogger } from 'reactive-vscode'
import { ProgressLocation, window } from 'vscode'
import { RUNTIME_DEPS } from './constants'
import { displayName } from './generated/meta'

const execAsync = promisify(exec)
const execFileAsync = promisify(execFile)

export const logger = useLogger(displayName)

export async function ensureDeps(ctx: ExtensionContext, silent: boolean = false) {
  const moduleRoot = join(ctx.extensionPath, 'node_modules')
  const sqlite3Exists = await hasSqlite3()

  const deps = RUNTIME_DEPS.filter(dep => dep !== 'better-sqlite3' || !sqlite3Exists)
  const depPaths = deps.map(dep => join(moduleRoot, dep))
  const missingDeps = deps.filter((_, index) => !existsSync(depPaths[index]))
  const depMessage = missingDeps.join(', ')

  if (missingDeps.length > 0) {
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: `Installing ${depMessage}...`,
      cancellable: false,
    }, async (progress) => {
      progress.report({ increment: 0 })
      logger.info(`Installing ${depMessage}...`)

      try {
        const { stderr } = await execAsync(`pnpm install ${RUNTIME_DEPS.join(' ')}`, {
          cwd: ctx.extensionPath,
        })
        if (stderr) {
          logger.warn('Installation stderr:', stderr)
        }
        progress.report({ increment: 100 })

        logger.info(`${depMessage} installed successfully`)
        window.showInformationMessage(`${depMessage} installed successfully`)
      }
      catch (error) {
        logger.error(`Failed to install ${depMessage}:`, error)
        throw error
      }
    })
  }
  else {
    if (!silent) {
      window.showInformationMessage(`${RUNTIME_DEPS.join(', ')} is already installed`)
    }
  }
}

export async function hasSqlite3(): Promise<boolean> {
  try {
    await execFileAsync('sqlite3', ['--version'])
    return true
  }
  catch {
    return false
  }
}
