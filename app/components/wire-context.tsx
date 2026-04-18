'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface WireContextValue {
  pluggedLabel: string | null;
  hoveredLabel: string | null;
  setPluggedLabel: (label: string | null) => void;
  setHoveredLabel: (label: string | null) => void;
  registerJack: (label: string, el: HTMLElement | null) => void;
  getJackCenter: (label: string) => { x: number; y: number } | null;
  getAllJacks: () => Map<string, HTMLElement>;
  // CrtHero registers this so NavbarJack can hand a pointerdown to the drag
  // system — enabling "pull from socket to unplug" interactions.
  registerPlugPointerDown: (fn: ((e: PointerEvent) => void) | null) => void;
  onPlugPointerDown: (e: PointerEvent) => void;
}

const WireContext = createContext<WireContextValue | null>(null);

export function WireProvider({ children }: { children: React.ReactNode }) {
  const [pluggedLabel, setPluggedLabel] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const jackEls = useRef<Map<string, HTMLElement>>(new Map());
  const plugPointerDownFn = useRef<((e: PointerEvent) => void) | null>(null);

  const registerJack = useCallback(
    (label: string, el: HTMLElement | null) => {
      if (el) jackEls.current.set(label, el);
      else jackEls.current.delete(label);
    },
    []
  );
  
  const getJackCenter = useCallback(
    (label: string): { x: number; y: number } | null => {
      const el = jackEls.current.get(label);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width  / 2 + window.scrollX,
        y: r.top  + r.height / 2 + window.scrollY,
      };
    },
    []
  );

  const getAllJacks = useCallback(() => jackEls.current, []);

  const registerPlugPointerDown = useCallback(
    (fn: ((e: PointerEvent) => void) | null) => {
      plugPointerDownFn.current = fn;
    },
    []
  );

  const onPlugPointerDown = useCallback((e: PointerEvent) => {
    // Schedule a one-shot click suppressor on the capture phase.
    // This prevents the pointerdown → drag → pointerup sequence from
    // synthesising a click on the <Link> underneath when the user releases.
    const suppressClick = (clickEvent: MouseEvent) => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      window.removeEventListener('click', suppressClick, true);
    };
    window.addEventListener('click', suppressClick, true);

    plugPointerDownFn.current?.(e);
  }, []);

  return (
    <WireContext.Provider
      value={{
        pluggedLabel,
        hoveredLabel,
        setPluggedLabel,
        setHoveredLabel,
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
  if (!ctx) throw new Error('useWire must be used inside <WireProvider>');
  return ctx;
}