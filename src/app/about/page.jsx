'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2010', title: 'The First Expedition', desc: 'A small team of explorers crosses the Dronning Maud Land ice shelf, laying the groundwork for what would become our flagship camp.' },
  { year: '2014', title: 'Whichaway Established', desc: 'We construct the first luxury eco-camp in the interior of Antarctica, completely powered by solar and wind.' },
  { year: '2018', title: 'Wolf\'s Fang Runway', desc: 'Our private blue-ice runway opens, allowing direct heavy-lift flights from Cape Town into the deep continent.' },
  { year: '2023', title: 'Echo Camp Launches', desc: 'Inspired by space exploration, our futuristic sky-pods are built to offer unprecedented views of the polar plateau.' }
];

const awards = ['Condé Nast', 'Travel + Leisure', 'NatGeo Explorer', 'B-Corp Certified', 'IAATO Member'];

export default function AboutPage() {
  const containerRef = useRef(null);
  const portraitsRef = useRef([]);
  const timelineLineRef = useRef(null);
  const milestoneRefs = useRef([]);

  useGSAP(() => {
    // 1. Slow Zoom on Portraits
    portraitsRef.current.forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    // 2. Timeline Vertical Line Draw
    gsap.fromTo(
      timelineLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineLineRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: true,
        }
      }
    );

    // 3. Milestone Stagger Reveal
    milestoneRefs.current.forEach((milestone) => {
      gsap.fromTo(
        milestone,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: milestone,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-snow text-charcoal pt-32 pb-24">
      
      {/* 1. Page Header */}
      <header className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-32">
        <h1 className="font-display text-5xl md:text-8xl text-polar tracking-display-tight mb-8">
          Beyond the Map
        </h1>
        <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed font-display">
          We are a collective of polar explorers, scientists, and logistics experts dedicated to sharing the transformative power of the Earth's most remote wilderness.
        </p>
      </header>

      {/* 2. Founders / Portraits Section */}
      <section className="w-full bg-polar text-snow py-24 md:py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left Column: Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm relative">
            <div 
              ref={(el) => portraitsRef.current[0] = el}
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(to top, #0B1B26, #9DB8C9)', // Placeholder
                // backgroundImage: 'url(/media/founder-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>

          {/* Right Column: Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-label font-medium text-glacier mb-4">
              Our Heritage
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-display-tight mb-8 leading-tight">
              Forged in the deep cold.
            </h2>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Before the luxury camps and private jets, our founders were breaking trail across the Dronning Maud Land ice shelf on foot. They learned the brutal, unforgiving nature of the continent firsthand.
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              That deep respect for the ice informs every decision we make today. We operate with a zero-impact philosophy, ensuring that the only things we leave behind are footprints that will soon be erased by the wind.
            </p>
            
            <div className="mt-12 flex items-center gap-6">
              {/* Secondary small portrait */}
              <div className="w-24 h-24 rounded-full overflow-hidden relative">
                <div 
                  ref={(el) => portraitsRef.current[1] = el}
                  className="absolute inset-0 w-full h-full"
                  style={{ background: '#EAF1F5' }} // Placeholder
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl">E. Shackleton</span>
                <span className="text-[10px] uppercase tracking-label text-glacier">Chief Explorer</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Milestone Timeline */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-32 relative">
        <h3 className="font-display text-4xl md:text-6xl text-polar text-center mb-24">The Journey</h3>
        
        <div className="relative pl-6 md:pl-0">
          {/* The centered/left vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-charcoal/10 md:-translate-x-1/2" />
          <div 
            ref={timelineLineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-polar origin-top md:-translate-x-1/2" 
          />

          {timeline.map((item, i) => (
            <div 
              key={item.year}
              ref={(el) => milestoneRefs.current[i] = el}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-24 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Center Dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-2 md:top-1/2 w-3 h-3 rounded-full bg-snow border-2 border-polar md:-translate-x-1/2 md:-translate-y-1/2 z-10" />

              {/* Year (Hidden on mobile for cleaner layout, integrated into title) */}
              <div className={`hidden md:block w-5/12 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <span className="font-display text-6xl text-glacier opacity-50">{item.year}</span>
              </div>

              {/* Content */}
              <div className="w-full md:w-5/12 pl-8 md:pl-0">
                <span className="md:hidden font-display text-4xl text-glacier opacity-80 block mb-2">{item.year}</span>
                <h4 className="font-display text-2xl text-polar mb-3">{item.title}</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Press & Awards Strip */}
      <section className="border-t border-b border-charcoal/10 py-16 bg-ice">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-label font-medium text-charcoal/50 mb-8 block text-center">
            Recognized By
          </span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            {awards.map((award, i) => (
              <div 
                key={i}
                className="font-display text-2xl md:text-3xl text-charcoal/30 hover:text-polar transition-colors duration-500 cursor-pointer text-center"
              >
                {award}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}