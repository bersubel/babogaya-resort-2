'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Play } from 'lucide-react';
import VideoModal from '../global/VideoModal';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Journey() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const carRef = useRef(null);
  
  const startLabelRef = useRef(null);
  const endLabelRef = useRef(null);
  const startImgRef = useRef(null); // Ref for Addis Ababa pop-up
  const endImgRef = useRef(null);   // Ref for Babogaya pop-up
  
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const mapRef = useRef(null);

  const timeRef = useRef(null);
  const distRef = useRef(null);
  const tempRef = useRef(null);

  useGSAP(() => {
    // 1. Setup the SVG path length
    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { 
      strokeDasharray: pathLength, 
      strokeDashoffset: pathLength 
    });

    // 2. Initial states
    gsap.set(carRef.current, { opacity: 0 });
    gsap.set([startLabelRef.current, endLabelRef.current, statsRef.current, ctaRef.current], { opacity: 0, y: 20 });
    gsap.set(mapRef.current, { opacity: 0, y: 60, rotationX: 15, transformPerspective: 1000 });
    
    // Hide the pop-up images initially by scaling them to 0
    gsap.set([startImgRef.current, endImgRef.current], { scale: 0 });

    // 3. The Master Pinned Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // Pins the section for 4x the screen height
        pin: true,
        scrub: 1,
      }
    });

    // Phase 1: Giant Title fades out
    tl.to(".journey-char", { 
      letterSpacing: '0.4em', 
      opacity: 0, 
      stagger: 0.03, 
      duration: 1 
    }, 0);

    // Phase 2: Show start label, pop up Addis image, and reveal car
    tl.to(startLabelRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1);
    tl.to(startImgRef.current, { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 1.2); // Bouncy pop-up
    tl.to(carRef.current, { opacity: 1, duration: 0.2 }, 1);

    // Phase 3: Draw path and move car VERTICALLY
    tl.to(pathRef.current, { 
      strokeDashoffset: 0, 
      duration: 4, 
      ease: "power1.inOut" 
    }, 1.5);
    
    tl.to(carRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: 90 
      },
      duration: 4,
      ease: "power1.inOut"
    }, 1.5);

    // Phase 4: Arrive at destination & Pop up Babogaya image
    tl.to(endLabelRef.current, { opacity: 1, y: 0, duration: 0.5 }, 5);
    tl.to(endImgRef.current, { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 5.2); // Bouncy pop-up

    // The "Great Animation" for the map picture
    tl.to(mapRef.current, { 
      opacity: 1, 
      y: 0, 
      rotationX: 0, 
      duration: 1.5, 
      ease: "power3.out" 
    }, 5.2);

    // Phase 5: Stats rise and count up
    tl.to(statsRef.current, { opacity: 1, y: 0, duration: 1 }, 5.5);
    tl.to(timeRef.current, { textContent: 1.4, snap: { textContent: 0.1 }, duration: 2, ease: "power1.out" }, 5.5);
    tl.to(distRef.current, { textContent: 54.6, snap: { textContent: 0.1 }, duration: 2, ease: "power1.out" }, 5.5);
    tl.to(tempRef.current, { textContent: 24, snap: { textContent: 1 }, duration: 2, ease: "power1.out" }, 5.5);

    // Phase 6: Reveal the CTA button
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, 6);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1A2E25] overflow-hidden flex items-center justify-center font-sans">
      
      {/* 1. Architectural Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#F5F2EB]" />
      </div>

      {/* 2. SVG Vertical Journey Path Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
        <svg 
          ref={svgRef}
          viewBox="0 0 600 1000" 
          className="w-full h-[90%] max-h-screen overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Vertical animated path */}
          <path 
            ref={pathRef}
            d="M 300 50 Q 150 500, 300 950" 
            fill="none" 
            stroke="#5EEAD4" 
            strokeWidth="3" 
            strokeDasharray="10 10"
            className="opacity-70"
          />
          
          {/* Large Car Icon */}
          <g ref={carRef}>
            <svg x="-18" y="-36" width="36" height="72" viewBox="0 0 24 48" fill="none" stroke="#5EEAD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="40" rx="4" fill="#F5F2EB" />
              <path d="M 6 16 L 18 16 L 16 12 L 8 12 Z" fill="#1A2E25" opacity="0.8" />
              <path d="M 6 36 L 18 36 L 16 40 L 8 40 Z" fill="#1A2E25" opacity="0.8" />
              <line x1="6" y1="4" x2="8" y2="4" strokeWidth="3" stroke="#5EEAD4" />
              <line x1="16" y1="4" x2="18" y2="4" strokeWidth="3" stroke="#5EEAD4" />
            </svg>
            <circle cx="0" cy="0" r="6" fill="#5EEAD4" className="animate-pulse opacity-60" />
          </g>
        </svg>

        {/* Start Label & Image (Addis Ababa) */}
        <div ref={startLabelRef} className="absolute top-[8%] md:top-[6%] flex flex-col items-center drop-shadow-xl">
          <div 
            ref={startImgRef} 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#5EEAD4]/50 shadow-[0_0_15px_rgba(94,234,212,0.2)] overflow-hidden mb-3 will-change-transform"
          >
            <img src="/media/addis.png" alt="Addis Ababa" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] md:text-[12px] italic tracking-wider font-serif text-[#F5F2EB]/60 mb-1">
            Starting point
          </span>
          <span className="font-sans text-sm md:text-lg font-bold tracking-[0.2em] uppercase text-[#F5F2EB]">
            ADDIS ABABA
          </span>
        </div>

        {/* End Label & Image (Babogaya Resort) */}
        <div ref={endLabelRef} className="absolute bottom-[10%] md:bottom-[8%] flex flex-col items-center drop-shadow-xl">
          <div 
            ref={endImgRef} 
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#5EEAD4] shadow-[0_0_20px_rgba(94,234,212,0.4)] overflow-hidden mb-3 will-change-transform"
          >
            <img src="/media/l1.PNG" alt="Babogaya Resort" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] md:text-[12px] italic tracking-wider font-serif text-[#F5F2EB]/60 mb-1">
            Destination
          </span>
          <span className="font-sans text-sm md:text-lg font-bold tracking-[0.2em] uppercase text-[#5EEAD4]">
            BABOGAYA RESORT
          </span>
        </div>
      </div>

      {/* 3. The Giant Title */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        <h2 ref={titleRef} className="relative font-sans font-bold text-[clamp(1.5rem,4vw,4rem)] text-[#F5F2EB] text-center tracking-tighter drop-shadow-2xl flex flex-wrap justify-center max-w-5xl">
          {['A','D','D','I','S',' ','A','B','A','B','A',' ','T','O',' ','B','A','B','O','G','A','Y','A'].map((char, i) => (
            <span key={i} className="journey-char inline-block whitespace-pre">{char}</span>
          ))}
        </h2>
      </div>

      {/* 4. Stats Overlay */}
      <div ref={statsRef} className="absolute bottom-12 left-6 right-6 md:left-12 flex justify-between md:justify-start md:gap-24 text-[#F5F2EB] z-30 pointer-events-none">
        <div className="flex flex-col">
          <div className="font-sans font-bold text-3xl md:text-5xl"><span ref={timeRef}>0</span> hr</div>
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#F5F2EB]/60 mt-2">Drive Time</div>
        </div>
        <div className="flex flex-col">
          <div className="font-sans font-bold text-3xl md:text-5xl"><span ref={distRef}>0</span> km</div>
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#F5F2EB]/60 mt-2">Distance</div>
        </div>
      </div>

      {/* 5. Animated Map Image (Positioned above the button) */}
      <div 
        ref={mapRef} 
        className="absolute bottom-32 right-6 md:right-12 z-20 w-48 md:w-80 aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#F5F2EB]/20"
      >
        <img 
          src="/media/map.png" 
          alt="Route Map from Addis Ababa to Babogaya" 
          className="w-full h-full object-cover opacity-80 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E25] via-transparent to-transparent opacity-60" />
      </div>

      {/* 6. Video Modal Thumbnail CTA */}
      <div ref={ctaRef} className="absolute bottom-12 right-6 md:right-12 z-30">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-4 hover:opacity-80 transition-opacity bg-[#F5F2EB]/10 backdrop-blur-md p-2 pr-6 rounded-full border border-[#F5F2EB]/20 shadow-2xl"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#5EEAD4] text-[#1A2E25] transition-transform duration-500 group-hover:scale-105">
            <Play size={16} fill="currentColor" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5F2EB]">
            The Journey
          </span>
        </button>
      </div>

      <VideoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
}