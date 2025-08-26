import type { Application } from '@raycast/api'
import type { EditorName } from 'recently-codes'
import { getApplications } from '@raycast/api'
import { LRUCache } from 'lru-cache'
import { EDITOR_NAME_MAP } from 'recently-codes'

const cacheApplications = new LRUCache<string, Application>({
  max: 1000,
})

async function cachedGetApplications() {
  if (cacheApplications.size === 0) {
    const apps = await getApplications()
    apps.forEach((app) => {
      if (app.bundleId)
        cacheApplications.set(app.bundleId, app)
    })
  }
}

// Map of build names to bundle IDs
const bundleIdMap: Record<string, string> = {
  'Code': 'com.microsoft.VSCode',
  'Code - Insiders': 'com.microsoft.VSCodeInsiders',
  'Cursor': 'com.todesktop.230313mzl4w4u92',
  'Kiro': 'dev.kiro.desktop',
  'Positron': 'com.rstudio.positron',
  'Trae': 'com.trae.app',
  'Trae CN': 'cn.trae.app',
  'VSCodium': 'com.vscodium',
  'VSCodium - Insiders': 'com.vscodium.VSCodiumInsiders',
  'Windsurf': 'com.exafunction.windsurf',
}

/**
 * Get the bundle ID for the specified editor
 * @param editor The name of the editor (e.g., "vscode", "vscodium", etc.)
 * @returns The bundle ID for the specified editor
 */
export function getBundleId(editor: string): string {
  const buildName = EDITOR_NAME_MAP[editor as EditorName] ?? editor
  return bundleIdMap[buildName] || ''
}

/**
 * Get the application for the specified editor
 * @param editor The name of the editor (e.g., "vscode", "vscodium", etc.)
 * @returns Promise resolving to the Application object or undefined if not found
 */
export async function getEditorApplication(editor: string): Promise<Application | undefined> {
  await cachedGetApplications()

  // Find the app by bundle ID
  const bundleId = getBundleId(editor)
  if (bundleId) {
    const app = cacheApplications.get(bundleId)
    if (app)
      return app
  }

  return undefined
}
