"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../lib/cn";
import { getProject } from "../lib/projects";
import { useWire } from "./wire-context";
import styles from "./crt.module.css";

/** The key the user presses to answer a prompt. Rendered as a button wherever it appears. */
const KEY = "[y]";

const IDLE_LINES = [
  "PORTFOWLIO-1 v2.4 ready.",
  "",
  "No signal detected.",
  "",
  "→ connect wire to port",
  " above to load output.",
  "→ click icons for more info."
];

/* Pressing the key here plugs the wire into a random tab. */
const RANDOM_PROMPT = ["→ or press [y] to plug", " into a random port."];

/* The owl in the lower-right corner, drawn relative to its own left edge. Its
   head shares the last idle line, and the rest follow on the lines below. */
const OWL_LINES = [
  "",
  "       ,___,",
  "      /(6 6)\\_",
  "     /\\` ' `'\\\\_",
  "     \\\\\\_\\''|\\\\\\",
  "     )\\\\\\\\''//||/",
  "._,--/////\"\"----|--------",
  "               `|",
  "                |",
];
const OWL_WIDTH = Math.max(...OWL_LINES.map((line) => line.length));

const leadingSpaces = (line: string) => line.length - line.trimStart().length;

/**
 * Idle text for a `cols`-wide screen. The owl is indented to sit against the
 * right edge, and the random-port prompt goes to the left of the owl's first
 * body rows when there is room for it, otherwise underneath the owl.
 */
function idleLines(cols: number): string[] {
  const indent = Math.max(0, cols - OWL_WIDTH);
  const [head, ...body] = OWL_LINES;
  const last = IDLE_LINES[IDLE_LINES.length - 1];
  const beside = RANDOM_PROMPT.every(
    (line, i) => line.length + 1 <= indent + leadingSpaces(body[i]),
  );
  return [
    ...IDLE_LINES.slice(0, -1),
    last.padEnd(indent) + head,
    ...body.map((row, i) => (beside ? (RANDOM_PROMPT[i] ?? "") : "").padEnd(indent) + row),
    ...(beside ? [] : RANDOM_PROMPT),
  ];
}

/** Characters in the hidden span used to measure the terminal's character width. */
const PROBE_LENGTH = 40;
/** Columns on a full-size screen, used before the terminal can be measured. */
const DEFAULT_COLS = 54;

interface Vec2 {
  x: number;
  y: number;
}

function makeWirePath(sx: number, sy: number, tx: number, ty: number): string {
  const dist = Math.hypot(tx - sx, ty - sy);
  const sag = Math.min(dist * 0.3, 80);
  return `M ${sx} ${sy} C ${sx} ${sy + sag}, ${tx} ${ty + sag * 0.35}, ${tx} ${ty}`;
}

/** How far outside a navbar tab the wire can be dropped and still connect. */
const HIT_PADDING = 28;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Terminal text with the first prompt key rendered as a pressable button. */
function TerminalText({ text, onKey }: { text: string; onKey: () => void }) {
  const i = text.indexOf(KEY);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <button type="button" className={styles.promptKey} onClick={onKey}>
        {KEY}
      </button>
      {text.slice(i + KEY.length)}
    </>
  );
}

/** What pressing the key does right now. */
type KeyAction = "open" | "random";

