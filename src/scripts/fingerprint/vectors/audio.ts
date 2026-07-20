import { setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// audio tile (async): render a triangle wave through a compressor offline and
// hash the summed magnitude of a slice — a stable per-stack audio signature.
export function runAudio(): void {
  try {
    const C = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
    if (!C) {
      setV('audio-note', 'unavailable');
      setH('h-audio', 'n/a');
      return;
    }
    const ctx: OfflineAudioContext = new C(1, 44100, 44100);
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = 10000;
    const comp = ctx.createDynamicsCompressor();
    try {
      comp.threshold.value = -50;
      comp.knee.value = 40;
      comp.ratio.value = 12;
      comp.attack.value = 0;
      comp.release.value = 0.25;
    } catch (e) {}
    osc.connect(comp);
    comp.connect(ctx.destination);
    osc.start(0);
    ctx.startRendering();
    ctx.oncomplete = (ev) => {
      const buf = ev.renderedBuffer.getChannelData(0);
      let sum = 0;
      for (let i = 4500; i < 5500; i++) {
        sum += Math.abs(buf[i]);
      }
      setH('h-audio', hash(sum.toString()));
      setV('audio-note', 'sum ' + sum.toFixed(3));
    };
  } catch (e) {
    setV('audio-note', 'unavailable');
    setH('h-audio', 'n/a');
  }
}
