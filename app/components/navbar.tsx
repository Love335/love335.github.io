'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useWire } from './wire-context';

const navItems = [
  {
    label: 'About Me',
    href: '/about',
    accentColor: 'bg-rose-600 hover:bg-rose-700',
    emoji: '👤',
  },
  {
    label: 'Beatnik',
    href: '/beatnik',
    accentColor: 'bg-[#1e3a8a] hover:bg-[#1e40af]',
    icon: '/icons/icon_beatnik.png',
    type: 'beatnik',
  },
  {
    label: 'BreakEven',
    href: '/breakeven',
    accentColor: 'bg-emerald-600 hover:bg-emerald-700',
    icon: '/icons/icon_breakeven.png',
    type: 'breakeven',
  },
  {
    label: 'Bonsai',
    href: '/bonsai',
    accentColor: 'bg-green-600 hover:bg-green-700',
    icon: '/icons/icon_bonsai.png',
    type: 'bonsai',
  },
  {
    label: 'Local Hero',
    href: '/localhero',
    accentColor: 'bg-sky-600 hover:bg-sky-700',
    emoji: '🌍',
  },
  {
    label: 'uConsole',
    href: '/uconsole',
    accentColor: 'bg-slate-700 hover:bg-slate-800',
    emoji: '🖥️',
  },
];

// ─── NavbarJack ──────────────────────────────────────────────────────────────
function NavbarJack({ label, visibleOnHome }: { label: string; visibleOnHome: boolean }) {
  const { registerJack, pluggedLabel, hoveredLabel, onPlugPointerDown } = useWire();
  const ref = useRef<HTMLDivElement>(null);

  // Always register the ref so getJackCenter works regardless of page.
  useEffect(() => {
    registerJack(label, ref.current);
    return () => registerJack(label, null);
  }, [label, registerJack]);

  const isPlugged = pluggedLabel === label;
  const isHovered = hoveredLabel === label;

  // When plugged in and the user presses down on this socket, hand the
  // pointer event to CrtHero's drag system so they can pull the wire out.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlugged || !visibleOnHome) return;
    e.preventDefault();
    e.stopPropagation(); // don't trigger the parent <Link>
    onPlugPointerDown(e.nativeEvent);
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      style={{
        position: 'absolute',
        bottom: '-9px',
        left: '50%',
        transform: `translateX(-50%) scale(${isHovered && visibleOnHome ? 1.2 : 1})`,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        zIndex: 20,
        // Hidden on non-home pages but still in the DOM for ref registration.
        // visibility keeps getBoundingClientRect returning real coords.
        visibility: visibleOnHome ? 'visible' : 'hidden',
        pointerEvents: visibleOnHome ? 'auto' : 'none',
        transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s, transform 0.15s',
        cursor: isPlugged && visibleOnHome ? 'grab' : 'default',
        background: isPlugged ? '#100c00' : isHovered && visibleOnHome ? '#2a2a2a' : '#111',
        border: `2px solid ${isPlugged ? '#c8860a' : isHovered && visibleOnHome ? '#888' : '#333'}`,
        boxShadow: isPlugged && visibleOnHome ? '0 0 6px rgba(200,134,10,0.5)' : 'none',
      }}
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`
                flex-1 flex items-center justify-center relative
                transition-all duration-200
                ${item.accentColor}
                ${isActive ? 'ring-2 ring-white ring-inset shadow-inner' : ''}
                hover:brightness-110
              `}
            >
              {item.icon ? (
                <div className="relative h-full w-full flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className={`
                      object-contain
                      ${item.type === 'breakeven' ? 'rotate-90 pixelated' : ''}
                      ${item.type === 'bonsai' ? 'rounded-sm' : ''}
                    `}
                  />
                </div>
              ) : (
                <span className="text-2xl">{item.emoji}</span>
              )}

              <NavbarJack label={item.label} visibleOnHome={isHome} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}