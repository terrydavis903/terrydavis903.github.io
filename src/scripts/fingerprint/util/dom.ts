// Tiny DOM helpers shared by every fingerprint vector. Each vector fills its
// tile by stable id, so these are the only touchpoints with the markup.

export const $ = (id: string): HTMLElement | null => document.getElementById(id);

export function esc(s: unknown): string {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m] as string)
  );
}

// Set a tile-header hash value and clear its pending "wait" styling.
export function setH(id: string, v: string): void {
  const el = $(id);
  if (!el) return;
  el.textContent = v;
  el.classList.remove('wait');
}

// Set a row value as HTML. Pass keepWait=true to leave the pending style on.
export function setV(id: string, html: string, keepWait?: boolean): void {
  const el = $(id);
  if (!el) return;
  el.innerHTML = html;
  if (!keepWait) el.classList.remove('wait');
}