export default function Crt() {
  const router = useRouter();

  const {
    pluggedSlug,
    setPluggedSlug,
    setHoveredSlug,
    getJackCenter,
    getAllJacks,
    registerPlugPointerDown,
  } = useWire();

  const portRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const isDragging = useRef(false);
  const pluggedSnap = useRef<Vec2 | null>(null);
  const animation = useRef<number | null>(null);

  const [wireD, setWireD] = useState("");

  const [displayText, setDisplayText] = useState("");
  const [promptText, setPromptText] = useState("");
  /** Lines the screen makes room for; the idle text decides it. */
  const [screenLines, setScreenLines] = useState(15);

  const pendingKey = useRef<KeyAction | null>(null);
  const activeSlug = useRef<string | null>(null);
  const printTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getPortCenter = useCallback((): Vec2 => {
    const r = portRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, []);

  const drawTo = useCallback(
    (tx: number, ty: number) => {
      const { x: sx, y: sy } = getPortCenter();
      setWireD(makeWirePath(sx, sy, tx, ty));
    },
    [getPortCenter],
  );

  /** The tab under the pointer: whichever padded tab is horizontally nearest. */
  const getSlotAt = useCallback(
    (x: number, y: number): string | null => {
      let best: { slug: string; dist: number } | null = null;
      for (const [slug, el] of getAllJacks()) {
        const r = (el.closest("a") ?? el).getBoundingClientRect();
        if (
          x < r.left - HIT_PADDING ||
          x > r.right + HIT_PADDING ||
          y < r.top - HIT_PADDING ||
          y > r.bottom + HIT_PADDING
        ) {
          continue;
        }
        const dist = Math.abs(x - (r.left + r.right) / 2);
        if (!best || dist < best.dist) best = { slug, dist };
      }
      return best?.slug ?? null;
    },
    [getAllJacks],
  );

  const printLines = useCallback((lines: string[], slug: string | null = null) => {
    if (printTimer.current) clearTimeout(printTimer.current);
    setDisplayText("");
    setPromptText("");
    pendingKey.current = null;

    // The key becomes active as soon as it has been typed on screen.
    const action: KeyAction = slug ? "open" : "random";

    const schedule = (fn: () => void, ms: number) => {
      printTimer.current = setTimeout(fn, ms);
    };

    function typeLines(done: () => void) {
      let li = 0;
      let ci = 0;
      let built = "";

      function step() {
        if (li >= lines.length) {
          done();
          return;
        }
        const line = lines[li];
        if (ci < line.length) {
          built += line[ci++];
          setDisplayText(built);
          if (built.endsWith(KEY)) pendingKey.current = action;
          schedule(step, line[ci - 1] === "." ? 75 : 15 + Math.random() * 12);
        } else {
          built += "\n";
          li++;
          ci = 0;
          setDisplayText(built);
          schedule(step, line === "" ? 30 : 75);
        }
      }

      step();
    }

    function typePrompt(label: string) {
      const prompt = `Open ${label}? ${KEY}`;
      let pi = 0;
      let built = "";

      function step() {
        if (pi < prompt.length) {
          built += prompt[pi++];
          setPromptText(built);
          schedule(step, 22 + Math.random() * 10);
        } else {
          pendingKey.current = action;
        }
      }

      schedule(step, 300);
    }

    const project = slug ? getProject(slug) : undefined;
    typeLines(() => {
      if (project) typePrompt(project.label);
    });
  }, []);

  /** How many characters fit on one line of the terminal right now. */
  const measureCols = useCallback((): number => {
    const terminal = terminalRef.current;
    const probe = probeRef.current;
    if (!terminal || !probe) return DEFAULT_COLS;
    const style = getComputedStyle(terminal);
    const inner =
      terminal.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const charWidth = probe.getBoundingClientRect().width / PROBE_LENGTH;
    return charWidth > 0 ? Math.floor(inner / charWidth) : DEFAULT_COLS;
  }, []);

  const printIdle = useCallback(() => {
    const lines = idleLines(measureCols());
    setScreenLines(lines.length);
    printLines(lines);
  }, [measureCols, printLines]);

  const cancelAnimation = useCallback(() => {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
  }, []);

  const plugInto = useCallback(
    (slug: string) => {
      const snap = getJackCenter(slug);
      if (!snap) return;
      pluggedSnap.current = snap;
      activeSlug.current = slug;
      setPluggedSlug(slug);
      drawTo(snap.x, snap.y - window.scrollY);
      printLines(getProject(slug)?.terminal ?? IDLE_LINES, slug);
    },
    [getJackCenter, setPluggedSlug, drawTo, printLines],
  );

  const doUnplug = useCallback(() => {
    pluggedSnap.current = null;
    activeSlug.current = null;
    setPluggedSlug(null);
    setWireD("");
    setPromptText("");
    printIdle();
  }, [setPluggedSlug, printIdle]);

  /** Pulls the wire from the port to a random tab, as if dragged by hand, and plugs it in. */
  const connectRandom = useCallback(() => {
    const slugs = [...getAllJacks().keys()];
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    const target = slug ? getJackCenter(slug) : null;
    if (!target) return;

    pendingKey.current = null;
    cancelAnimation();

    const from = getPortCenter();
    const to = { x: target.x - window.scrollX, y: target.y - window.scrollY };
    const duration = Math.min(1100, 450 + Math.hypot(to.x - from.x, to.y - from.y) * 0.6);
    const start = performance.now();

    const frame = (now: number) => {
      const t = easeInOut(Math.min(1, (now - start) / duration));
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      drawTo(x, y);
      setHoveredSlug(getSlotAt(x, y));
      if (t < 1) {
        animation.current = requestAnimationFrame(frame);
        return;
      }
      animation.current = null;
      setHoveredSlug(null);
      plugInto(slug);
    };

    animation.current = requestAnimationFrame(frame);
  }, [getAllJacks, getJackCenter, cancelAnimation, getPortCenter, drawTo, setHoveredSlug, getSlotAt, plugInto]);

  const beginDrag = useCallback(
    (e: PointerEvent, targetEl: HTMLElement) => {
      cancelAnimation();
      isDragging.current = true;
      targetEl.setPointerCapture(e.pointerId);

      if (pluggedSnap.current) {
        pluggedSnap.current = null;
        activeSlug.current = null;
        setPluggedSlug(null);
        setPromptText("");
        printIdle();
      }

      drawTo(e.clientX, e.clientY);
    },
    [cancelAnimation, setPluggedSlug, drawTo, printIdle],
  );

  const onPortPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      beginDrag(e.nativeEvent, e.currentTarget);
    },
    [beginDrag],
  );

  const onSocketPointerDown = useCallback(
    (e: PointerEvent) => {
      beginDrag(e, e.target as HTMLElement);
    },
    [beginDrag],
  );

  useEffect(() => {
    registerPlugPointerDown(onSocketPointerDown);
    return () => registerPlugPointerDown(null);
  }, [registerPlugPointerDown, onSocketPointerDown]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      drawTo(e.clientX, e.clientY);
      setHoveredSlug(getSlotAt(e.clientX, e.clientY));
    };

    const onUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setHoveredSlug(null);
      const hit = getSlotAt(e.clientX, e.clientY);
      if (hit) plugInto(hit);
      else doUnplug();
    };

    const onCancel = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setHoveredSlug(null);
      doUnplug();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [drawTo, getSlotAt, setHoveredSlug, plugInto, doUnplug]);

  const openActive = useCallback(() => {
    const slug = activeSlug.current;
    const href = slug ? getProject(slug)?.href : undefined;
    if (href) router.push(href);
  }, [router]);

  /** Answers whichever prompt is currently showing. */
  const pressKey = useCallback(() => {
    const action = pendingKey.current;
    if (action === "open") openActive();
    else if (action === "random") connectRandom();
  }, [openActive, connectRandom]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y") pressKey();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pressKey]);

  // The wire context outlives this component (it lives in the root layout), so
  // start from an unplugged state whenever the home page is shown again.
  useEffect(() => {
    setPluggedSlug(null);
    setHoveredSlug(null);
  }, [setPluggedSlug, setHoveredSlug]);

  useEffect(() => {
    printIdle();
    return () => {
      if (printTimer.current) clearTimeout(printTimer.current);
    };
  }, [printIdle]);

  useEffect(() => cancelAnimation, [cancelAnimation]);

  // Keep the plugged-in wire attached to its jack while the page scrolls.
  useEffect(() => {
    const onScroll = () => {
      if (!pluggedSlug) return;
      const snap = getJackCenter(pluggedSlug);
      if (!snap) return;
      pluggedSnap.current = snap;
      const port = getPortCenter();
      setWireD(makeWirePath(port.x, port.y, snap.x, snap.y - window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pluggedSlug, getJackCenter, getPortCenter]);

  useEffect(() => {
    document.documentElement.style.overscrollBehaviorY = "none";
    return () => {
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, []);

  return (
    <>
      <svg className={styles.wire} xmlns="http://www.w3.org/2000/svg">
        {wireD && (
          <>
            <path d={wireD} fill="none" stroke="#0a0a0a" strokeWidth="7" strokeLinecap="round" opacity={0.45} />
            <path d={wireD} fill="none" stroke="#2c2c2c" strokeWidth="5" strokeLinecap="round" />
            <path d={wireD} fill="none" stroke="#585858" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>

      <div className={styles.hero}>
        <div className={styles.monitor}>
          <div
            className={cn(styles.port, pluggedSlug && styles.portPlugged)}
            ref={portRef}
            onPointerDown={onPortPointerDown}
            title="drag to connect"
          >
            <div className={styles.portInner} />
          </div>

          <div className={styles.bezel}>
            <div className={styles.screen} style={{ "--lines": screenLines } as React.CSSProperties}>
              <div className={styles.terminal} ref={terminalRef}>
                <TerminalText text={displayText} onKey={pressKey} />

                {promptText && <TerminalText text={promptText} onKey={pressKey} />}

                <span className={styles.cursor} />

                <span className={styles.probe} ref={probeRef} aria-hidden="true">
                  {"0".repeat(PROBE_LENGTH)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.chin}>
            <div className={cn(styles.led, pluggedSlug && styles.ledOn)} />
            <div className={styles.brand}>PORTFOWLIO-1</div>
            <div className={styles.vents}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={styles.vent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
