import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../')

export const PACKAGE_JSON_PATH = join(PACKAGE_ROOT, 'package.json')

export const CLI_PATH = join(PACKAGE_ROOT, 'node_modules/recently-codes-cli/bin/recently-codes.mjs')

export const RUNTIME_DEPS = ['better-sqlite3', 'recently-codes-cli'] as const
