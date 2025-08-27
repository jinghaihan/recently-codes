import type { CodeName, EntryItem, HistoryEntry, HistoryResult, SearchOptions, UpdateOptions } from './types'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { CODE_NAME_MAP, EDITOR_NAME_MAP } from './constants'
import { readDatabase, writeDatabase } from './database'
import { getGitBranch } from './git'
import { getEntryEditors, handleRecentEntries, normalizeCodes } from './utils'

export * from './constants'
export * from './database'
export * from './git'
export * from './types'
export * from './utils'

export async function getRecentlyCodesForIDE(codeName: CodeName): Promise<EntryItem[]> {
  const result = await readDatabase<HistoryResult>(codeName)
  if (!result)
    return []
  return handleRecentEntries(result)
}

export async function getRecentlyCodes(options: SearchOptions): Promise<EntryItem[]> {
  const { editors, gitBranch = false } = options

  const codes = normalizeCodes(editors)
  const opened: Record<string, EntryItem[]> = {}
  await Promise.all(codes.map(async (code) => {
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

export async function updateRecentlyCodes(options: UpdateOptions): Promise<void> {
  const { editors, entries } = options

  const codes = normalizeCodes(editors)
  if (!entries.length) {
    await Promise.all(codes.map(async (code) => {
      await writeDatabase<HistoryResult>(code, { entries: [] })
    }))
    return
  }

  const updated: Partial<Record<CodeName, HistoryEntry[]>> = {}
  entries.forEach((item) => {
    item.editors.forEach((editor) => {
      const code = EDITOR_NAME_MAP[editor]
      if (!codes.includes(code)) {
        return
      }
      if (!updated[code]) {
        updated[code] = []
      }
      updated[code].push({
        fileUri: item.type === 'file' ? item.uri : undefined,
        folderUri: item.type === 'folder' ? item.uri : undefined,
      })
    })
  })

  await Promise.all(codes.map(async (code) => {
    if (updated[code]) {
      await writeDatabase<HistoryResult>(code, { entries: updated[code] })
    }
  }))
}
