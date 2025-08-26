export const READ_HISTORY_SQL = 'SELECT value FROM ItemTable WHERE key = \'history.recentlyOpenedPathsList\''

export const UPDATE_HISTORY_SQL = (data: string) => `INSERT INTO ItemTable (key, value) VALUES ('history.recentlyOpenedPathsList', '${data}');`

export const CODE_NAME_CHOICES = [
  'Code',
  'Code - Insiders',
  'VSCodium',
  'VSCodium - Insiders',
  'Cursor',
  'Windsurf',
] as const

export const EDITOR_NAME_MAP = {
  'vscode': 'Code',
  'vscode-insiders': 'Code - Insiders',
  'vscodium': 'VSCodium',
  'vscodium-insiders': 'VSCodium - Insiders',
  'cursor': 'Cursor',
  'windsurf': 'Windsurf',
} as const

export const CODE_NAME_MAP = Object.fromEntries(Object.entries(EDITOR_NAME_MAP).map(([key, value]) => [value, key]))

export const APPLICATION_NAME_MAP = {
  'vscode': 'Visual Studio Code',
  'vscode-insiders': 'Visual Studio Code - Insiders',
  'vscodium': 'VSCodium',
  'vscodium-insiders': 'VSCodium - Insiders',
  'cursor': 'Cursor',
  'windsurf': 'Windsurf',
} as const
