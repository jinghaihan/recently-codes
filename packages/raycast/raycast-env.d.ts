/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Editor - Open which build of Visual Studio Code to open when select a project. */
  "editor": "vscode" | "vscode-insiders" | "vscodium" | "vscodium-insiders" | "cursor" | "windsurf",
  /** View Layout - Select the layout of the view */
  "layout": "list" | "grid",
  /** Advanced - Keep the order of the sections while searching folders, files, etc. */
  "keepSectionOrder": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
}

