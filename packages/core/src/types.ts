import type { CODE_NAME_CHOICES, EDITOR_NAME_MAP } from './constants'

export type CodeName = (typeof CODE_NAME_CHOICES)[number]
export type EditorName = keyof typeof EDITOR_NAME_MAP

export interface SearchOptions {
  codes?: string[]
  gitBranch?: boolean
}

export interface HistoryResult {
  entries: HistoryEntry[]
}

export interface HistoryEntry {
  folderUri?: string
  fileUri?: string
}

export interface EntryLike {
  name: string
  uri: string
  path: string
  type: 'file' | 'folder'
  editors: EditorName[]
  gitBranch?: string
}
