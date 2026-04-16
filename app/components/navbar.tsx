'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'About Me', href: '/about', accentColor: 'bg-rose-600 hover:bg-rose-700', emoji: '👤' },
  { label: 'Beatnik', href: '/beatnik', accentColor: 'bg-indigo-600 hover:bg-indigo-700', emoji: '🎸' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="flex h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex-1 flex items-center justify-center gap-3 
                text-white font-medium text-lg
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