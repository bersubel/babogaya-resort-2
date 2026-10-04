'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const villasData = [
  {
    id: '01',
    title: 'The Overwater Villa.',
    subtitle: 'Suspended above the crater lake',
    desc: 'Anchored directly over the gentle ripples of Lake Babogaya. Features a private wrap-around deck, infinity plunge pool, and floor-to-ceiling glass that dissolves the barrier between you and the water.',
    img: '/media/l10.png',
    bg: '#F5F2EB',
    text: '#1A2E25',
  },
  {
    id: '02',
    title: 'The Canopy Lodge.',
    subtitle: 'Hidden within the ancient trees',
    desc: 'Elevated into the lush forest canopy. This lodge offers ultimate privacy, featuring raw timber aesthetics, an open-air rain shower, and a balcony designed for birdwatching at dawn.',
    img: '/media/l1.PNG', 
    bg: '#1A2E25',
    text: '#F5F2EB',
  },
  {
    id: '03',
    title: 'The Cliffside Estate.',
    subtitle: 'Panoramic views of the rift',
    desc: 'Our most expansive and exclusive accommodation. Carved into the natural topography, boasting a private dining terrace, dedicated butler service, and unmatched sunset vistas.',
    img: '/media/l11.png', 
    bg: '#0D1821',
    text: '#F5F2EB',
  },
  {
    id: '04',
    title: 'The Penthouse.',
    subtitle: 'The pinnacle of crater lake luxury',
    desc: 'Occupying the highest vantage point of the retreat. Experience unrivaled panoramic views, bespoke architectural details, and an expansive private terrace designed for the ultimate serene escape.',
    img: '/media/l4.png', 
    bg: '#F5F2EB', 
    text: '#1A2E25',
  }
];

