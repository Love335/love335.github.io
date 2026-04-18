'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWire } from './wire-context';

const PROJECT_HREFS: Record<string, string> = {
  'About Me':    '/about',
  Beatnik:       '/beatnik',
  BreakEven:     '/breakeven',
  Bonsai:        '/bonsai',
  'Local Hero':  '/localhero',
  uConsole:      '/uconsole',
};

const PROJECTS: Record<string, string[]> = {
  'About Me': [
    'LOADING PROFILE...',
    '',
    'USER: love_sk%C3%83%C2%B6n',
    'STATUS: available for work',
    '',
    '→ systems developer, full-stack developer',
    '→ gets things done',
    '→ sets a high bar',
    '',
    'INTERESTS: systems, code, UI/UX, IT, twin peaks',
    'LOCATION: malm%C3%83%C2%B6',
    '',
  ],
  Beatnik: [
    'LOADING BEATNIK.APP...',
    '',
    'A music app for the common',
    'folk, easy and accessible.',
    '',
    'STACK: Java, JavaFX, CSS',
    'PLATFORM: Windows, Mac, Linux',
    'STATUS: finished',
    '',
    '→ OS interaction',
    '→ uses semaphores',
    '→ scalable GUI',
    '',
  ],
  BreakEven: [
    'LOADING BREAKEVEN.APP...',
    '',
    'A blackjack game.',
    'Make your money back.',
    '',
    'STACK: Python, JavaScript, HTML, CSS',
    'PLATFORM: Browser',
    'STATUS: sort of finished',
    '',
    '→ API interaction',
    '→ JSON interpretation',
    '→ certifiably entertaining',
    '',
  ],
  Bonsai: [
    'LOADING BONSAI.APP...',
    '',
    'A tamagotchi-style plant',
    'keeping app.',
    '',
    'STACK: Kotlin, Jetpack Compose',
    'PLATFORM: Android',
    'STATUS: finished',
    '',
    '→ emulator technology',
    '→ SQL database',
    '→ large CI/CD pipeline',
    '',
  ],
  'Local Hero': [
    'LOADING LOCALHERO.APP...',
    '',
    'Discover your neighborhood.',
    'Support sustainability.',
    '',
    'STACK: TypeScript, React',
    'PLATFORM: Browser',
    'STATUS: in development',
    '',
    '→ who can say...',
    '→ it is not',
    '→ finished yet',
    '',
  ],
  uConsole: [
    'LOADING UCONSOLE...',
    '',
    'A pocket-sized computer.',
    'Portable and powerful.',
    '',
    'PLATFORM: hardware mod',
    'STATUS: waiting on components :(',
    '',
    '→ custom Linux environment',
    '→ computer assembly',
    '→ modified for RTL-SDR, GPS, ETC',
    '→ supports monitor mode',
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
  '→ or click icons for more',
  '  info.',
];

interface Vec2 { x: number; y: number }

function makeWirePath(sx: number, sy: number, tx: number, ty: number): string {
  const dist = Math.hypot(tx - sx, ty - sy);
  const sag  = Math.min(dist * 0.3, 80);
  return `M ${sx} ${sy} C ${sx} ${sy + sag}, ${tx} ${ty + sag * 0.35}, ${tx} ${ty}`;
}

const HIT_PADDING = 28;

export default function CrtHero() {
  const router = useRouter();

  const {
    pluggedLabel,
    setPluggedLabel,
    setHoveredLabel,
    getJackCenter,
    getAllJacks,
    registerPlugPointerDown,
  } = useWire();

  const portRef     = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const pluggedSnap = useRef<Vec2 | null>(null);

  const [wireVisible, setWireVisible] = useState(false);
  const [wireD,       setWireD]       = useState('');

  const [displayText, setDisplayText] = useState('');
  const [promptText,  setPromptText]  = useState('');

  const awaitingYes = useRef(false);
  const activeLabel = useRef<string | null>(null);
  const printTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getPortCenter = useCallback((): Vec2 => {
    const r = portRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, []);

  const drawTo = useCallback((tx: number, ty: number) => {
    const { x: sx, y: sy } = getPortCenter();
    setWireD(makeWirePath(sx, sy, tx, ty));
  }, [getPortCenter]);

  const getSlotAt = useCallback((x: number, y: number): string | null => {
    for (const [label, el] of getAllJacks()) {
      const parent = el.closest('a') ?? el;
      const r = parent.getBoundingClientRect();
      if (
        x >= r.left   - HIT_PADDING &&
        x <= r.right  + HIT_PADDING &&
        y >= r.top    - HIT_PADDING &&
        y <= r.bottom + HIT_PADDING
      ) return label;
    }
    return null;
  }, [getAllJacks]);

  const printLines = useCallback((lines: string[], label: string | null = null) => {
    if (printTimer.current) clearTimeout(printTimer.current);
    setDisplayText('');
    setPromptText('');
    awaitingYes.current = false;

    let li = 0, ci = 0, built = '';

    function printPrompt(lbl: string) {
      const prompt = `Open ${lbl}? [y]`;
      let pi = 0;
      let pbuilt = '';

      function promptStep() {
        if (pi < prompt.length) {
          pbuilt += prompt[pi++];
          setPromptText(pbuilt);
          printTimer.current = setTimeout(promptStep, 22 + Math.random() * 10);
        } else {
          awaitingYes.current = true;
        }
      }

      printTimer.current = setTimeout(promptStep, 300);
    }

    function step() {
      if (li >= lines.length) {
        if (label) printPrompt(label);
        return;
      }
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

  const plugInto = useCallback((label: string) => {
    const snap = getJackCenter(label);
    if (!snap) return;
    pluggedSnap.current = snap;
    activeLabel.current = label;
    setPluggedLabel(label);
    setWireVisible(true);
    drawTo(snap.x, snap.y);
    printLines(PROJECTS[label] ?? IDLE_LINES, label);
  }, [getJackCenter, setPluggedLabel, drawTo, printLines]);

  const doUnplug = useCallback(() => {
    pluggedSnap.current = null;
    activeLabel.current = null;
    awaitingYes.current = false;
    setPluggedLabel(null);
    setWireVisible(false);
    setWireD('');
    setPromptText('');
    printLines(IDLE_LINES);
  }, [setPluggedLabel, printLines]);

  const beginDrag = useCallback((e: PointerEvent, targetEl: HTMLElement) => {
    isDragging.current = true;
    targetEl.setPointerCapture(e.pointerId);

    if (pluggedSnap.current) {
      pluggedSnap.current = null;
      activeLabel.current = null;
      awaitingYes.current = false;
      setPluggedLabel(null);
      setPromptText('');
      printLines(IDLE_LINES);
    }

    setWireVisible(true);
    drawTo(e.clientX, e.clientY);
  }, [setPluggedLabel, drawTo, printLines]);

  const onPortPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    beginDrag(e.nativeEvent, e.currentTarget);
  }, [beginDrag]);

  const onSocketPointerDown = useCallback((e: PointerEvent) => {
    beginDrag(e, e.target as HTMLElement);
  }, [beginDrag]);

  useEffect(() => {
    registerPlugPointerDown(onSocketPointerDown);
    return () => registerPlugPointerDown(null);
  }, [registerPlugPointerDown, onSocketPointerDown]);

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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!awaitingYes.current) return;
      if (e.key !== 'y' && e.key !== 'Y') return;
      const label = activeLabel.current;
      if (!label) return;
      const href = PROJECT_HREFS[label];
      if (!href) return;
      router.push(href);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  useEffect(() => {
    pluggedSnap.current = null;
    activeLabel.current = null;
    awaitingYes.current = false;
    isDragging.current  = false;
    setPluggedLabel(null);
    setHoveredLabel(null);
    setWireVisible(false);
    setWireD('');
    setDisplayText('');
    setPromptText('');
  }, []);

  useEffect(() => {
    printLines(IDLE_LINES);
    return () => { if (printTimer.current) clearTimeout(printTimer.current); };
  }, [printLines]);

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

        .crt-bezel {
          background: #181818;
          border-radius: 5px 5px 3px 3px;
          padding: 10px;
          border: 4px solid #0e0e0e;
          box-shadow:
            inset 0 0 24px rgba(0,0,0,0.9),
            0 0 0 1px #404040;
        }

        .crt-screen {
          width: 496px;
          height: 340px;
          background: #060500;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

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

        /* Prompt is inline — cursor follows on the same line as [y] */
        .crt-prompt {
          text-shadow: 0 0 8px rgba(200, 134, 10, 0.55);
        }

        /* [y] glows brighter to signal it is interactive */
        .crt-prompt-y {
          color: #f0a820;
          text-shadow: 0 0 10px rgba(240, 168, 32, 0.9);
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

        .crt-vents { display: flex; gap: 3px; align-items: center; }
        .crt-vent  { width: 1.5px; height: 12px; background: #888; border-radius: 1px; }

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
          box-shadow: 0 2px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08);
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

      <svg className="crt-wire-svg" xmlns="http://www.w3.org/2000/svg">
        {wireVisible && wireD && (
          <>
            <path d={wireD} fill="none" stroke="#0a0a0a"  strokeWidth="7"   strokeLinecap="round" opacity={0.45} />
            <path d={wireD} fill="none" stroke="#2c2c2c"  strokeWidth="5"   strokeLinecap="round" />
            <path d={wireD} fill="none" stroke="#585858"  strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>

      <div className="crt-hero">
        <div className="crt-monitor">

          <div
            className={`crt-port${pluggedLabel ? ' plugged' : ''}`}
            ref={portRef}
            onPointerDown={onPortPointerDown}
            title="drag to connect"
          >
            <div className="crt-port-inner" />
          </div>

          <div className="crt-bezel">
            <div className="crt-screen">
              <div className="crt-terminal">

                <span className="crt-terminal-text">{displayText}</span>

                {promptText && (
                  <span className="crt-prompt">
                    {promptText.includes('[y]') ? (
                      <>
                        {promptText.slice(0, promptText.indexOf('[y]'))}
                        <span className="crt-prompt-y">[y]</span>
                      </>
                    ) : (
                      promptText
                    )}
                  </span>
                )}

                <span className="crt-cursor" />

              </div>
            </div>
          </div>

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