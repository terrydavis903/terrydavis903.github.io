// Fingerprint dashboard entry point. Runs after the DOM is parsed (loaded as a
// module script, which defers by default), reveals the tiles, then runs every
// vector — each fills its own tile by stable id, so the vectors stay decoupled
// from the markup.
import { $ } from './util/dom';
import { runNavigator } from './vectors/navigator';
import { runScreen } from './vectors/screen';
import { runIntl } from './vectors/intl';
import { runWebGL } from './vectors/webgl';
import { runFonts } from './vectors/fonts';
import { runAudio } from './vectors/audio';
import { runWebRTC } from './vectors/webrtc';
import { runNetwork } from './vectors/network';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// staggered tile reveal — instant under reduced-motion
const tiles = document.querySelectorAll('.tile');
if (reduce) {
  tiles.forEach((t) => t.classList.add('is-in'));
} else {
  tiles.forEach((t, i) => setTimeout(() => t.classList.add('is-in'), 90 + i * 80));
}

runNavigator();
runScreen();
runIntl();
runWebGL();
runFonts();
runAudio();
runWebRTC();
runNetwork();

const st = $('st');
if (st) st.textContent = 'read from your browser';
const yr = $('yr');
if (yr) yr.textContent = String(new Date().getFullYear());

// devtools easter egg — the whole page is about reading your own browser
try {
  console.log('%c// you opened devtools.', 'color:#8E7BFF;font:600 14px monospace');
  console.log(
    '%cof course you did — that\'s the whole theme.\nthe fingerprint above was computed right here, in what you just opened.\n\n→ github.com/terrydavis903',
    'color:#8B95A9;font:13px monospace'
  );
} catch (e) {}
