'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderQuote() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  const quoteLines = [
    "To stand at the edge of the crater lake",
    "is to understand the profound harmony",
    "between unseen architecture and wild nature."
  ];

  useGSAP(() => {
    // 1. Background Image Parallax
    gsap.fromTo(
      bgRef.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // 2. Character-by-Character "Human Written" Reveal
    gsap.to(".char", {
      opacity: 1,
      stagger: 0.03, // The speed of the writing effect
      duration: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 75%",
      }
    });

    // 3. Author Reveal (Fades in after the writing is mostly done)
    gsap.fromTo(
      ".quote-author",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2.5, // Delayed to wait for the writing effect to finish
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#1A2E25]">
      
      {/* The Architectural Grid BG */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#F5F2EB]" />
      </div>

      {/* Parallax Background Gradient */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] opacity-40 mix-blend-luminosity"
        style={{
          background: 'radial-gradient(circle at center, #2A4A3C 0%, #0D1821 70%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Fog Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1A2E25] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1A2E25] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center" ref={textRef}>
        
        {/* Giant Opening Quote Mark */}
        <div className="font-serif text-[6rem] md:text-[8rem] leading-none text-[#F5F2EB]/20 -mb-8 md:-mb-12">
          &ldquo;
        </div>

        {/* Quote Lines - Reduced Text Size and mapped to characters */}
        <h3 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#F5F2EB] leading-loose mb-12">
          {quoteLines.map((line, i) => (
            <span key={i} className="block pb-2">
              {/* Splitting the line into characters for the writing effect */}
              {line.split("").map((char, j) => (
                <span key={j} className="char opacity-0 inline-block">
                  {/* Preserve spaces by rendering a non-breaking space if the character is a space */}
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h3>

        {/* Author */}
        <div className="quote-author flex flex-col items-center gap-2">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#F5F2EB]">
            The Founders
          </span>
          <span className="text-xs md:text-sm text-[#F5F2EB]/60">
            Babogaya Resort
          </span>
        </div>

      </div>
    </section>
  );
}