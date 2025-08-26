import type { CodeName, EditorName, EntryLike, HistoryResult } from './types'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir, platform } from 'node:os'
import { basename, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import tildify from 'tildify'
import { CODE_NAME_CHOICES, EDITOR_NAME_MAP } from './constants'

export const execFileAsync = promisify(execFile)

export function getDatabasePaths(codeName: string, path: string): string[] {
  switch (platform()) {
    case 'win32':
      return [
        `${process.env.APPDATA}/${codeName}/User/${path}`,
        `${process.env.USERPROFILE}/AppData/Roaming/${codeName}/User/${path}`,
      ]
    case 'darwin':
      return [
        `${process.env.HOME}/Library/Application Support/${codeName}/User/${path}`,
        `${homedir()}/Library/Application Support/${codeName}/User/${path}`,
      ]
    default:
      return [
        `${process.env.HOME}/.config/${codeName}/User/${path}`,
        `${process.env.XDG_CONFIG_HOME || `${homedir()}/.config`}/${codeName}/User/${path}`,
        `${homedir()}/.config/${codeName}/User/${path}`,
      ]
  }
}

export async function findDatabasePath(codeName: string): Promise<string | undefined> {
  const path = join('globalStorage', 'state.vscdb')
  const possiblePaths = getDatabasePaths(codeName, path)

  for (const path of possiblePaths) {
    try {
      if (existsSync(path)) {
        return path
      }
    }
    catch {
      continue
    }
  }
  return undefined
}

export function normalizeCodes(codes?: string[]): CodeName[] {
  const resolved = codes?.map(code => EDITOR_NAME_MAP[code as EditorName] ?? code) ?? []
  const filtered = resolved.filter(code => CODE_NAME_CHOICES.includes(code as CodeName)) as CodeName[]
  if (!filtered || !filtered.length) {
    return [...CODE_NAME_CHOICES]
  }
  return filtered
}

export function parseHistoryEntry(list: string[], type: 'folder' | 'file'): EntryLike[] {
  return list.map((i) => {
    const path = fileURLToPath(i)
    const pathName = new URL(i).pathname
    const name = decodeURIComponent(basename(pathName))
    return {
      name,
      uri: i,
      path: tildify(path),
      type,
      editors: [],
    }
  })
}

export function getEntryEditors(entry: EntryLike, entriesMap: Record<EditorName, EntryLike[]>): EditorName[] {
  const editors = Object.entries(entriesMap)
    .filter(([_, entries]) => entries.find(i => i.uri === entry.uri))
    .map(([editor, _]) => editor)

  return editors as EditorName[]
}

export function handleRecentEntries(result: HistoryResult) {
  return result.entries
    .map((entry) => {
      if (entry.fileUri)
        return parseHistoryEntry([entry.fileUri], 'file')
      if (entry.folderUri)
        return parseHistoryEntry([entry.folderUri], 'folder')
      return false
    })
    .filter(Boolean)
    .flat() as EntryLike[]
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
