import { setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// screen tile: resolution / viewport / color. The viewport line updates live
// on resize.
export function runScreen(): void {
  const dpr = Math.round((window.devicePixelRatio || 1) * 100) / 100;
  setV(
    'scr',
    screen.width + '×' + screen.height + ' · avail ' + screen.availWidth + '×' + screen.availHeight + ' · DPR ' + dpr
  );

  const vp = () => setV('vp', window.innerWidth + '×' + window.innerHeight + ' px');
  vp();
  addEventListener('resize', vp);

  const gamut =
    ['rec2020', 'p3', 'srgb'].filter((g) => {
      try {
        return matchMedia('(color-gamut:' + g + ')').matches;
      } catch (e) {
        return false;
      }
    })[0] || 'srgb';
  const scheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setV('gamut', (screen.colorDepth || 24) + '-bit · ' + gamut + ' · ' + scheme);

  setH(
    'h-screen',
    hash([screen.width, screen.height, screen.availWidth, screen.availHeight, dpr, screen.colorDepth, gamut].join('~'))
  );
}
