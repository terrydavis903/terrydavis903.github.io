export interface StackColumn {
  heading: string; // shown as "// <heading>"
  items: string[];
  now?: boolean; // the accent-colored "now: exploring" column
}

export const stack: StackColumn[] = [
  {
    heading: 'systems',
    items: ['Rust', 'Go', 'Low-latency networking', 'QUIC / transport', 'Distributed systems'],
  },
  {
    heading: 'on-chain',
    items: ['Solana', 'Anchor', 'Real-time data infra', 'MEV / arbitrage'],
  },
  {
    heading: 'reverse engineering',
    items: ['Bytecode / VM devirt', 'Cipher recovery', 'Z3 / symbolic', 'WASM emulation'],
  },
  {
    heading: 'now: exploring',
    items: ['RF', 'Integrated photonics', 'Signal / EM theory', 'EE foundations'],
    now: true,
  },
];
