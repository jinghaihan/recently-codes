import type { EntryItem } from 'recently-codes'
import type { RemoveMethods } from '../types'
import { Action, ActionPanel, Icon } from '@raycast/api'

export function RemoveActionSection(props: { entry: EntryItem } & RemoveMethods) {
  return (
    <ActionPanel.Section>
      <Action
        icon={Icon.Trash}
        title="Remove from Recent Projects"
        style={Action.Style.Destructive}
        onAction={() => props.removeEntry(props.entry)}
        shortcut={{ modifiers: ['ctrl'], key: 'x' }}
      />

      <Action
        icon={Icon.Trash}
        title="Remove All Recent Projects"
        style={Action.Style.Destructive}
        onAction={() => props.removeAllEntries()}
        shortcut={{ modifiers: ['ctrl', 'shift'], key: 'x' }}
      />
    </ActionPanel.Section>
  )
}
