import type { Application } from '@raycast/api'
import type { EntryLike } from 'recently-codes'
import type { PinMethods } from './types'
import { fileURLToPath } from 'node:url'
import { Action, ActionPanel, Grid, Icon, open, openExtensionPreferences, showToast, Toast } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { useCallback, useState } from 'react'
import { APPLICATION_NAME_MAP } from 'recently-codes'
import { stringToColor } from './color'
import { useRecentlyCodes } from './database'
import { getBundleId, getEditorApplication } from './editor'
import { Layout, LayoutDropdown, LayoutDropdownItem, LayoutDropdownSection, LayoutItem, LayoutSection } from './layout'
import { usePinnedEntries } from './pinned'
import { PinActionSection } from './pinned-action-section'
import { preferences } from './preferences'
import { EntryType } from './types'
import { filterEntriesByType, filterUnpinnedEntries } from './utils'

export default function Command() {
  const { recentlyCodes, loading } = useRecentlyCodes()
  const [type, setType] = useState<EntryType | null>(null)
  const { pinnedEntries, ...pinnedMethods } = usePinnedEntries()

  const fetchEditorApp = useCallback(async () => {
    return getEditorApplication(preferences.editor)
  }, [])

  const { data: editorApp } = usePromise(fetchEditorApp)

  return (
    <Layout
      columns={6}
      inset={Grid.Inset.Medium}
      searchBarPlaceholder="Search recent projects..."
      isLoading={loading}
      filtering={{ keepSectionOrder: preferences.keepSectionOrder }}
      searchBarAccessory={<EntryTypeDropdown onChange={setType} />}
    >
      <LayoutSection title="Pinned Projects">
        {pinnedEntries.filter(filterEntriesByType(type)).map((entry: EntryLike) => (
          <EntryItem key={entry.uri} entry={entry} pinned={true} {...pinnedMethods} />
        ))}
      </LayoutSection>
      <LayoutSection title="Recent Projects">
        {recentlyCodes
          .filter(filterUnpinnedEntries(pinnedEntries))
          .filter(filterEntriesByType(type))
          .map((entry: EntryLike) => (
            <EntryItem key={entry.uri} entry={entry} editorApp={editorApp} {...pinnedMethods} />
          ))}
      </LayoutSection>
    </Layout>
  )
}

function EntryItem(props: { entry: EntryLike, editorApp?: Application, pinned?: boolean } & PinMethods) {
  const title = `Open in ${APPLICATION_NAME_MAP[preferences.editor] ?? preferences.editor}`
  const name = props.entry.name
  const filePath = fileURLToPath(props.entry.uri)
  const path = props.entry.path
  const gitBranch = props.entry.gitBranch
  const branchColor = gitBranch ? stringToColor(gitBranch) : ''
  const keywords = path.split('/')
  const bundleIdentifier = getBundleId(preferences.editor)
  // const detail = `Recently opened in: ${props.entry.editors.join(', ')}`

  const accessories = []
  if (gitBranch) {
    accessories.push({
      tag: {
        value: gitBranch,
        color: branchColor,
      },
      tooltip: `Git Branch: ${gitBranch}`,
    })
  }

  const subTitle = preferences.layout === 'grid' ? `${gitBranch} • ${path}` : path

  return (
    <LayoutItem
      id={path}
      title={name}
      subtitle={subTitle}
      icon={{ fileIcon: path }}
      content={{ fileIcon: path }}
      keywords={keywords}
      accessories={accessories}
      actions={(
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title={title}
              icon={props.editorApp ? { fileIcon: props.editorApp.path } : 'action-icon.png'}
              onAction={() => open(props.entry.uri, bundleIdentifier)}
            />
            <Action.ShowInFinder path={filePath} />
            <Action.OpenWith path={filePath} shortcut={{ modifiers: ['cmd'], key: 'o' }} />
            {props.entry.type === 'folder' && preferences.terminalApp && (
              <Action
                title={`Open with ${preferences.terminalApp.name}`}
                icon={{ fileIcon: preferences.terminalApp.path }}
                shortcut={{ modifiers: ['cmd', 'shift'], key: 'o' }}
                onAction={() =>
                  open(path, preferences.terminalApp).catch(() =>
                    showToast(Toast.Style.Failure, `Failed to open with ${preferences.terminalApp?.name}`),
                  )}
              />
            )}
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy Name" content={name} shortcut={{ modifiers: ['cmd'], key: '.' }} />
            <Action.CopyToClipboard
              title="Copy Path"
              content={path}
              shortcut={{ modifiers: ['cmd', 'shift'], key: '.' }}
            />
          </ActionPanel.Section>
          <Action
            title="Open Preferences"
            icon={Icon.Gear}
            onAction={openExtensionPreferences}
          />
          <PinActionSection {...props} />
        </ActionPanel>
      )}
    >
    </LayoutItem>
  )
}

function EntryTypeDropdown(props: { onChange: (type: EntryType) => void }) {
  return (
    <LayoutDropdown
      tooltip="Filter project types"
      defaultValue={EntryType.AllTypes}
      storeValue
      onChange={value => props.onChange(value as EntryType)}
    >
      <LayoutDropdownItem title="All Types" value="All Types" />
      <LayoutDropdownSection>
        {Object.values(EntryType)
          .filter(key => key !== 'All Types')
          .sort()
          .map(key => (
            <LayoutDropdownItem key={key} title={key} value={key} />
          ))}
      </LayoutDropdownSection>
    </LayoutDropdown>
  )
}
