'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Drawer from '../shared/Drawer';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // 1. The Great Page Transition: Scale-and-Snap
    gsap.fromTo(sectionRef.current, 
      { 
        scale: 0.85, 
        borderRadius: "4rem" 
      },
      { 
        scale: 1, 
        borderRadius: "0px", 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts when the top of the CTA hits the bottom of the screen
          end: "top top",      // Ends when the CTA hits the top of the screen
          scrub: true,
        }
      }
    );

    // 2. Cinematic Text & Button Reveal
    const elements = gsap.utils.toArray('.cta-reveal');
    gsap.fromTo(elements, 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        }
      }
    );

  }, { scope: sectionRef });

  return (
    // Outer wrapper handles the background behind the shrinking effect
    <div className="w-full bg-[#0D1821] overflow-hidden">
      
      <section 
        ref={sectionRef} 
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1A2E25] will-change-transform transform-gpu origin-bottom"
      >
        
        {/* --- 1. Background Image (l5.png) --- */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/l5.png" 
            alt="Babogaya Resort Sanctuary" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Dark Forest Green overlay to ensure text readability and maintain luxury mood */}
          <div className="absolute inset-0 bg-[#1A2E25]/70 mix-blend-multiply" />
        </div>

        {/* --- 2. Architectural Grid Background --- */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
          <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#F5F2EB]" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F5F2EB]" />
          <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#F5F2EB]" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#F5F2EB]" />
        </div>

        {/* --- 3. Ambient Deep Gradient Overlay --- */}
        <div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(42, 74, 60, 0.4) 0%, rgba(26, 46, 37, 0.8) 100%)',
          }}
        />
        
        {/* --- 4. Content --- */}
        <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          
          <span className="cta-reveal block text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#F5F2EB]/80 mb-6">
            Your Sanctuary Awaits
          </span>

          <h2 className="cta-reveal font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-[#F5F2EB] tracking-tighter leading-[1.1] mb-12 drop-shadow-2xl">
            Reserve your <br /> <span className="font-serif italic font-normal text-[#5EEAD4]">escape.</span>
          </h2>
          
          <div className="cta-reveal flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Primary Button */}
            <Link 
              href="/enquire"
              className="group relative overflow-hidden px-10 py-5 bg-[#F5F2EB] text-[#1A2E25] rounded-full shadow-2xl transition-all duration-300 hover:shadow-black/50"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-500 group-hover:text-[#F5F2EB]">
                Book Your Stay
              </span>
              <div className="absolute inset-0 bg-[#2A4A3C] transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </Link>

            {/* Drawer Trigger */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="group flex items-center gap-4 text-[#F5F2EB] hover:opacity-80 transition-opacity"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold">
                Guest Privileges
              </span>
              <div className="w-12 h-12 rounded-full border border-[#F5F2EB]/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#F5F2EB]/20 bg-black/10 backdrop-blur-sm">
                <span className="font-serif italic text-xl leading-none">+</span>
              </div>
            </button>
            
          </div>
        </div>

        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </section>
    </div>
  );
}