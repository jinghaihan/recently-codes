import type { CodeName, EntryLike, HistoryResult, SearchOptions } from './types'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { CODE_NAME_MAP } from './constants'
import { readDatabase } from './database'
import { getGitBranch } from './git'
import { getEntryEditors, handleRecentEntries, normalizeCodes } from './utils'

export * from './constants'
export * from './types'
export * from './utils'

export async function getRecentlyCodesForIDE(codeName: CodeName): Promise<EntryLike[]> {
  const result = await readDatabase<HistoryResult>(codeName)
  if (!result)
    return []
  return handleRecentEntries(result)
}

export async function getRecentlyCodes(options: SearchOptions): Promise<EntryLike[]> {
  const { codes, gitBranch = false } = options

  const resolved = normalizeCodes(codes)

  const opened: Record<string, EntryLike[]> = {}
  await Promise.all(resolved.map(async (code) => {
    const appName = CODE_NAME_MAP[code]
    opened[appName] = await getRecentlyCodesForIDE(code)
  }))

  const result = await Promise.all(
    Object.values(opened)
      .flat()
      .filter((item, index, self) => {
        const isUnique = index === self.findIndex(t => t.uri === item.uri)
        const isExists = existsSync(fileURLToPath(item.uri))
        return isUnique && isExists
      })
      .map(async (entry) => {
        const editors = getEntryEditors(entry, opened)
        let branch
        if (gitBranch) {
          branch = await getGitBranch(entry.uri)
        }
        return { ...entry, editors, gitBranch: branch }
      }),
  )

  return result
}
