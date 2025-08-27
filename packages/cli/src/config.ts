import type { CommandOptions, RangeMode } from './types'
import { MODE_CHOICES } from './constants'

export function resolveConfig(mode: RangeMode = 'search', options: CommandOptions) {
  if (mode) {
    if (!MODE_CHOICES.includes(mode)) {
      options.mode = 'search'
    }
    options.mode = mode
  }
  else {
    options.mode = 'search'
  }

  if (options.editors && !Array.isArray(options.editors)) {
    options.editors = [options.editors]
  }
}
