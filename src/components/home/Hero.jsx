"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const sideElementsRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Video scales down beautifully on load
      tl.fromTo(videoRef.current, 
        { scale: 1.1, filter: "brightness(0)" },
        { scale: 1, filter: "brightness(1)", duration: 2, ease: "power3.out" }
      )
      // Side elements fade in
      .fromTo(sideElementsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=1"
      )
      // Massive bottom text slides up
      .fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=1"
      );

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen bg-forest overflow-hidden flex flex-col text-sand font-sans pt-20">
      
      {/* 1. BACKGROUND VIDEO & OVERLAYS */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          src="/media/babugayahero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover mix-blend-luminosity opacity-80"
        />
        <div className="absolute inset-0 bg-forest/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-forest/50" />
      </div>

      {/* 2. THE THIN GRID LINES */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-sand" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-sand" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-sand" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-sand" />
      </div>

      {/* 3. MIDDLE FLOATING ELEMENTS */}
      <div ref={sideElementsRef} className="relative z-20 flex-1 w-full flex items-center justify-between px-6 md:px-12 pointer-events-none">
        
        {/* Left Side: Elegant Italic Text */}
        <div className="max-w-xs md:max-w-sm pointer-events-auto">
          <p className="font-serif italic text-lg md:text-2xl leading-tight opacity-90 drop-shadow-md">
            Unseen architecture meets untouched nature in the premier crater lake retreat.
          </p>
        </div>

        {/* Right Side: Watch Film Button */}
        <div className="pointer-events-auto border-y border-sand/20 py-3 md:py-4 px-6 md:px-8 hover:bg-sand hover:text-forest transition-colors cursor-pointer flex items-center gap-4 group backdrop-blur-sm bg-forest/10">
          <span className="text-xs tracking-[0.2em] uppercase font-bold">Watch Film</span>
          <svg className="w-3 h-3 fill-current group-hover:text-forest" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

      </div>

      {/* 4. MASSIVE BOTTOM TEXT */}
      <div className="relative z-20 w-full flex justify-center pb-2 md:pb-6 overflow-hidden pointer-events-none">
        <h1 ref={textRef} className="text-[20vw] font-bold leading-[0.75] tracking-tighter m-0 p-0 drop-shadow-2xl text-center">
          BABOGAYA
        </h1>
      </div>

    </section>
  );
}