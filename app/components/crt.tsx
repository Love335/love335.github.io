'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useWire } from './wire-context';

// ─── Project terminal lines ───────────────────────────────────────────────────
// Keys must match the `label` strings in navItems exactly.
const PROJECTS: Record<string, string[]> = {
  'About Me': [
    'LOADING PROFILE...',
    '',
    'USER: portfolio_owner',
    'STATUS: available for work',
    '',
    '→ designer, developer, builder',
    '→ obsessed with interaction',
    '→ making things feel alive',
    '',
    'INTERESTS: UI/UX, mobile, systems',
    'LOCATION: [REDACTED]',
    '',
  ],
  Beatnik: [
    'LOADING BEATNIK.APP...',
    '',
    'A music app that grooves',
    'with your rhythm.',
    '',
    'STACK: Swift, SwiftUI',
    'PLATFORM: iOS',
    'STATUS: in development',
    '',
    '→ built-in beat sequencer',
    '→ session recording',
    '→ share your sessions',
    '',
  ],
  BreakEven: [
    'LOADING BREAKEVEN.APP...',
    '',
    'Financial clarity at a glance.',
    'Track your runway.',
    '',
    'STACK: React Native',
    'PLATFORM: iOS + Android',
    'STATUS: shipped',
    '',
    '→ expense tracking',
    '→ breakeven calculator',
    '→ cashflow projections',
    '',
  ],
  Bonsai: [
    'LOADING BONSAI.APP...',
    '',
    'A tamagotchi-style plant',
    'keeping companion.',
    '',
    'STACK: Jetpack Compose',
    'PLATFORM: Android',
    'STATUS: shipped',
    '',
    '→ plant health tracking',
    '→ watering reminders',
    '→ bonsai grows with care',
    '→ defect diagnosis',
    '',
  ],
  'Local Hero': [
    'LOADING LOCALHERO.APP...',
    '',
    'Discover the world around you.',
    'Support what is local.',
    '',
    'STACK: Flutter',
    'PLATFORM: iOS + Android',
    'STATUS: in development',
    '',
    '→ local business discovery',
    '→ community reviews',
    '→ neighbourhood feed',
    '',
  ],
  uConsole: [
    'LOADING UCONSOLE...',
    '',
    'A pocket-sized computing',
    'experience. Truly portable.',
    '',
    'PLATFORM: hardware mod',
    'STATUS: ongoing build',
    '',
    '→ custom Linux environment',
    '→ handheld form factor',
    '→ built from scratch',
    '→ because why not',
    '',
  ],
};

