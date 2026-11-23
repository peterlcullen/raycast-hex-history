import { Action, ActionPanel, Clipboard, Detail, getPreferenceValues, Icon, List } from "@raycast/api";
import { useExec } from "@raycast/utils";

interface Preferences {
  hexPath?: string;
  limit?: string;
}

interface Entry {
  id: number;
  timestamp_ms: number;
  application: string;
  final_text: string;
}

interface HistoryReply {
  entries: Entry[];
}

const DEFAULT_HEX = "/Applications/Hex.app/Contents/MacOS/hex";

function clampLimit(raw?: string) {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), 1000) : 200;
}

// Dictated text is untrusted for markdown purposes: block image/link syntax so the detail pane never fetches a URL.
function escapeMarkdown(text: string) {
  return text.replace(/([\\`*_{}[\]()#+!<>|~])/g, "\\$1");
}

export default function Command() {
  const { hexPath, limit } = getPreferenceValues<Preferences>();
  const { data, isLoading, error, revalidate } = useExec(
    hexPath || DEFAULT_HEX,
    ["history", "--json", "--limit", String(clampLimit(limit))],
    {
      // The CLI can log XPC noise to stderr; only stdout is JSON.
      parseOutput: ({ stdout }) => (JSON.parse(stdout) as HistoryReply).entries,
      keepPreviousData: true,
    },
  );

  if (error && !data) {
    return (
      <Detail markdown="# Could not read Hex history\n\nCheck that Hex is installed and that the Hex CLI Path preference points at its `hex` binary." />
    );
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Hex history…" isShowingDetail>
      {(data ?? []).map((e) => (
        <List.Item
          key={e.id}
          title={e.final_text.replace(/\s+/g, " ").trim()}
          accessories={[{ text: e.application }, { date: new Date(e.timestamp_ms) }]}
          detail={<List.Item.Detail markdown={escapeMarkdown(e.final_text)} />}
          actions={
            <ActionPanel>
              <Action.Paste content={e.final_text} />
              <Action.CopyToClipboard content={e.final_text} concealed shortcut={{ modifiers: ["cmd"], key: "c" }} />
              <Action
                title="Reload"
                icon={Icon.ArrowClockwise}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
                onAction={revalidate}
              />
              <Action
                title="Paste Without Formatting"
                icon={Icon.Text}
                onAction={() => Clipboard.paste(e.final_text.trim())}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
