'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AntarcticaIntro() {
  const sectionRef = useRef(null);
  const textTranslateRef = useRef(null);
  const textMaskRef = useRef(null);
  const revealCircleRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    
    // 1. THE OVERLAP DROP-IN
    // Slides down smoothly to meet the user's scroll, creating the continuous-element-crossing-sections visual handoff illusion.
    // Starts high up so it stays matched with the scrolling Hero before pinning.
    gsap.fromTo(textTranslateRef.current,
      { y: "-80vh" }, // Starts high up, fell from hero
      { 
        y: "0vh", 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts the moment this section enters the bottom of the screen
          end: "top top",      // Ends exactly when this section hits the top
          scrub: true,
        }
      }
    );

    // 2. THE MAIN INFINITE ZOOM
    // This timeline only starts AFTER the section hits the top and pins in place.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",     
        end: "+=250%",        
        scrub: true,          
        pin: true,            
      }
    });

    // Image zooms out slightly for parallax
    tl.fromTo(imageRef.current,
      { scale: 1.3, transformOrigin: "50% 50%" },
      { scale: 1, ease: "power1.inOut", duration: 2 },
      0 // Starts immediately
    );

    // Text mask scales infinitely to reveal the full image
    tl.to(textMaskRef.current, { 
      scale: 80, 
      transformOrigin: "50% 50%",
      ease: "power2.in",
      duration: 2
    }, 0); // Starts at exactly the same time as the image parallax

    // White circle expands to clear any leftover mask edges
    tl.to(revealCircleRef.current, {
      attr: { r: 4000 },
      ease: "power2.in",
      duration: 0.5
    }, "-=0.3");

    // Dark Overlay fades in over the image to ensure text is readable
    // A strict forest green color for luxury look.
    tl.to(overlayRef.current, { 
      opacity: 0.6, 
      ease: "power2.inOut",
      duration: 0.8
    }, "-=0.4");

    // Editorial Text gracefully slides up onto the screen and fades in.
    // It's readable over the darkened image. Replaces the word-by-word choppy reveal.
    tl.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 },
      "-=0.6"
    );

  }, { scope: sectionRef });

  return (
    // We are now explicitly setting the background to a creamy white hex code to ensure it's not overridden.
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F5F2EB] overflow-hidden">
      {/* --- THE COMMENT CAUSING THE ERROR HAS BEEN REMOVED FROM THIS ILLEGAL LOCATION --- */}
      
      {/* --- The SVG Text Mask & Image --- */}
      <div className="absolute inset-0 w-full h-full z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          
          <defs>
            <mask id="babogayaMask">
              {/* Black background hides the image, revealing the creamy white background underneath */}
              <rect width="100%" height="100%" fill="black" />
              
              {/* Outer group handles the overlap drop-in; Inner group handles the infinite zoom */}
              <g ref={textTranslateRef}>
                <g ref={textMaskRef}>
                  {/* Strict inline styling combined with correct weights ensures the SVG renders an IDENTICAL CLONE of the Hero HTML. */}
                  <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    fill="white"
                    style={{ 
                      fontSize: '20vw', 
                      fontWeight: '700', // Matches 'font-bold'
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Replicates Tailwind's 'font-sans'
                      letterSpacing: '-0.05em' // Matches Tailwind's 'tracking-tighter' perfectly
                    }}
                  >
                    BABOGAYA
                  </text>
                </g>
              </g>
              
              {/* Expands to clear any leftover mask edges */}
              <circle ref={revealCircleRef} cx="50%" cy="50%" r="0" fill="white" />
            </mask>
          </defs>

          {/* The Actual Background Image - Masked by the SVG text above.
              Replaced 'i1.PNG' with 'l1.PNG' as requested. */}
          <g style={{ transformOrigin: '50% 50%' }} ref={imageRef}>
            <image 
              href="/media/l1.PNG" 
              width="100%" 
              height="100%" 
              preserveAspectRatio="xMidYMid slice" 
              mask="url(#babogayaMask)" 
            />
          </g>
        </svg>
        
        {/* Dark Overlay that ensures readable text - Now a strict forest green to guaranteed luxury feel */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-[#1A2E25] pointer-events-none opacity-0" 
        />
      </div>

      {/* --- The Editorial Text on Top of the Expanded Image --- */}
      {/* Gracefully slides into view on scroll over the now full-screen image.
          Opacity is 0 at start, controlled by GSAP trigger. */}
      <div 
        ref={textRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6 opacity-0"
      >
        <div className="max-w-3xl flex flex-col items-center">
          <span className="block text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-6 md:mb-10 text-[#F5F2EB]/80">
            The Premier Retreat
          </span>
          
          <p className="font-serif text-xl md:text-3xl lg:text-4xl leading-[1.4] tracking-wide text-[#F5F2EB] drop-shadow-2xl">
            Step into a sanctuary where unseen architecture seamlessly blends with untouched nature. Here at Lake Babogaya, time slows down, and the gentle ripples of the crater lake invite you to experience pure, breathtaking tranquility.
          </p>
        </div>
      </div>

    </section>
  );
}