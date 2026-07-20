import { esc, setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// webgl tile: unmasked vendor / renderer, hashed together with version,
// limits and the sorted extension list.
export function runWebGL(): void {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl') || c.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      setV('gl-vendor', 'no webgl');
      setV('gl-renderer', '—');
      setH('h-webgl', 'n/a');
      return;
    }
    const dbg = gl.getExtension('WEBGL_debug_renderer_info') as any;
    const vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
    const rend = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    setV('gl-vendor', esc(vendor || 'masked'));
    setV('gl-renderer', esc(rend || 'masked'));

    const p = [
      vendor,
      rend,
      gl.getParameter(gl.VERSION),
      gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      gl.getParameter(gl.MAX_TEXTURE_SIZE),
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
    ];
    const exts = (gl.getSupportedExtensions() || []).slice().sort().join(',');
    setH('h-webgl', hash(p.join('~') + '|' + exts));
  } catch (e) {
    setV('gl-vendor', 'unavailable');
    setH('h-webgl', 'n/a');
  }
}