const IDLE_LINES = [
  'PORTFOLIO-1 v2.4 ready.',
  '',
  'No signal detected.',
  '',
  '→ connect wire to port',
  '  above to load output.',
  '',
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 { x: number; y: number }

// ─── Bezier wire path ─────────────────────────────────────────────────────────
function makeWirePath(sx: number, sy: number, tx: number, ty: number): string {
  const dist = Math.hypot(tx - sx, ty - sy);
  const sag  = Math.min(dist * 0.3, 80);
  return `M ${sx} ${sy} C ${sx} ${sy + sag}, ${tx} ${ty + sag * 0.35}, ${tx} ${ty}`;
}

// Extra padding (px) added around each navbar slot's bounding box for hit-testing.
// Makes it much easier to land the wire in a slot without pixel-perfect aim.
const HIT_PADDING = 28;

// ─── Component ────────────────────────────────────────────────────────────────
export default function CrtHero() {
  const {
    pluggedLabel,
    setPluggedLabel,
    setHoveredLabel,
    getJackCenter,
    getAllJacks,
    registerPlugPointerDown,
  } = useWire();

  const portRef    = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const pluggedSnap = useRef<Vec2 | null>(null);

  const [wireVisible, setWireVisible] = useState(false);
  const [wireD,       setWireD]       = useState('');

  const [displayText, setDisplayText] = useState('');
  const printTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Port center ──────────────────────────────────────────────────────────
  const getPortCenter = useCallback((): Vec2 => {
    const r = portRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, []);

  // ── Draw wire ────────────────────────────────────────────────────────────
  const drawTo = useCallback((tx: number, ty: number) => {
    const { x: sx, y: sy } = getPortCenter();
    setWireD(makeWirePath(sx, sy, tx, ty));
  }, [getPortCenter]);

  // ── Hit-test with padding ────────────────────────────────────────────────
  const getSlotAt = useCallback((x: number, y: number): string | null => {
    for (const [label, el] of getAllJacks()) {
      const parent = el.closest('a') ?? el;
      const r = parent.getBoundingClientRect();
      if (
        x >= r.left   - HIT_PADDING &&
        x <= r.right  + HIT_PADDING &&
        y >= r.top    - HIT_PADDING &&
        y <= r.bottom + HIT_PADDING
      ) {
        return label;
      }
    }
    return null;
  }, [getAllJacks]);

  // ── Terminal printer ─────────────────────────────────────────────────────
  const printLines = useCallback((lines: string[]) => {
    if (printTimer.current) clearTimeout(printTimer.current);
    setDisplayText('');

    let li = 0, ci = 0, built = '';

    function step() {
      if (li >= lines.length) return;
      const line = lines[li];
      if (ci < line.length) {
        built += line[ci++];
        setDisplayText(built);
        const delay = line[ci - 1] === '.' ? 75 : 15 + Math.random() * 12;
        printTimer.current = setTimeout(step, delay);
      } else {
        built += '\n';
        li++; ci = 0;
        setDisplayText(built);
        printTimer.current = setTimeout(step, line === '' ? 30 : 75);
      }
    }
    step();
  }, []);

  // ── Plug ─────────────────────────────────────────────────────────────────
  const plugInto = useCallback((label: string) => {
    const snap = getJackCenter(label);
    if (!snap) return;
    pluggedSnap.current = snap;
    setPluggedLabel(label);
    setWireVisible(true);
    drawTo(snap.x, snap.y);
    printLines(PROJECTS[label] ?? IDLE_LINES);
  }, [getJackCenter, setPluggedLabel, drawTo, printLines]);

  // ── Unplug ───────────────────────────────────────────────────────────────
  const doUnplug = useCallback(() => {
    pluggedSnap.current = null;
    setPluggedLabel(null);
    setWireVisible(false);
    setWireD('');
    printLines(IDLE_LINES);
  }, [setPluggedLabel, printLines]);

  // ── Core drag logic (shared between port drag and socket drag) ───────────
  const beginDrag = useCallback((e: PointerEvent, targetEl: HTMLElement) => {
    isDragging.current = true;
    // Use the element the event actually started on for pointer capture.
    // This keeps pointermove firing even if the cursor leaves that element.
    targetEl.setPointerCapture(e.pointerId);

    // Detach from any current plug, start wire from port center
    if (pluggedSnap.current) {
      pluggedSnap.current = null;
      setPluggedLabel(null);
      printLines(IDLE_LINES);
    }
    setWireVisible(true);
    drawTo(e.clientX, e.clientY);
  }, [setPluggedLabel, drawTo, printLines]);

  // ── Pointer down on the monitor port ─────────────────────────────────────
  const onPortPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    beginDrag(e.nativeEvent, e.currentTarget);
  }, [beginDrag]);

  // ── Pointer down on a navbar socket (pull-to-unplug) ─────────────────────
  // Registered into context so NavbarJack can call it.
  const onSocketPointerDown = useCallback((e: PointerEvent) => {
    // The event target is the NavbarJack div — use it for pointer capture.
    const target = e.target as HTMLElement;
    beginDrag(e, target);
  }, [beginDrag]);

  // Register the socket handler into context on mount.
  useEffect(() => {
    registerPlugPointerDown(onSocketPointerDown);
    return () => registerPlugPointerDown(null);
  }, [registerPlugPointerDown, onSocketPointerDown]);

  // ── Global pointer move / up ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      drawTo(e.clientX, e.clientY);
      setHoveredLabel(getSlotAt(e.clientX, e.clientY));
    };

    const onUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setHoveredLabel(null);

      const hit = getSlotAt(e.clientX, e.clientY);
      if (hit) plugInto(hit);
      else doUnplug();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   onUp);
    };
  }, [drawTo, getSlotAt, setHoveredLabel, plugInto, doUnplug]);

  // Boot idle text
  useEffect(() => {
    printLines(IDLE_LINES);
    return () => { if (printTimer.current) clearTimeout(printTimer.current); };
  }, [printLines]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .crt-hero {
          min-height: calc(100vh - 56px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #8f5e32;
          overflow: hidden;
        }

        /* ── Monitor shell ── */
        .crt-monitor {
          position: relative;
          width: 580px;
          background: linear-gradient(155deg, #cac4b6 0%, #b4ae9f 45%, #9e9890 100%);
          border-radius: 10px 10px 8px 8px;
          padding: 28px 28px 32px 28px;
          border: 2px solid #8a8480;
          box-shadow:
            inset 0 2px 4px rgba(255,255,255,0.25),
            inset 0 -2px 6px rgba(0,0,0,0.35),
            4px 4px 0 #79746f,
            7px 7px 0 #646060,
            10px 10px 0 #4e4b48;
          user-select: none;
        }

        /* Chunky back-box protrusion */
        .crt-monitor::before {
          content: '';
          position: absolute;
          top: 18px;
          right: -22px;
          width: 22px;
          height: 54%;
          background: #b2aca4;
          border-radius: 0 6px 6px 0;
          border: 2px solid #8a8480;
          border-left: none;
          box-shadow: 4px 4px 0 #636060, 7px 7px 0 #4e4b48;
        }

        /* ── Screen bezel ── */
        .crt-bezel {
          background: #181818;
          border-radius: 5px 5px 3px 3px;
          padding: 10px;
          border: 4px solid #0e0e0e;
          box-shadow:
            inset 0 0 24px rgba(0,0,0,0.9),
            0 0 0 1px #404040;
        }

        /* ── CRT screen ── */
        .crt-screen {
          width: 496px;
          height: 340px;
          background: #060500;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        /* Scanlines overlay */
        .crt-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.18) 2px,
            rgba(0,0,0,0.18) 4px
          );
          pointer-events: none;
          z-index: 5;
        }

        /* Vignette */
        .crt-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 50% 50%,
            transparent 40%,
            rgba(0,0,0,0.6) 100%
          );
          pointer-events: none;
          z-index: 6;
        }

        /* ── Terminal ── */
        .crt-terminal {
          position: absolute;
          inset: 0;
          padding: 16px 20px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          line-height: 1.6;
          color: #c8860a;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: hidden;
          z-index: 3;
        }

        .crt-terminal-text {
          text-shadow: 0 0 8px rgba(200, 134, 10, 0.55);
        }

        .crt-cursor {
          display: inline-block;
          width: 9px;
          height: 15px;
          background: #c8860a;
          box-shadow: 0 0 6px rgba(200, 134, 10, 0.8);
          vertical-align: text-bottom;
          margin-left: 1px;
          animation: crt-blink 1.1s step-end infinite;
        }
        @keyframes crt-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Chin bar ── */
        .crt-chin {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px 0;
        }

        .crt-power-led {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #484440;
          border: 1px solid #333;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
          transition: background 0.4s, box-shadow 0.4s;
        }
        .crt-power-led.on {
          background: #c8860a;
          box-shadow: 0 0 9px rgba(200, 134, 10, 0.9),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .crt-brand {
          font-family: 'Courier New', Courier, monospace;
          font-size: 9px;
          color: #6a6460;
          letter-spacing: 3px;
          font-weight: 700;
        }

        .crt-vents {
          display: flex;
          gap: 3px;
          align-items: center;
        }
        .crt-vent {
          width: 1.5px;
          height: 12px;
          background: #888;
          border-radius: 1px;
        }

        /* ── Port — top right of monitor body ── */
        .crt-port {
          position: absolute;
          top: 20px;
          right: -14px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #252525;
          border: 3px solid #505050;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          z-index: 40;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.7),
                      inset 0 1px 0 rgba(255,255,255,0.08);
          animation: port-blink 800ms infinite alternate ease-in-out;
        }
        .crt-port:hover {
          border-color: #c8860a;
          box-shadow: 0 0 28px rgba(200, 134, 10, 0.95),
                      0 0 42px rgba(200, 134, 10, 0.6);
        }
        .crt-port.plugged {
          animation: none;
          border-color: #c8860a;
          box-shadow: 0 0 18px rgba(200, 134, 10, 0.7),
                      0 2px 8px rgba(0,0,0,0.7);
        }
        .crt-port:active { cursor: grabbing; }

        .crt-port-inner {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #0e0e0e;
          border: 2px solid #3a3a3a;
        }

        /* ── Wire SVG overlay ── */
        .crt-wire-svg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }
        @keyframes port-blink {
          from {
            box-shadow: 0 0 12px rgba(200, 134, 10, 0.4),
                        0 2px 8px rgba(0,0,0,0.7);
          }
          to {
            box-shadow: 0 0 28px rgba(200, 134, 10, 0.95),
                        0 0 42px rgba(200, 134, 10, 0.6),
                        0 2px 8px rgba(0,0,0,0.7);
          }
        }
      `}</style>

      {/* Wire SVG — fixed so it draws over the navbar */}
      <svg className="crt-wire-svg" xmlns="http://www.w3.org/2000/svg">
        {wireVisible && wireD && (
          <>
            {/* Shadow beneath cable for depth */}
            <path
              d={wireD}
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="7"
              strokeLinecap="round"
              opacity={0.45}
            />
            {/* Main cable body */}
            <path
              d={wireD}
              fill="none"
              stroke="#2c2c2c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Top highlight stripe — gives it a cylindrical feel */}
            <path
              d={wireD}
              fill="none"
              stroke="#585858"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>

      {/* Hero */}
      <div className="crt-hero">
        <div className="crt-monitor">

          {/* Draggable port — top right */}
          <div
            className={`crt-port ${pluggedLabel ? 'plugged' : ''}`}
            ref={portRef}
            onPointerDown={onPortPointerDown}
            title="drag to connect"
          >
            <div className="crt-port-inner" />
          </div>

          {/* Screen */}
          <div className="crt-bezel">
            <div className="crt-screen">
              <div className="crt-terminal">
                <span className="crt-terminal-text">{displayText}</span>
                <span className="crt-cursor" />
              </div>
            </div>
          </div>

          {/* Chin */}
          <div className="crt-chin">
            <div className={`crt-power-led${pluggedLabel ? ' on' : ''}`} />
            <div className="crt-brand">PORTFOLIO-1</div>
            <div className="crt-vents">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="crt-vent" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}