import type { EntryLike } from 'recently-codes'
import type { PinMethods } from './types'
import { Action, ActionPanel, Icon, showToast } from '@raycast/api'

export function PinActionSection(props: { entry: EntryLike, pinned?: boolean } & PinMethods) {
  const movements = props.getAllowedMovements(props.entry)

  return !props.pinned
    ? (
        <ActionPanel.Section>
          <Action
            title="Pin Entry"
            icon={Icon.Pin}
            shortcut={{ modifiers: ['cmd', 'shift'], key: 'p' }}
            onAction={async () => {
              props.pin(props.entry)
              await showToast({ title: 'Pinned entry' })
            }}
          />
        </ActionPanel.Section>
      )
    : (
        <ActionPanel.Section>
          <Action
            title="Unpin Entry"
            shortcut={{ modifiers: ['cmd', 'shift'], key: 'p' }}
            icon={Icon.PinDisabled}
            onAction={async () => {
              props.unpin(props.entry)
              await showToast({ title: 'Unpinned entry' })
            }}
          />
          {movements.includes('left') && (
            <Action
              title="Move Left in Pinned Entries"
              shortcut={{ modifiers: ['cmd', 'opt'], key: 'arrowLeft' }}
              icon={Icon.ArrowLeft}
              onAction={async () => {
                props.moveUp(props.entry)
                await showToast({ title: 'Moved pinned entry left' })
              }}
            />
          )}
          {movements.includes('up') && (
            <Action
              title="Move up in Pinned Entries"
              shortcut={{ modifiers: ['cmd', 'opt'], key: 'arrowUp' }}
              icon={Icon.ArrowUp}
              onAction={async () => {
                props.moveUp(props.entry)
                await showToast({ title: 'Moved pinned entry up' })
              }}
            />
          )}
          {movements.includes('right') && (
            <Action
              title="Move Right in Pinned Entries"
              shortcut={{ modifiers: ['cmd', 'opt'], key: 'arrowRight' }}
              icon={Icon.ArrowRight}
              onAction={async () => {
                props.moveDown(props.entry)
                await showToast({ title: 'Moved pinned entry right' })
              }}
            />
          )}
          {movements.includes('down') && (
            <Action
              title="Move Down in Pinned Entries"
              shortcut={{ modifiers: ['cmd', 'opt'], key: 'arrowDown' }}
              icon={Icon.ArrowDown}
              onAction={async () => {
                props.moveDown(props.entry)
                await showToast({ title: 'Moved pinned entry down' })
              }}
            />
          )}
          <Action
            title="Unpin All Entries"
            icon={Icon.PinDisabled}
            shortcut={{ modifiers: ['ctrl', 'shift'], key: 'x' }}
            style={Action.Style.Destructive}
            onAction={async () => {
              props.unpinAll()
              await showToast({ title: 'Unpinned all entries' })
            }}
          />
        </ActionPanel.Section>
      )
}
