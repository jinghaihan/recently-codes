import type { ExtensionContext } from 'vscode'
import { defineExtension, useCommand } from 'reactive-vscode'
import { commands, ThemeIcon, Uri, window } from 'vscode'
import { config } from './config'
import { CLI_PATH } from './constants'
import { ensureDeps, logger } from './utils'

const { activate, deactivate } = defineExtension(async (ctx: ExtensionContext) => {
  useCommand('octohash.crosside-recently-codes.installDependencies', async () => {
    await ensureDeps(ctx)
  })

  useCommand('octohash.crosside-recently-codes.listRecentlyCodes', async () => {
    try {
      await ensureDeps(ctx, true)
      logger.info(`Fetching recent projects from: ${config.editors.join(', ')}`)

      logger.info(`CLI path: ${CLI_PATH}`)
      const { processCli } = await import('recently-codes-cli')
      const recentlyCodes = await processCli(CLI_PATH, config.editors)
      logger.info(`CLI output: \n ${JSON.stringify(recentlyCodes, null, 2)}`)

      if (recentlyCodes.length === 0) {
        window.showInformationMessage('No recent projects found.')
        return
      }

      const iconPathFolder = new ThemeIcon('folder')
      const iconPathFile = new ThemeIcon('file')

      const items = recentlyCodes.map((entry) => {
        const editorsInfo = `Recently opened in: ${entry.editors.join(', ')}`
        const branchInfoLine = entry.gitBranch ? `(Branch: ${entry.gitBranch})` : ''
        const detailParts = [editorsInfo]
        if (branchInfoLine) {
          detailParts.push(branchInfoLine)
        }

        return {
          label: entry.name,
          description: entry.path,
          detail: detailParts.join(' '),
          iconPath: entry.type === 'folder' ? iconPathFolder : iconPathFile,
          path: entry.uri,
        }
      })

      const selected = await window.showQuickPick(items, {
        placeHolder: 'Select a recent project to open',
        matchOnDescription: true,
        matchOnDetail: true,
      })

      if (selected) {
        const uri = Uri.parse(selected.path)
        await commands.executeCommand('vscode.openFolder', uri, config.openInNewWindow)
      }
    }
    catch (error) {
      logger.error('Failed to fetch recent projects:', error)
      window.showErrorMessage(`Failed to fetch recent projects: ${error instanceof Error ? error.message : String(error)}`)
    }
  })
})

export { activate, deactivate }
