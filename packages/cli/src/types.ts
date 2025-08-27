import type { SearchOptions } from 'recently-codes'
import type { MODE_CHOICES } from './constants'

export type { EntryItem } from 'recently-codes'

export type RangeMode = (typeof MODE_CHOICES)[number]

export interface CommandOptions extends SearchOptions {
  mode?: RangeMode
  /**
   * The entries to operation, it's a JSON string
   */
  entries?: string
}
