'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 2 and 4 are swapped as requested, and the requested static images are assigned to each.
const tripsData = [
  {
    id: '01',
    title: 'Crater Safari.',
    subtitle: 'Lake Babogaya',
    desc: 'Glide across the glassy surface of the crater lake at dawn. Experience the rich birdlife and untouched shorelines from the comfort of our silent electric boats.',
    img: '/media/l10.png', 
  },
  {
    id: '02',
    title: 'Canopy Dining.', 
    subtitle: 'Private Excursion',
    desc: 'A secluded trek into the surrounding forest culminating in a private, chef-prepared feast suspended in the ancient tree canopy overlooking the water.',
    img: '/media/l3.png',
  },
  {
    id: '03',
    title: 'Bishoftu Roots.',
    subtitle: 'Cultural Immersion',
    desc: 'Step beyond the resort and into the heart of Oromia. Participate in traditional coffee ceremonies and explore the vibrant local markets of Bishoftu.',
    img: '/media/l13.png',
  },
  {
    id: '04',
    title: 'Mount Yerer.', 
    subtitle: 'Guided Hike',
    desc: 'Ascend the dormant volcano of Mount Yerer. A tailored expedition through lush forests, ancient monolithic churches, and panoramic views of the Great Rift Valley.',
    img: '/media/l14.png',
  }
];

export default function Trips() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  
  const triggerBlocksRef = useRef([]);
  const textBlocksRef = useRef([]);
  const imagesRef = useRef([]);

  useGSAP(() => {
    // 1. Pin the Full-Page Background Video
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: bgRef.current,
      pinSpacing: false,
    });

    // 2. Pin the Left Column (Image Window)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false,
    });

    // 3. High-End Depth-of-Field Rolodex Animation
    triggerBlocksRef.current.forEach((triggerBlock, i) => {
      ScrollTrigger.create({
        trigger: triggerBlock,
        start: "top center", 
        end: "bottom center",
        onEnter: () => setActiveItem(i),
        onEnterBack: () => setActiveItem(i),
      });
    });

    function setActiveItem(index) {
      // Crossfade the left column static images
      imagesRef.current.forEach((img, i) => {
        gsap.to(img, {
          opacity: i === index ? 1 : 0,
          scale: i === index ? 1 : 1.15, 
          duration: 1.2,
          ease: "power3.inOut",
          overwrite: "auto"
        });
      });
      
      // Rolodex Text Blur/Skew effect
      textBlocksRef.current.forEach((block, i) => {
        if (i === index) {
          gsap.to(block, {
            opacity: 1,
            x: 40,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto"
          });
        } else {
          gsap.to(block, {
            opacity: 0.15,
            x: 0,
            scale: 0.9,
            filter: "blur(8px)", 
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section 
      id="trips" 
      ref={sectionRef} 
      className="relative w-full text-[#F5F2EB] flex flex-col md:flex-row overflow-hidden bg-black"
    >
      
      {/* --- PINNED FULL PAGE BACKGROUND VIDEO & GRADIENT --- */}
      <div ref={bgRef} className="absolute top-0 left-0 w-full h-screen z-0">
        
        {/* Replace this src with your desired background video file */}
        <video 
          src="/media/babugayahero.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Heavy Gradient Overlay - Ensures the white text on the right side is highly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1821]/90 via-[#1A2E25]/80 to-[#1A2E25]/40" />

        {/* Ambient Architectural Grid (Now using white lines with low opacity to stand out on dark bg) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div className="w-[1px] h-full bg-[#F5F2EB] absolute left-1/4" />
          <div className="w-[1px] h-full bg-[#F5F2EB] absolute left-1/2" />
          <div className="w-[1px] h-full bg-[#F5F2EB] absolute left-3/4" />
          <div className="w-full h-[1px] bg-[#F5F2EB] absolute top-[25vh]" />
          <div className="w-full h-[1px] bg-[#F5F2EB] absolute top-[75vh]" />
        </div>
      </div>

      {/* --- LEFT COLUMN: Sticky Image Window --- */}
      <div 
        ref={leftColRef}
        className="hidden md:flex w-1/2 h-screen relative items-center justify-center p-12 lg:p-24 z-10"
      >
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0D1821]/50 backdrop-blur-sm">
          {tripsData.map((trip, i) => (
            <img
              key={trip.id}
              ref={el => imagesRef.current[i] = el}
              src={trip.img}
              alt={trip.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }} 
            />
          ))}
          <div className="absolute inset-0 ring-1 ring-inset ring-[#F5F2EB]/20 rounded-[2rem] pointer-events-none" />
        </div>
      </div>

      {/* --- RIGHT COLUMN: The Rolodex Scroll --- */}
      <div 
        ref={rightColRef}
        className="w-full md:w-1/2 flex flex-col z-10 pr-8 md:pr-24"
      >
        
        {/* Invisible spacer blocks */}
        {tripsData.map((trip, i) => (
          <div 
            key={trip.id}
            ref={el => triggerBlocksRef.current[i] = el}
            className="w-full h-screen flex flex-col justify-center"
          >
            {/* The actual animated content block */}
            <div 
              ref={el => textBlocksRef.current[i] = el}
              className="flex flex-col w-full opacity-0 will-change-transform origin-left"
            >
              
              {/* Mobile Fallback Image */}
              <div className="block md:hidden w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
                <img src={trip.img} alt={trip.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-6 mb-6">
                <span className="text-xl font-bold tracking-widest opacity-50">
                  {trip.id}
                </span>
                <div className="h-[1px] flex-1 bg-[#F5F2EB] opacity-30" />
              </div>
              
              <h3 className="text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tighter mb-4 leading-none drop-shadow-lg">
                {trip.title}
              </h3>
              
              <h4 className="text-3xl md:text-4xl font-serif italic opacity-90 mb-8 drop-shadow-md">
                {trip.subtitle}
              </h4>
              
              <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-md mb-10">
                {trip.desc}
              </p>

              <div>
                {/* Button updated to contrast against the dark background */}
                <button className="group relative px-10 py-5 bg-[#F5F2EB] text-[#1A2E25] overflow-hidden rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">
                  <span className="relative z-10 flex items-center gap-4">
                    Explore Details
                    <svg className="w-4 h-4 fill-current group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-[#E5E0D5] translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
              
            </div>
          </div>
        ))}
        
      </div>
      
    </section>
  );
}