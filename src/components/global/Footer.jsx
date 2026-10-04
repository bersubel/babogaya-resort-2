"use client";

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const magneticRef = useRef(null);
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. The Parallax Video Zoom
      // The video starts slightly zoomed in and dark, then perfectly frames itself
      gsap.fromTo(videoWrapperRef.current,
        { 
          scale: 1.15,
          filter: "brightness(0.3)" 
        },
        {
          scale: 1,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", 
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // 2. The Content Float
      // Typography gently floats up into place as the footer is revealed
      gsap.fromTo(contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%", 
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // 3. Infinite Marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = magneticRef.current;
    
    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      xTo((e.clientX - centerX) * 0.4);
      yTo((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // This sticky configuration creates the "Curtain Reveal" parallax effect naturally
    <footer ref={footerRef} className="relative w-full h-screen bg-forest overflow-hidden flex flex-col justify-between" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full will-change-transform">
        <video 
          src="/media/babugayahero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/20 to-transparent pointer-events-none" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full h-full flex flex-col justify-between pt-24">
        
        <div className="w-full px-8 md:px-16 flex justify-between items-start text-sand drop-shadow-lg">
          <div className="flex flex-col gap-2 md:gap-4 uppercase tracking-[0.2em] text-xs font-bold">
            <span className="opacity-70 mb-2">Location</span>
            <p>Lake Babogaya</p>
            <p>Bishoftu, Ethiopia</p>
            <a href="mailto:escape@babogaya.com" className="mt-4 hover:opacity-60 transition-opacity">
              escape@babogaya.com
            </a>
          </div>
          
          <div className="flex flex-col gap-2 md:gap-4 text-right uppercase tracking-[0.2em] text-xs font-bold">
            <span className="opacity-70 mb-2">Socials</span>
            <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Facebook</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Twitter</a>
          </div>
        </div>

        <div className="w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between mt-auto mb-12 md:mb-16">
          <div className="cursor-none text-sand hover:opacity-70 transition-opacity">
            <h2 
              onClick={handleScroll}
              className="text-[15vw] md:text-[12vw] font-medium tracking-tighter leading-none m-0 p-0 drop-shadow-md"
            >
              BABOGAYA
            </h2>
          </div>

          <div className="mt-12 md:mt-0 p-12 -m-12"> 
            <div
              ref={magneticRef}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-sand/40 flex items-center justify-center cursor-none group hover:bg-sand transition-colors duration-500 will-change-transform bg-sand/10 backdrop-blur-md shadow-xl"
            >
              <span className="text-sand group-hover:text-forest text-xs md:text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-500 text-center px-4">
                Book <br/> Escape
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-sand/20 py-4 md:py-6 overflow-hidden flex items-center bg-forest/80 backdrop-blur-md">
        <div ref={marqueeRef} className="flex whitespace-nowrap text-sand opacity-80 text-xs md:text-sm tracking-[0.4em] uppercase font-bold w-max">
          <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
          <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
          <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
          <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
        </div>
      </div>

    </footer>
  );
}