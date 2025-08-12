/**
 * Copies the provided text to the user's clipboard.
 * @param text - The string content to copy to the clipboard.
 * @returns A promise that resolves to `true` if the copy operation succeeded, or `false` if it failed.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
