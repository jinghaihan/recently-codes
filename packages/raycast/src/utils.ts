import type { EntryLike } from 'recently-codes'
import type { EntryType } from './types'

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
