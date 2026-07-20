// All site copy and link data, kept out of the markup.
// Rich fragments (lede, about, now) are stored as HTML strings and rendered
// with `set:html` so the output matches the original character-for-character.

export const handle = 'terrydavis903';

export const meta = {
  title: 'Omar Hu — systems & reverse engineering',
  description:
    'Omar Hu — systems and reverse-engineering engineer. Low-latency Rust, on-chain infrastructure, anti-bot VM reversing — now moving into RF and photonics.',
  ogTitle: 'Omar Hu',
  ogDescription:
    'I read the layer underneath — low-latency Rust, on-chain infra, anti-bot VM reversing. Now moving into RF & photonics.',
};

export const navLinks = [
  { label: './fingerprint', href: '#capture' },
  { label: 'work', href: '#work' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'systems · reverse engineering',
  name: 'Omar Hu',
  education: 'MS ECE @ Georgia Tech · BS CS @ NYIT',
  lede:
    'I read the <span class="accent">layer underneath</span> — <b>low-latency Rust</b>, on-chain data infrastructure, and <b>anti-bot VM reverse engineering</b>. Now chasing the same signal into <b>light</b>.',
  cta: [
    { label: 'Fingerprint my browser ↓', href: '#capture', variant: 'solid' as const, external: false },
    { label: 'GitHub ↗', href: 'https://github.com/terrydavis903', variant: 'ghost' as const, external: true },
  ],
};

// Section headers: `$ ./<cmd>` label + h2.
export const sections = {
  capture: { cmd: './fingerprint --target=you', title: 'Your browser, hashed.' },
  about: { cmd: 'cat ./about.md', title: 'Same instinct, new medium.' },
  work: { cmd: 'ls ./work', title: "Things I've built." },
  stack: { cmd: './stack --list', title: 'What I work in.' },
  now: { cmd: './now', title: 'Currently.' },
};

export const about =
  'My background is cybersecurity and low-level reverse engineering — <b>WASM VMs, custom cryptographic implementations, protocol analysis</b>. I\'ve built real-time on-chain data infrastructure in Rust and reverse-engineered production anti-bot systems down to their bytecode and ciphers. The common thread is reading what\'s beneath the abstraction. I\'m now moving that instinct into <span class="accent">RF and photonics</span>, building on an EE/photonics foundation.';

export const now =
  'Deliberately moving from software into <b>RF and photonics</b> — waveguides, resonators, and the physics of signals. Same habit of reading the layer underneath, pointed at a new medium. Open to conversations at that intersection.';

// The IP/geo lines are the only external network call the site makes.
export const fingerprintFoot =
  '<b>everything here is computed in your browser and sent nowhere</b> — except the <b>ip / location / asn</b> lines, which require one external lookup (your connection reveals that regardless; that\'s the point). this is a small subset of the signals that commercial anti-bot VMs — Shape, Kasada, Akamai — actually collect. reversing those is my day job.';

export const social = [
  { label: 'GitHub', href: 'https://github.com/terrydavis903', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/omar-hu-43b513174/', external: true },
  { label: 'Email', href: 'mailto:you@example.com', external: false },
];

export const footerMeta = 'built at the byte level · ';
