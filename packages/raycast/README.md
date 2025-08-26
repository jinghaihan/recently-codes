# Crosside Recently Codes - Raycast Extension

A Raycast extension for macOS users to quickly access recent projects from VSCode and its forks like Cursor and Windsurf.

## What it does

This Raycast extension provides a unified interface to access recent project history from multiple VSCode-based editors, enabling seamless project switching regardless of which editor you're currently using.

## Supported Editors

- **VSCode** (Visual Studio Code)
- **VSCode Insiders**
- **VSCodium**
- **VSCodium Insiders**
- **Cursor**
- **Windsurf**

## Installation

To publish to Raycast's official store, extensions must be uploaded to the `raycast/extensions` repository. However, this repository contains tons of extensions with all PRs and issues mixed together, and more importantly, I can't even clone the repository due to its size. Therefore, I don't plan to publish to their store.

For now, you can install it as a developer extension:

1. Clone the [recently-codes repository](https://github.com/jinghaihan/recently-codes)
2. Navigate to `packages/raycast`
3. Run `pnpm install && pnpm build`
4. Import the extension in Raycast's developer mode

## Usage

1. Launch Raycast (`Cmd + Space` or your configured hotkey)
2. Type "List Crosside Recently Codes"
3. Browse and select projects from any supported editor
4. Press `Enter` to open the project in your preferred editor

## Configuration

The extension provides several customization options:

### Editor Selection
- **VSCode**: Visual Studio Code
- **VSCode Insiders**: VSCode Insiders build
- **VSCodium**: Open-source VSCodium
- **VSCodium Insiders**: VSCodium Insiders build
- **Cursor**: Cursor AI-powered editor
- **Windsurf**: Windsurf editor

### View Options
- **List View**: Traditional list layout
- **Grid View**: Grid layout for visual browsing

### Advanced Settings
- **Keep Section Order**: Maintain the order of sections while searching folders, files, etc.
- **Show Git Branch**: Display the current Git branch for files and folders in Git repositories (default: `true`)

## Features

- **Cross-editor compatibility**: Access projects opened in any supported editor
- **Git integration**: See current branch information for Git repositories
- **Fast search**: Quickly filter through your recent projects
- **Keyboard navigation**: Full keyboard support for rapid project switching
- **Multiple view modes**: Choose between list and grid layouts

## Inspiration

This extension was inspired by the excellent [Visual Studio Code extension](https://www.raycast.com/thomas/visual-studio-code) by Thomas Paul Mann.

## License

[MIT](../../LICENSE.md) License © [jinghaihan](https://github.com/jinghaihan)