export default function Camps() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      cardsRef.current.forEach((card, index) => {
        const imgWrapper = card.querySelector('.img-wrapper');
        const img = card.querySelector('.villa-img');
        const textContent = card.querySelector('.text-content');
        const overlay = card.querySelector('.darken-overlay');

        // Using % instead of vw/vh prevents scrollbar width calculation bugs
        const restingState = isDesktop
          ? { width: "50%", height: "75%", top: "12.5%", right: "6%", borderRadius: "24px" }
          : { width: "90%", height: "45%", top: "50%", right: "5%", borderRadius: "16px" };
        
        const fullState = { width: "100%", height: "100%", top: "0%", right: "0%", borderRadius: "0px" };

        // --- 1. INCOMING TRANSITION (Applies to all cards) ---
        // For Card 1: Triggers as the section scrolls into view (Start of page animation)
        // For Cards 2-4: Triggers as they slide up over the previous card
        gsap.fromTo(imgWrapper, 
          fullState,
          {
            ...restingState,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom", // Starts when this card appears at the bottom
              end: "top top",      // Ends when this card locks at the top
              scrub: true,
            }
          }
        );

        gsap.fromTo(img, 
          { scale: 1.5 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true }
          }
        );

        gsap.fromTo(textContent, 
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true }
          }
        );

        // --- 2. OUTGOING TRANSITION ---
        if (index !== cardsRef.current.length - 1) {
          
          // FOR CARDS 1, 2, 3: Expand when the NEXT card slides up
          const nextCard = cardsRef.current[index + 1];

          gsap.fromTo(imgWrapper, 
            restingState,
            {
              ...fullState,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,   // Driven by the next card's position
                start: "top bottom",
                end: "top top",
                scrub: true,
              }
            }
          );

          gsap.fromTo(img, 
            { scale: 1 },
            {
              scale: 1.5,
              ease: "none",
              scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top top", scrub: true }
            }
          );

          gsap.fromTo(overlay, 
            { opacity: 0 },
            {
              opacity: 0.6,
              ease: "none",
              scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top top", scrub: true }
            }
          );

          gsap.fromTo(textContent, 
            { opacity: 1, x: 0 },
            {
              opacity: 0, x: -50,
              ease: "none",
              scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top top", scrub: true }
            }
          );

        } else {
          
          // FOR THE FINAL CARD: Expands to full screen to act as the "End of Page" transition
          gsap.fromTo(imgWrapper, 
            restingState,
            {
              ...fullState,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top top",  // Starts exactly when it locks into place
                end: "bottom top", // Animates during the extra scroll space provided by the spacer below
                scrub: true,
              }
            }
          );

          gsap.fromTo(img, 
            { scale: 1 },
            {
              scale: 1.5,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: true }
            }
          );

          gsap.fromTo(overlay, 
            { opacity: 0 },
            {
              opacity: 0.4, // Slightly lighter fade so it acts as a beautiful bridge to the next section
              ease: "none",
              scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: true }
            }
          );

          gsap.fromTo(textContent, 
            { opacity: 1, x: 0 },
            {
              opacity: 0, x: -50,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: true }
            }
          );
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="camps" className="relative w-full">
      {villasData.map((villa, index) => (
        <div 
          key={villa.id}
          ref={el => cardsRef.current[index] = el}
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
          style={{ 
            backgroundColor: villa.bg,
            color: villa.text,
            zIndex: index 
          }}
        >
          
          {/* Architectural Grid Background */}
          <div className="absolute inset-0 z-30 pointer-events-none opacity-10">
            <div className="absolute top-0 bottom-0 left-1/4 w-[1px]" style={{ backgroundColor: villa.text }} />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px]" style={{ backgroundColor: villa.text }} />
            <div className="absolute top-0 bottom-0 left-3/4 w-[1px]" style={{ backgroundColor: villa.text }} />
            <div className="absolute left-0 right-0 top-1/2 h-[1px]" style={{ backgroundColor: villa.text }} />
          </div>

          <div className="relative w-full h-full">
            
            <div className="text-content absolute left-0 top-0 w-full lg:w-[40%] h-[50%] lg:h-full flex flex-col justify-center z-20 px-6 md:px-12 lg:px-24">
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm uppercase tracking-[0.3em] font-bold opacity-60">
                  Accommodation
                </span>
                <div className="h-[1px] flex-1 opacity-20" style={{ backgroundColor: villa.text }} />
                <span className="text-xl font-bold tracking-widest opacity-40">
                  {villa.id}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-extrabold tracking-tighter leading-none mb-6">
                {villa.title}
              </h2>
              
              <h3 className="text-2xl md:text-3xl font-serif italic opacity-80 mb-8">
                {villa.subtitle}
              </h3>
              
              <p className="text-base md:text-lg opacity-70 leading-relaxed max-w-md mb-10">
                {villa.desc}
              </p>

              <div>
                <button 
                  className="group relative px-8 py-4 overflow-hidden rounded-full font-bold text-xs tracking-widest uppercase transition-transform hover:scale-105"
                  style={{ 
                    backgroundColor: villa.text, 
                    color: villa.bg 
                  }}
                >
                  <span className="relative z-10">View Details</span>
                  <div 
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" 
                    style={{ 
                      backgroundColor: villa.bg === '#F5F2EB' ? '#2A4A3C' : '#F5F2EB',
                      opacity: 0.2
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="img-wrapper absolute z-10 overflow-hidden shadow-2xl bg-black will-change-transform transform-gpu">
              <img 
                src={villa.img} 
                alt={villa.title} 
                className="villa-img absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu"
              />
              <div className="darken-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
            </div>

          </div>
        </div>
      ))}
      
      {/* 
        This invisible spacer gives the browser exactly 100vh of extra scrolling room 
        at the end of the section. It guarantees the final card has enough scrolling 
        space to perfectly execute its outgoing full-screen expansion animation 
        while remaining pinned.
      */}
      <div className="w-full h-screen pointer-events-none" />
    </section>
  );
}