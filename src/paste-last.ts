import { closeMainWindow, getPreferenceValues, showHUD } from "@raycast/api";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

export default async function Command() {
  const { hexPath } = getPreferenceValues<{ hexPath?: string }>();
  // Close first so Hex pastes into the app that had focus, not Raycast.
  await closeMainWindow();
  try {
    await run(hexPath || "/Applications/Hex.app/Contents/MacOS/hex", ["paste-last"]);
  } catch (e) {
    // Exit code 3 means Hex isn't running.
    const code = (e as { code?: number }).code;
    await showHUD(code === 3 ? "Hex isn't running" : "Couldn't paste last dictation");
  }
}
