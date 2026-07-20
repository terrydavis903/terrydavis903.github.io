import { esc, setV, setH } from '../util/dom';
import { hash } from '../util/hash';

// network tile: the locally-reported connection info, plus the site's ONLY
// external call — a single ipwho.is lookup for ip / location / asn, isolated
// here with a 4s abort timeout and a graceful failure path.
export function runNetwork(): void {
  const nav = navigator as any;
  const con = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (con) {
    const cp: string[] = [];
    if (con.effectiveType) cp.push(con.effectiveType);
    if (typeof con.downlink === 'number') cp.push('~' + con.downlink + 'Mbps');
    if (typeof con.rtt === 'number') cp.push('rtt ' + con.rtt + 'ms');
    setV('conn', esc(cp.join(' · ') || 'reported'));
  } else {
    setV('conn', 'not exposed');
  }

  const ctrl = 'AbortController' in window ? new AbortController() : null;
  const to = setTimeout(() => {
    if (ctrl) ctrl.abort();
  }, 4000);

  fetch('https://ipwho.is/', ctrl ? { signal: ctrl.signal } : {})
    .then((r) => r.json())
    .then((j: any) => {
      clearTimeout(to);
      if (!j || j.success === false) throw 0;
      setV('ip', '<span class="ok">' + esc(j.ip || '—') + '</span>');
      const flag = j.flag && j.flag.emoji ? j.flag.emoji + ' ' : '';
      setV('loc', esc(flag) + esc([j.city, j.region, j.country].filter(Boolean).join(', ') || '—'));
      const c = j.connection || {};
      setV('asn', esc([c.asn ? 'AS' + c.asn : '', c.isp || c.org || ''].filter(Boolean).join(' · ') || '—'));
      setH('h-net', hash([j.ip, (j.connection || {}).asn].join('~')));
    })
    .catch(() => {
      clearTimeout(to);
      setV('ip', 'lookup unavailable');
      setV('loc', '—');
      setV('asn', '—');
      setH('h-net', 'n/a');
    });
}
