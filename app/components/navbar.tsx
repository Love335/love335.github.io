'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'About Me', href: '/about', accentColor: 'bg-rose-600 hover:bg-rose-700', emoji: '👤' },

  { 
    label: 'Beatnik',
    href: '/beatnik',
    accentColor: 'bg-[#1e3a8a] hover:bg-[#1e40af]', // replace with exact color
    icon: '/icons/icon_beatnik.png',
    type: 'beatnik'
  },

  { 
    label: 'BreakEven',
    href: '/breakeven',
    accentColor: 'bg-emerald-600 hover:bg-emerald-700',
    icon: '/icons/icon_breakeven.png',
    type: 'breakeven'
  },

  { 
    label: 'Bonsai',
    href: '/bonsai',
    accentColor: 'bg-green-600 hover:bg-green-700',
    icon: '/icons/icon_bonsai.png',
    type: 'bonsai'
  },

  { label: 'Local Hero', href: '/localhero', accentColor: 'bg-sky-600 hover:bg-sky-700', emoji: '🌍' },
  { label: 'uConsole', href: '/uconsole', accentColor: 'bg-slate-700 hover:bg-slate-800', emoji: '🖥️' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label} // 👈 important for accessibility
              className={`
                flex-1 flex items-center justify-center
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}