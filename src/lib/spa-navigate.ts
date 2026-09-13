/** Soft-navigate in this Vite SPA (same pattern as App.tsx + popstate sync). */
export function spaNavigate(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}

/** True when the browser should keep its default (new tab, download, etc.). */
export function shouldIgnoreSpaClick(
  event: Pick<MouseEvent, 'button' | 'metaKey' | 'ctrlKey' | 'shiftKey' | 'altKey' | 'defaultPrevented'>
): boolean {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}
