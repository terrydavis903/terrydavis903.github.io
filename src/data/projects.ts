export interface Project {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
}

export const projects: Project[] = [
  {
    title: 'Orbit',
    kind: 'solana protocol · open source',
    description:
      'A decentralized marketplace protocol on Solana for trading physical and digital goods on-chain — a full Anchor/Rust program suite: markets, accounts, commission, escrowed settlement with dispute resolution, and an on-chain product search index. Full test suites and migrations across every program.',
    tags: ['Rust', 'Anchor', 'Solana', 'smart contracts'],
    link: { label: 'github.com/OrbitEng ↗', href: 'https://github.com/OrbitEng' },
  },
  {
    title: 'On-chain data infra',
    kind: 'rust · private',
    description:
      "Real-time on-chain financial-data infrastructure for a Solana MEV / arbitrage system: live mempool ingestion over Geyser gRPC, AMM swap decoding and construction, and a latency-first execution path — down to forking the validator's QUIC transaction layer and tunneling it over SOCKS5 at the byte level.",
    tags: ['Rust', 'QUIC', 'gRPC', 'networking', 'Solana'],
  },
  {
    title: 'revero',
    kind: 'go · private',
    description:
      'An anti-bot VM reverse-engineering toolkit: decodes and decrypts a JavaScript-VM anti-bot payload, disassembles delivered bytecode into a typed instruction stream, and lifts it to IR for decompilation. Static custom-cipher recovery, Z3-driven opaque-predicate elimination, and a forked WASM interpreter for out-of-browser emulation.',
    tags: ['Go', 'reverse engineering', 'bytecode', 'Z3', 'WASM'],
  },
  {
    title: 'Transport & VM internals',
    kind: 'systems · research',
    description:
      'Lower-level threads across the above: a hand-configured QUIC (quinn) client with custom TLS client-auth and 0-RTT, QUIC-over-SOCKS5 datagram tunneling (RFC 1928/1929), and devirtualization pipelines shared across sibling anti-bot systems — disasm → CFG → IR → decompile.',
    tags: ['QUIC / quinn', 'SOCKS5', 'devirtualization', 'TLS'],
  },
];
