import type { EntryLike } from 'recently-codes'
import type { EntryType } from './types'
import { isDeepStrictEqual } from 'node:util'

export function filterEntriesByType(filter: EntryType | null) {
  switch (filter) {
    case 'All Types':
      return (_entry: EntryLike) => true
    case 'Folders':
      return (entry: EntryLike) => entry.type === 'folder'
    case 'Files':
      return (entry: EntryLike) => entry.type === 'file'
    default:
      return (_: EntryLike) => false
  }
}

export function filterUnpinnedEntries(pinnedEntries: EntryLike[]) {
  return (entry: EntryLike) => pinnedEntries.find(pinnedEntry => isDeepStrictEqual(pinnedEntry, entry)) === undefined
}
