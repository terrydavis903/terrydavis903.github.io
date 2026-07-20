import { esc, setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// intl / time tile: timezone / locale / a live ticking clock.
export function runIntl(): void {
  let tz = 'unknown';
  let ro: Record<string, any> = {};
  try {
    ro = Intl.DateTimeFormat().resolvedOptions();
    tz = ro.timeZone || 'unknown';
  } catch (e) {}

  setV('tz', esc(tz));
  setV('locale', esc((ro.locale || navigator.language || '—') + ' · ' + (ro.calendar || '') + ' · ' + (ro.numberingSystem || '')));

  const clk = () => setV('clk', new Date().toLocaleTimeString([], { hour12: false }));
  clk();
  setInterval(clk, 1000);

  setH('h-intl', hash([tz, ro.locale, ro.calendar, ro.numberingSystem, new Date().getTimezoneOffset()].join('~')));
}
