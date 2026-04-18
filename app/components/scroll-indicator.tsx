'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const scrollable =
        document.documentElement.scrollHeight > window.innerHeight + 4;
      setShow(scrollable && window.scrollY <= 150);
    };

    const t = setTimeout(evaluate, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) setShow(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
      <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7 7 7-7"
          />
        </svg>
      </div>
    </div>
  );
}