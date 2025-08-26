# Crosside Recently Codes

A VSCode extension for sharing recent project history between VSCode and its forks like Cursor and Windsurf.

## Why Crosside Recently Codes?

As developers, many of us now work with multiple code editors simultaneously. You might use both VSCode and Cursor for different tasks, and it's frustrating that your recent project history isn't shared between them. Each editor maintains its own isolated history, making it difficult to quickly switch between projects across different IDEs.

Crosside Recently Codes solves this problem by providing a unified way to access and manage recent project history across multiple VSCode-based editors, enabling seamless project switching regardless of which editor you're currently using.

## Supported Editors

Currently supports the following VSCode-based editors:

- **VSCode** (Visual Studio Code)
- **VSCode Insiders**
- **VSCodium**
- **VSCodium Insiders**
- **Cursor**
- **Windsurf**

## Installation

### Requirements

Before installing the extension, ensure you have the following prerequisites:

- **Node.js** (version 18 or higher)
- **pnpm** package manager

1. Ensure Node.js and pnpm are installed on your system
2. Open VS Code or any VS Code-based editor
3. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
4. Search for "Crosside Recently Codes"
5. Click Install

## Usage

### Commands

The extension provides two main commands accessible via Command Palette (`Ctrl/Cmd + Shift + P`):

#### Install Dependencies
```
Recently Codes: Install Dependencies
```
Recommended for first-time use to ensure runtime dependencies are installed. This command installs the necessary CLI tools that the extension uses to read editor databases.

#### List Recently Codes
```
Recently Codes: List Recently Codes
```
Opens a quick pick menu showing recent projects from all configured editors. Select a project to open it in the current editor.

### Features

- **Cross-IDE History**: Access recent projects from VSCode, Cursor, Windsurf, and other supported editors
- **Intelligent Deduplication**: Automatically removes duplicate projects across different editors
- **File Existence Check**: Only shows projects that still exist on your system
- **Git Branch Information**: Displays the current Git branch for each project (when available)
- **Configurable Editor Support**: Choose which editors to scan for recent projects
- **Flexible Opening Options**: Open projects in current window or new window

## Configuration

The extension can be configured through VS Code settings:

### `crosside-recently-codes.editors`
- **Type**: Array of strings
- **Default**: `["vscode", "cursor", "windsurf"]`
- **Description**: List of editors to scan for recent projects

**Available options:**
- `vscode` - Visual Studio Code
- `vscode-insiders` - Visual Studio Code Insiders
- `vscodium` - VSCodium
- `vscodium-insiders` - VSCodium Insiders
- `cursor` - Cursor
- `windsurf` - Windsurf

**Example:**
```json
{
  "crosside-recently-codes.editors": ["vscode", "cursor", "windsurf"]
}
```

### `crosside-recently-codes.openInNewWindow`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Whether to open selected projects in a new window

**Example:**
```json
{
  "crosside-recently-codes.openInNewWindow": true
}
```

## How It Works

Each VSCode-based editor stores its recent file history in SQLite databases. This extension:

1. **Reads Editor Databases**: Accesses the SQLite databases where each editor stores recent project information
2. **Processes Data**: Deduplicates entries, checks file existence, and enriches data with Git branch information
3. **Unified Display**: Presents all recent projects in a single, organized list regardless of source editor
4. **Seamless Opening**: Opens selected projects in your current editor

### Technical Architecture

The extension uses a CLI tool (`recently-codes-cli`) to bypass Electron's Node.js version conflicts. This approach ensures compatibility across different editor versions and provides a clean separation between the UI and data processing logic.

## License

[MIT](./LICENSE.md) License © [jinghaihan](https://github.com/jinghaihan)
