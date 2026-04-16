'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'About Me', href: '/about', accentColor: 'bg-rose-600 hover:bg-rose-700', emoji: '👤' },
  { label: 'Beatnik', href: '/beatnik', accentColor: 'bg-indigo-600 hover:bg-indigo-700', emoji: '🎸' },
  { label: 'BreakEven', href: '/breakeven', accentColor: 'bg-emerald-600 hover:bg-emerald-700', emoji: '🎰' },
  { label: 'Bonsai', href: '/bonsai', accentColor: 'bg-green-600 hover:bg-green-700', emoji: '🌱' },
  { label: 'Local Hero', href: '/localhero', accentColor: 'bg-sky-600 hover:bg-sky-700', emoji: '🌍' },
  { label: 'uConsole', href: '/uconsole', accentColor: 'bg-slate-700 hover:bg-slate-800', emoji: '🖥️' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">      
  <div className="flex h-12">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex-1 flex items-center justify-center gap-3 
                text-foreground font-medium text-lg
                transition-all duration-300 hover:scale-105
                ${item.accentColor}
                ${isActive ? 'ring-2 ring-white ring-inset shadow-inner' : ''}
              `}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}