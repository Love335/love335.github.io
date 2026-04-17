'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when user has scrolled more than 150px or near bottom
      if (window.scrollY > 150) {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-9-9m0 0L5 14" />
        </svg>
      </div>
    </div>
  );
}