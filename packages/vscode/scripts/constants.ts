import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = join(fileURLToPath(import.meta.url), '../../')
export const PACKAGE_JSON_PATH = join(__dirname, 'package.json')
export const CLI_PACKAGE_JSON_PATH = join(__dirname, '../cli/package.json')
