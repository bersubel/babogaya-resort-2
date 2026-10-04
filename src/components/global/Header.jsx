"use client";

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      // Removed the horizontal padding (px) entirely so elements start directly from the screen edges
      className={`fixed top-0 left-0 w-full z-50 h-24 flex items-center justify-between transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      
      {/* Left Links - Removed borders, reduced padding to px-4 py-2 for a smaller footprint, and set gap-1 for subtle separation */}
      <div className="flex items-center gap-[2px] text-[9px] md:text-xs tracking-[0.15em] uppercase font-bold text-sand">
        <a href="#retreat" className="px-4 py-2 md:px-5 md:py-2.5 bg-forest/40 backdrop-blur-md shadow-sm hover:bg-forest/80 transition-colors">
          The Retreat
        </a>
        <a href="#experience" className="px-4 py-2 md:px-5 md:py-2.5 bg-forest/40 backdrop-blur-md shadow-sm hover:bg-forest/80 transition-colors hidden md:block">
          Experience
        </a>
        <a href="#about" className="px-4 py-2 md:px-5 md:py-2.5 bg-forest/40 backdrop-blur-md shadow-sm hover:bg-forest/80 transition-colors hidden md:block">
          About
        </a>
      </div>

      {/* Center Logo - Increased height (h-20 md:h-28) to make it much bigger and more prominent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 md:h-28 flex items-center justify-center pointer-events-none">
        <img 
          src="/media/babogayalogo.png" 
          alt="Babogaya Resort Logo" 
          className="h-full w-auto object-contain drop-shadow-xl pointer-events-auto"
        />
      </div>

      {/* Right Links - Mirrored styling from the left side */}
      <div className="flex items-center gap-[2px] text-[9px] md:text-xs tracking-[0.15em] uppercase font-bold text-sand">
        <a href="#rates" className="px-4 py-2 md:px-5 md:py-2.5 bg-forest/40 backdrop-blur-md shadow-sm hover:bg-forest/80 transition-colors hidden md:block">
          Rates
        </a>
        <a href="#book" className="px-4 py-2 md:px-5 md:py-2.5 bg-forest/40 backdrop-blur-md shadow-sm hover:bg-forest/80 transition-colors">
          Enquire
        </a>
      </div>
      
    </nav>
  );
}