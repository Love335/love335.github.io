'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  // Re-evaluate on every route change.
  // We defer one tick so the new page's content has painted and
  // scrollHeight reflects the actual page height.
  useEffect(() => {
    const evaluate = () => {
      const scrollable =
        document.documentElement.scrollHeight > window.innerHeight + 4;
      // +4 accounts for sub-pixel rounding on some browsers
      setShow(scrollable && window.scrollY <= 150);
    };

    // Tick delay so layout is settled after navigation
    const t = setTimeout(evaluate, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  // Hide once the user scrolls down; does not reset until next navigation.
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
          {/* Arrow pointing down */}
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