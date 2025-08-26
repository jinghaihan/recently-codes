import type { EntryLike } from 'recently-codes'
import { useEffect, useState } from 'react'
import { getRecentlyCodes } from 'recently-codes'

export function useRecentlyCodes() {
  const [loading, setLoading] = useState(false)
  const [recentlyCodes, setRecentlyCodes] = useState<EntryLike[]>([])

  async function readRecentlyCodes() {
    setLoading(true)
    const recentlyCodes = await getRecentlyCodes()
    setRecentlyCodes(recentlyCodes)
    setLoading(false)
  }

  useEffect(() => {
    readRecentlyCodes()
  }, [])

  return {
    loading,
    recentlyCodes,
  }
}
