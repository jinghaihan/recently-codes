import type { EntryLike } from 'recently-codes'
import { fileURLToPath } from 'node:url'
import { Action, ActionPanel, Grid, open } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { useCallback } from 'react'
import { APPLICATION_NAME_MAP } from 'recently-codes'
import { stringToColor } from './color'
import { useRecentlyCodes } from './database'
import { getBundleId, getEditorApplication } from './editor'
import { Layout, LayoutItem, LayoutSection } from './layout'
import { preferences } from './preferences'

export default function Command() {
  const { recentlyCodes, loading } = useRecentlyCodes()

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
    >
      <LayoutSection title="Recent Projects">
        {recentlyCodes.map((entry: EntryLike) => (
          <EntryItem key={entry.uri} entry={entry} editorApp={editorApp} />
        ))}
      </LayoutSection>
    </Layout>
  )
}

function EntryItem(props: { entry: EntryLike, editorApp?: any }) {
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
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy Name" content={name} shortcut={{ modifiers: ['cmd'], key: '.' }} />
            <Action.CopyToClipboard
              title="Copy Path"
              content={path}
              shortcut={{ modifiers: ['cmd', 'shift'], key: '.' }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      )}
    >
    </LayoutItem>
  )
}
