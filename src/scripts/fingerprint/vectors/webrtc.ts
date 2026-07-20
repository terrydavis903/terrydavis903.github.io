import { esc, setV } from '../util/dom';

// webrtc row (async): open a peer connection with no ICE servers and inspect
// host candidates for a local-IP leak. mDNS-masked addresses are the safe
// modern default; a raw private IP is flagged as a leak. Times out at 1.8s.
export function runWebRTC(): void {
  let done = false;
  const fin = (v: string, leak?: boolean) => {
    if (done) return;
    done = true;
    setV('rtc', leak ? '<span class="leak">' + v + '</span>' : '<span class="ok">' + esc(v) + '</span>');
  };

  try {
    const RTC = window.RTCPeerConnection || (window as any).webkitRTCPeerConnection;
    if (!RTC) {
      fin('unavailable');
      return;
    }
    const pc: RTCPeerConnection = new RTC({ iceServers: [] });
    pc.createDataChannel('x');
    pc.onicecandidate = (e) => {
      if (!e || !e.candidate) return;
      const p = e.candidate.candidate.split(' ');
      const addr = p[4];
      const typ = p[7];
      if (typ !== 'host') return;
      if (/\.local$/i.test(addr)) {
        fin('mDNS-masked (no leak)');
        try { pc.close(); } catch (_) {}
      } else {
        fin(addr + ' exposed', true);
        try { pc.close(); } catch (_) {}
      }
    };
    pc.createOffer()
      .then((o) => pc.setLocalDescription(o))
      .catch(() => { fin('blocked'); });
    setTimeout(() => {
      fin('masked / blocked');
      try { pc.close(); } catch (_) {}
    }, 1800);
  } catch (e) {
    fin('unavailable');
  }
}
