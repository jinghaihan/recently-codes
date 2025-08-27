import type { CodeName } from './types'
import { READ_HISTORY_SQL, UPDATE_HISTORY_SQL } from './constants'
import { execFileAsync, findDatabasePath, hasSqlite3 } from './utils'

export async function readDatabaseWithSystemSqlite3<T>(dbPath: string): Promise<T | undefined> {
  const { stdout } = await execFileAsync('sqlite3', [dbPath, READ_HISTORY_SQL])

  const result = stdout.trim()
  if (!result)
    return

  return JSON.parse(result) as T
}

export async function readDatabaseWithBetterSqlite3<T>(dbPath: string): Promise<T | undefined> {
  const Database = (await import('better-sqlite3')).default
  const db = new Database(dbPath, { readonly: true })
  try {
    const result = db.prepare(READ_HISTORY_SQL).get() as { value: string }
    if (!result)
      return

    return JSON.parse(result.value) as T
  }
  catch {
    // ignore error
  }
  finally {
    db.close()
  }
}

export async function readDatabase<T>(codeName: CodeName): Promise<T | undefined> {
  const dbPath = await findDatabasePath(codeName)
  if (!dbPath) {
    return
  }

  if (await hasSqlite3()) {
    return await readDatabaseWithSystemSqlite3<T>(dbPath)
  }
  else {
    return await readDatabaseWithBetterSqlite3<T>(dbPath)
  }
}

export async function writeDatabaseWithSystemSqlite3<T>(dbPath: string, data: T): Promise<void> {
  const jsonData = JSON.stringify(data)
  const sql = `${UPDATE_HISTORY_SQL.replace('?', `'${jsonData.replace(/'/g, '\'\'')}'`)}`
  await execFileAsync('sqlite3', [dbPath, sql])
}

export async function writeDatabaseWithBetterSqlite3<T>(dbPath: string, data: T): Promise<void> {
  const Database = (await import('better-sqlite3')).default
  const db = new Database(dbPath)
  try {
    const stmt = db.prepare(UPDATE_HISTORY_SQL)
    stmt.run(JSON.stringify(data))
  }
  catch {
    // ignore error
  }
  finally {
    db.close()
  }
}

export async function writeDatabase<T>(codeName: CodeName, data: T): Promise<void> {
  const dbPath = await findDatabasePath(codeName)
  if (!dbPath) {
    return
  }

  if (await hasSqlite3()) {
    await writeDatabaseWithSystemSqlite3<T>(dbPath, data)
  }
  else {
    await writeDatabaseWithBetterSqlite3<T>(dbPath, data)
  }
}
