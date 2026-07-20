import { esc, setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// navigator tile: browser / os / langs / hardware, prefers the modern
// userAgentData client hints and falls back to UA-string parsing.
export function runNavigator(): void {
  const nav = navigator as any;
  const ua = navigator.userAgent || '';
  const uaData = nav.userAgentData;
  let browser = 'unknown';
  let os = 'unknown';

  if (uaData && uaData.brands) {
    const b = uaData.brands
      .filter((x: any) => !/Not.?A.?Brand/i.test(x.brand))
      .map((x: any) => x.brand + ' ' + x.version);
    browser = b.join(', ') || 'chromium';
    os = uaData.platform || navigator.platform || 'unknown';
  } else {
    let m: RegExpExecArray | null;
    if ((m = /Firefox\/([\d.]+)/.exec(ua))) browser = 'Firefox ' + m[1];
    else if ((m = /Edg\/([\d.]+)/.exec(ua))) browser = 'Edge ' + m[1];
    else if ((m = /Chrome\/([\d.]+)/.exec(ua))) browser = 'Chrome ' + m[1];
    else if ((m = /Version\/([\d.]+).*Safari/.exec(ua))) browser = 'Safari ' + m[1];

    if ((m = /Windows NT ([\d.]+)/.exec(ua))) os = 'Windows ' + m[1];
    else if ((m = /Mac OS X ([\d_]+)/.exec(ua))) os = 'macOS ' + m[1].replace(/_/g, '.');
    else if ((m = /Android ([\d.]+)/.exec(ua))) os = 'Android ' + m[1];
    else if ((m = /(iPhone|iPad).*OS ([\d_]+)/.exec(ua))) os = 'iOS ' + m[2].replace(/_/g, '.');
    else if (/Linux/.test(ua)) os = 'Linux';
  }

  const langs = (navigator.languages || [navigator.language]).join(', ');
  const hw: string[] = [];
  if (navigator.hardwareConcurrency) hw.push(navigator.hardwareConcurrency + ' cores');
  if (nav.deviceMemory) hw.push('~' + nav.deviceMemory + 'GB');
  hw.push(navigator.maxTouchPoints > 0 ? 'touch' : 'no-touch');

  setV('ua', esc(browser));
  setV('os', esc(os));
  setV('lang', esc(langs));
  setV('hw', esc(hw.join(' · ')));

  setH(
    'h-nav',
    hash(
      [
        ua,
        navigator.platform,
        langs,
        navigator.hardwareConcurrency,
        nav.deviceMemory,
        nav.vendor,
        navigator.maxTouchPoints,
        navigator.cookieEnabled,
      ].join('~')
    )
  );
}
