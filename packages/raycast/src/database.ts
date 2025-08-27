import type { EntryItem } from 'recently-codes'
import { Alert, confirmAlert, Icon, showToast, Toast } from '@raycast/api'
import { useEffect, useState } from 'react'
import { getRecentlyCodes, updateRecentlyCodes } from 'recently-codes'
import { preferences } from './preferences'

export function useRecentlyCodes() {
  const [loading, setLoading] = useState(false)
  const [recentlyCodes, setRecentlyCodes] = useState<EntryItem[]>([])

  async function readRecentlyCodes() {
    setLoading(true)
    const recentlyCodes = await getRecentlyCodes({
      gitBranch: preferences.showGitBranch,
    })
    setRecentlyCodes(recentlyCodes)
    setLoading(false)
  }

  useEffect(() => {
    readRecentlyCodes()
  }, [])

  async function removeEntry(entry: EntryItem) {
    if (!recentlyCodes.length) {
      await showToast(Toast.Style.Failure, 'No recent entries found')
      return
    }

    try {
      setLoading(true)
      const entries = recentlyCodes.filter(i => i.uri !== entry.uri)
      await updateRecentlyCodes({ entries })
      setRecentlyCodes(entries)
      setLoading(false)

      showToast(Toast.Style.Success, 'Entry removed', 'Restart editors to sync the history (optional)')
    }
    catch {
      showToast(Toast.Style.Failure, 'Failed to remove entry')
    }
  }

  async function removeAllEntries() {
    try {
      if (
        await confirmAlert({
          icon: Icon.Trash,
          title: 'Remove all recent entries?',
          message: 'This cannot be undone.',
          dismissAction: {
            title: 'Cancel',
            style: Alert.ActionStyle.Cancel,
          },
          primaryAction: {
            title: 'Remove',
            style: Alert.ActionStyle.Destructive,
          },
        })
      ) {
        setLoading(true)
        await updateRecentlyCodes({ entries: [] })
        setRecentlyCodes([])
        setLoading(false)

        showToast(
          Toast.Style.Success,
          'All entries removed',
          `Restart editors to sync the history (optional)`,
        )
      }
    }
    catch {
      showToast(Toast.Style.Failure, 'Failed to remove entries')
    }
  }

  return {
    loading,
    recentlyCodes,
    removeEntry,
    removeAllEntries,
  }
}
