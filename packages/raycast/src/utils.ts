import type { EntryItem } from 'recently-codes'
import type { EntryType } from './types'
import { isDeepStrictEqual } from 'node:util'

export function filterEntriesByType(filter: EntryType | null) {
  switch (filter) {
    case 'All Types':
      return (_entry: EntryItem) => true
    case 'Folders':
      return (entry: EntryItem) => entry.type === 'folder'
    case 'Files':
      return (entry: EntryItem) => entry.type === 'file'
    default:
      return (_: EntryItem) => false
  }
}

export function filterUnpinnedEntries(pinnedEntries: EntryItem[]) {
  return (entry: EntryItem) => pinnedEntries.find(pinnedEntry => isDeepStrictEqual(pinnedEntry, entry)) === undefined
}
