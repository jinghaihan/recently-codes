# Recently Codes CLI

A command-line tool to list recent projects from VSCode and its forks like Cursor and Windsurf.

## What it does

`recently-codes-cli` provides a command-line interface for accessing recent project history from multiple VSCode-based editors.

## Purpose

The CLI tool serves a dual purpose:

### 1. Electron Limitation Bypass
VSCode and its forks run on Electron, which can have Node.js version conflicts when extensions try to access native modules (like `better-sqlite3`). The CLI tool bypasses this by:
- Running as a separate process outside the Electron environment
- Returning results via stdout to avoid version compatibility issues
- Providing a stable interface for VSCode extensions

### 2. Extensibility & Integration
The CLI can be used as a building block for:
- Other software plugins or integrations
- Custom scripts and automation
- Third-party tools that need access to recent project data
- Integration with other development workflows

## Installation

```bash
pnpm add recently-codes-cli
```

## Basic Usage

```bash
# List from specific editors
recently-codes --editors cursor --editors vscode --git-branch
```

## Core Features

- **Multi-editor support**: Access history from VSCode, Cursor, Windsurf, and other VSCode-compatible editors
- **Git integration**: Optional Git branch information (use `--git-branch` flag)
- **Cross-platform**: Works on Windows, macOS, and Linux
- **JSON output**: Machine-readable output for integration with other tools
- **Process isolation**: Runs independently from editor environments

## License

[MIT](../../LICENSE.md) License © [jinghaihan](https://github.com/jinghaihan)
