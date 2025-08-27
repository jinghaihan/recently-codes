import type { EntryItem } from 'recently-codes'
import type { PinnedMovement } from './types'
import { isDeepStrictEqual } from 'node:util'
import { useCachedState } from '@raycast/utils'
import { preferences } from './preferences'

const GRID_COLUMNS = 6

function getAllowedMovements(entries: EntryItem[], entry: EntryItem): PinnedMovement[] {
  const movements = new Array<PinnedMovement>()

  if (preferences.layout === 'grid') {
    const index = entries.findIndex((e: EntryItem) => isDeepStrictEqual(e, entry))

    if (index >= GRID_COLUMNS && index % GRID_COLUMNS === 0) {
      movements.push('up')
    }

    if (index < Math.floor(entries.length / GRID_COLUMNS) * GRID_COLUMNS && (index + 1) % GRID_COLUMNS === 0) {
      movements.push('down')
    }

    if (index !== entries.length - 1) {
      movements.push('right')
    }

    if (index !== 0) {
      movements.push('left')
    }
  }
  else {
    const index = entries.findIndex((e: EntryItem) => isDeepStrictEqual(e, entry))

    if (index !== entries.length - 1) {
      movements.push('down')
    }

    if (index !== 0) {
      movements.push('up')
    }
  }

  return movements
}

export function usePinnedEntries() {
  const [entries, setEntries] = useCachedState<EntryItem[]>('pinned', [])
  return {
    pinnedEntries: entries,
    pin: (entry: EntryItem) =>
      setEntries(previousEntries => [entry, ...previousEntries.filter(e => !isDeepStrictEqual(e, entry))]),
    unpin: (entry: EntryItem) =>
      setEntries(previousEntries => previousEntries.filter(e => !isDeepStrictEqual(e, entry))),
    unpinAll: () => setEntries([]),
    moveUp: (entry: EntryItem) =>
      setEntries((previousEntries) => {
        const i = previousEntries.findIndex(e => isDeepStrictEqual(e, entry))
        previousEntries.splice(i - 1, 2, previousEntries[i], previousEntries[i - 1])
        return previousEntries
      }),
    moveDown: (entry: EntryItem) =>
      setEntries((previousEntries) => {
        const i = previousEntries.findIndex(e => isDeepStrictEqual(e, entry))
        previousEntries.splice(i, 2, previousEntries[i + 1], previousEntries[i])
        return previousEntries
      }),
    getAllowedMovements: (entry: EntryItem) => getAllowedMovements(entries, entry),
  }
}
