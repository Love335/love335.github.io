"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface Point {
  x: number;
  y: number;
}

interface WireContextValue {
  /** Slug of the project the wire is plugged into, if any. */
  pluggedSlug: string | null;
  /** Slug of the tab the dragged wire is currently over, if any. */
  hoveredSlug: string | null;
  setPluggedSlug: (slug: string | null) => void;
  setHoveredSlug: (slug: string | null) => void;
  registerJack: (slug: string, el: HTMLElement | null) => void;
  /** Centre of a tab's jack in page coordinates. */
  getJackCenter: (slug: string) => Point | null;
  getAllJacks: () => Map<string, HTMLElement>;
  /**
   * The CRT registers its drag handler here so a plugged jack can hand its
   * pointerdown over, enabling "pull the wire out of the socket" interactions.
   */
  registerPlugPointerDown: (fn: ((e: PointerEvent) => void) | null) => void;
  onPlugPointerDown: (e: PointerEvent) => void;
}

const WireContext = createContext<WireContextValue | null>(null);

export function WireProvider({ children }: { children: React.ReactNode }) {
  const [pluggedSlug, setPluggedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const jackEls = useRef<Map<string, HTMLElement>>(new Map());
  const plugPointerDownFn = useRef<((e: PointerEvent) => void) | null>(null);

  const registerJack = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) jackEls.current.set(slug, el);
    else jackEls.current.delete(slug);
  }, []);

  const getJackCenter = useCallback((slug: string): Point | null => {
    const el = jackEls.current.get(slug);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 + window.scrollX,
      y: r.top + r.height / 2 + window.scrollY,
    };
  }, []);

  const getAllJacks = useCallback(() => jackEls.current, []);

  const registerPlugPointerDown = useCallback(
    (fn: ((e: PointerEvent) => void) | null) => {
      plugPointerDownFn.current = fn;
    },
    [],
  );

  const onPlugPointerDown = useCallback((e: PointerEvent) => {
    // Swallow the click that the pointerdown → drag → pointerup sequence would
    // otherwise synthesise on the <Link> underneath the jack.
    const suppressClick = (clickEvent: MouseEvent) => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      window.removeEventListener("click", suppressClick, true);
    };
    window.addEventListener("click", suppressClick, true);

    plugPointerDownFn.current?.(e);
  }, []);

  return (
    <WireContext.Provider
      value={{
        pluggedSlug,
        hoveredSlug,
        setPluggedSlug,
        setHoveredSlug,
        registerJack,
        getJackCenter,
        getAllJacks,
        registerPlugPointerDown,
        onPlugPointerDown,
      }}
    >
      {children}
    </WireContext.Provider>
  );
}

export function useWire() {
  const ctx = useContext(WireContext);
  if (!ctx) throw new Error("useWire must be used inside <WireProvider>");
  return ctx;
}
