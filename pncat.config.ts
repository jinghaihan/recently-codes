import { defineConfig, mergeCatalogRules } from 'pncat'

export default defineConfig({
  ignorePaths: ['packages/vscode'],
  exclude: ['@types/vscode'],
  catalogRules: mergeCatalogRules([
    {
      name: 'cli',
      match: ['@vscode/vsce', 'ovsx', 'vsxpub'],
    },
    {
      name: 'utils',
      match: ['tildify', 'lru-cache'],
    },
    {
      name: 'vscode',
      match: [/vscode/],
      priority: 50,
    },
    {
      name: 'raycast',
      match: [/raycast/],
      priority: 50,
    },
  ]),
})
