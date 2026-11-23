# Hex History for Raycast

Search and paste your Hex dictation history from Raycast.

## Requirements

- macOS with Hex installed. The extension reads history through Hex's own `hex` CLI, so nothing is read from the app's files directly.
- [Raycast](https://www.raycast.com) and Node.js.

## Commands

- **Search Hex History**: browse recent entries, filter with the search bar, and paste or copy one.
- **Paste Last Dictation**: runs `hex paste-last` to paste your most recent dictation. Hex must be running.

## Preferences

- **Hex CLI Path** (default `/Applications/Hex.app/Contents/MacOS/hex`)
- **Max Entries** (default 200, clamped to 1-1000)

## Development

```
npm install
npm run dev
```

## Privacy

Everything stays on your machine. The extension makes no network requests. Copying uses Raycast's concealed clipboard flag so entries stay out of clipboard history; Paste does not support that flag, so pasted text may appear in Raycast's clipboard history.

## Credits

The icon is Hex's app icon, used under the MIT license in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) (Copyright (c) 2026 Christopher Langton). This project is not affiliated with Hex.

## License

MIT
