import { esc, setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// fonts tile: probe a known font list by measuring glyph metrics against the
// three generic base families — a size mismatch means the font is installed.
export function runFonts(): void {
  try {
    const base = ['monospace', 'sans-serif', 'serif'];
    const test = [
      'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Garamond',
      'Comic Sans MS', 'Trebuchet MS', 'Impact', 'Tahoma', 'Helvetica', 'Calibri',
      'Cambria', 'Consolas', 'Segoe UI', 'Roboto', 'Ubuntu', 'Menlo', 'Monaco',
      'DejaVu Sans', 'Noto Sans', 'Fira Code',
    ];
    const s = 'mmmmmmmmmmlliWWW';
    const span = document.createElement('span');
    span.style.cssText = 'position:absolute;left:-9999px;top:-9999px;font-size:72px;line-height:normal;';
    span.textContent = s;
    document.body.appendChild(span);

    const def: Record<string, { w: number; h: number }> = {};
    base.forEach((bb) => {
      span.style.fontFamily = bb;
      def[bb] = { w: span.offsetWidth, h: span.offsetHeight };
    });

    const found: string[] = [];
    test.forEach((f) => {
      let d = false;
      base.forEach((bb) => {
        span.style.fontFamily = "'" + f + "'," + bb;
        if (span.offsetWidth !== def[bb].w || span.offsetHeight !== def[bb].h) d = true;
      });
      if (d) found.push(f);
    });
    document.body.removeChild(span);

    setV('font-count', found.length + ' of ' + test.length + ' probed');
    setV('font-list', esc(found.slice(0, 6).join(', ') || '—'));
    setH('h-fonts', hash(found.join(',')));
  } catch (e) {
    setV('font-count', 'unavailable');
    setH('h-fonts', 'n/a');
  }
}
