# Recently Codes Core

The core library for reading recent project history from VSCode and its forks.

## What it does

`recently-codes` is the foundational package that provides the core functionality for:

- **Reading editor databases**: Connects to SQLite databases used by VSCode-based editors to store recent file/project history
- **Multi-editor support**: Supports VSCode, VSCode Insiders, VSCodium, VSCodium Insiders, Cursor, and Windsurf
- **Data processing**: Deduplicates entries, validates file existence, and enriches data with additional information
- **Git integration**: Optionally fetches current Git branch information for projects
- **Cross-platform compatibility**: Works on Windows, macOS, and Linux

## Architecture

The core package handles the low-level operations of:

1. Locating editor-specific database files on different operating systems
2. Executing SQL queries to extract recent file/folder history
3. Processing and cleaning the raw data
4. Enriching entries with Git branch information when enabled
5. Returning structured data for consumption by other packages

## Usage in the ecosystem

This package is designed to be consumed by:

- `recently-codes-cli`: Command-line interface
- `crosside-recently-codes`: VSCode extension
- `raycast-crosside-recently-codes`: Raycast extension
- Any other tools that need access to editor history data

## License

[MIT](../../LICENSE.md) License © [jinghaihan](https://github.com/jinghaihan)
