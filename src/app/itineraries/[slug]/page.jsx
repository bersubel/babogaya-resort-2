'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Mock Data for a specific itinerary
const tripData = {
  title: 'Emperor Penguin Quest',
  price: '$14,500',
  duration: '8 Days',
  season: 'Early Season (Nov)',
  level: 'Moderate',
  desc: 'Venture deep into the Weddell Sea. This pristine, frozen wilderness is the only place on Earth where you can witness the majestic emperor penguins nurturing their newly hatched chicks on the sea ice.',
  days: [
    { day: '01', title: 'Arrival in Cape Town', desc: 'Settle into your luxury hotel at the V&A Waterfront. In the evening, join our expedition team for a comprehensive safety briefing and gear check.' },
    { day: '02', title: 'The Ice Flight', desc: 'Board our private Gulfstream jet for a 5-hour flight across the Southern Ocean. We land on the spectacular Wolf’s Fang blue ice runway.' },
    { day: '03', title: 'Into the Weddell Sea', desc: 'Transfer by DC-3 Basler aircraft to our remote field camp on the sea ice. Spend the afternoon taking your first walk among the emperor penguins.' },
    { day: '04-06', title: 'Among the Emperors', desc: 'Three full days immersed in the colony. Photograph the adults feeding their chicks, listen to their unique calls, and experience the profound silence of the Antarctic continent.' },
    { day: '07', title: 'Return to Whichaway', desc: 'Fly back to our flagship Whichaway Camp. Celebrate your expedition with a multi-course gourmet dinner prepared by our private chef.' },
    { day: '08', title: 'Return to Africa', desc: 'Board the Gulfstream for the return flight to Cape Town, carrying memories that will last a lifetime.' }
  ],
  gallery: [
    '/media/gallery-1.jpg', // Placeholders, we'll use CSS colors as fallbacks
    '/media/gallery-2.jpg',
    '/media/gallery-3.jpg',
    '/media/gallery-4.jpg'
  ]
};

export default function ItineraryDetail({ params }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const daysRef = useRef([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useGSAP(() => {
    // 1. Draw the vertical timeline line as you scroll down the container
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // 2. Fade in each day's content as it crosses the viewport threshold
    daysRef.current.forEach((day, i) => {
      gsap.fromTo(
        day,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: day,
            start: "top 80%",
          }
        }
      );
    });
  }, { scope: containerRef });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % tripData.gallery.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + tripData.gallery.length) % tripData.gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <main ref={containerRef} className="min-h-screen bg-snow text-charcoal pb-24">
      
      {/* 1. Cinematic Hero */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-polar overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-60"
          style={{
            background: 'linear-gradient(to bottom, #9DB8C9 0%, #0B1B26 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-snow via-transparent to-transparent z-10" />
        
        <div className="absolute bottom-16 left-6 md:left-12 z-20 text-snow">
          <span className="text-[11px] uppercase tracking-label font-medium text-glacier block mb-4">
            {tripData.season}
          </span>
          <h1 className="font-display text-5xl md:text-8xl tracking-display-tight max-w-4xl leading-[1.1]">
            {tripData.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sticky Sidebar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Description & Timeline */}
        <div className="flex-1">
          <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed mb-24 font-display">
            {tripData.desc}
          </p>

          <h3 className="font-display text-4xl mb-12 text-polar">Itinerary</h3>
          
          {/* Day-by-Day Timeline Container */}
          <div ref={timelineRef} className="relative pl-8 md:pl-12">
            {/* The Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-charcoal/10" />
            <div 
              ref={lineRef} 
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-polar origin-top" 
            />

            {/* The Days */}
            <div className="flex flex-col gap-16">
              {tripData.days.map((day, i) => (
                <div 
                  key={i} 
                  ref={(el) => daysRef.current[i] = el}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 rounded-full bg-snow border-2 border-polar" />
                  
                  <span className="text-[10px] uppercase tracking-label font-medium text-glacier block mb-2">
                    Day {day.day}
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl text-polar mb-4">
                    {day.title}
                  </h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    {day.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:w-80 relative order-first lg:order-last mb-12 lg:mb-0">
          <div className="sticky top-32 bg-ice p-8 rounded-sm shadow-xl flex flex-col gap-6">
            <div>
              <span className="block text-[10px] uppercase tracking-label text-charcoal/50 mb-1">From</span>
              <span className="font-display text-4xl text-polar">{tripData.price}</span>
            </div>
            
            <div className="border-t border-polar/10 pt-4 flex justify-between text-sm">
              <span className="uppercase tracking-label text-[10px] text-charcoal/60">Duration</span>
              <span className="font-medium">{tripData.duration}</span>
            </div>
            <div className="border-t border-polar/10 pt-4 flex justify-between text-sm">
              <span className="uppercase tracking-label text-[10px] text-charcoal/60">Activity Level</span>
              <span className="font-medium">{tripData.level}</span>
            </div>
            
            <Link 
              href="/enquire"
              className="mt-4 flex items-center justify-between w-full text-[11px] uppercase tracking-label font-medium text-snow bg-polar px-6 py-4 rounded-sm hover:bg-charcoal transition-colors"
            >
              Enquire Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Image Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <h3 className="font-display text-4xl mb-12 text-polar">Expedition Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripData.gallery.map((img, i) => (
            <div 
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-video bg-charcoal/10 cursor-pointer overflow-hidden group rounded-sm"
            >
              <div 
                className="absolute inset-0 transition-transform duration-700 ease-cinematic group-hover:scale-105"
                style={{ background: 'linear-gradient(to right, #9DB8C9, #EAF1F5)' }} // Placeholder
              />
              <div className="absolute inset-0 bg-polar/0 group-hover:bg-polar/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-polar/95 backdrop-blur-md"
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-8 right-8 text-snow hover:opacity-60 transition-opacity">
              <X size={32} strokeWidth={1} />
            </button>
            
            <div className="relative w-full max-w-6xl aspect-video mx-6">
              <div className="w-full h-full bg-snow/10 rounded-sm" style={{ background: 'linear-gradient(to right, #9DB8C9, #EAF1F5)' }} />
              
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + tripData.gallery.length) % tripData.gallery.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-snow/10 hover:bg-snow/20 flex items-center justify-center text-snow transition-colors backdrop-blur-md"
              >
                <ChevronLeft />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % tripData.gallery.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-snow/10 hover:bg-snow/20 flex items-center justify-center text-snow transition-colors backdrop-blur-md"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}