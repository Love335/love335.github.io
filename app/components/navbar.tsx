'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useWire } from './wire-context';

const navItems = [
  {
    label: 'About Me',
    href: '/about',
    accentColor: 'bg-rose-600 hover:bg-rose-700',
    activeColor: 'bg-rose-600',
    emoji: '👤',
  },
  {
    label: 'Beatnik',
    href: '/beatnik',
    accentColor: 'bg-[#1e3a8a] hover:bg-[#1e40af]',
    activeColor: 'bg-[#1e3a8a]',
    icon: '/icons/icon_beatnik.png',
    type: 'beatnik',
  },
  {
    label: 'BreakEven',
    href: '/breakeven',
    accentColor: 'bg-emerald-600 hover:bg-emerald-700',
    activeColor: 'bg-emerald-600',
    icon: '/icons/icon_breakeven.png',
    type: 'breakeven',
  },
  {
    label: 'Bonsai',
    href: '/bonsai',
    accentColor: 'bg-green-600 hover:bg-green-700',
    activeColor: 'bg-green-600',
    icon: '/icons/icon_bonsai.png',
    type: 'bonsai',
  },
  {
    label: 'Local Hero',
    href: '/localhero',
    accentColor: 'bg-sky-600 hover:bg-sky-700',
    activeColor: 'bg-sky-600',
    emoji: '🌍',
  },
  {
    label: 'uConsole',
    href: '/uconsole',
    accentColor: 'bg-slate-700 hover:bg-slate-800',
    activeColor: 'bg-slate-700',
    emoji: '🖥️',
  },
];

function NavbarJack({ label, visibleOnHome }: { label: string; visibleOnHome: boolean }) {
  const { registerJack, pluggedLabel, hoveredLabel, onPlugPointerDown } = useWire();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerJack(label, ref.current);
    return () => registerJack(label, null);
  }, [label, registerJack]);

  const isPlugged = pluggedLabel === label;
  const isHovered = hoveredLabel === label;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlugged || !visibleOnHome) return;
    e.preventDefault();
    e.stopPropagation();
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

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const isHome   = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (isActive) {
            return (
              <button
                key={item.href}
                onClick={() => router.push('/')}
                aria-label="Back to home"
                title="Back to home"
                className={`
                  flex-1 flex items-center justify-center relative
                  transition-all duration-200
                  ${item.activeColor}
                  ring-2 ring-white ring-inset shadow-inner
                  hover:brightness-110
                  cursor-pointer
                `}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 8H3M3 8L8 3M3 8L8 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="1" y1="2" x2="1" y2="14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`
                flex-1 flex items-center justify-center relative
                transition-all duration-200
                ${item.accentColor}
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