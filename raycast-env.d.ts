/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Hex CLI Path - Path to the hex binary */
  "hexPath": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-history` command */
  export type SearchHistory = ExtensionPreferences & {
  /** Max Entries - How many recent history entries to load */
  "limit": string
}
  /** Preferences accessible in the `paste-last` command */
  export type PasteLast = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-history` command */
  export type SearchHistory = {}
  /** Arguments passed to the `paste-last` command */
  export type PasteLast = {}
}

