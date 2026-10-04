'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: '01',
    title: 'Lakeside Living.',
    desc: 'Discover a private oasis at the edge of Lake Babogaya, with personal decks and panoramic vistas.',
    img: '/media/l10.png', 
  },
  {
    id: '02',
    title: 'Gourmet Dining.',
    desc: 'A tailored culinary journey from local ingredients and global techniques.',
    img: '/media/l2.png', 
  },
  {
    id: '03',
    title: 'Holistic Wellness.',
    desc: 'Inspired by ancient Ethiopian traditions, offering serene treatments and meditation.',
    img: '/media/l9.png', 
  },
  {
    id: '04',
    title: 'Your Private Vistas.',
    desc: 'A retreat features a plush king bed and expansive lake vistas from a private sanctuary.',
    img: '/media/l12.png', 
  },
  {
    id: '05',
    title: 'Fine Wines & Spirits.',
    desc: 'Explore our curated collection of fine international and Ethiopian wines and cocktails.',
    img: '/media/l8.png', 
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useGSAP(() => {
    const getScrollAmount = () => {
      let scrollWidth = scrollContainerRef.current.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainerRef.current, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`, 
      pin: true,
      animation: tween,
      scrub: 1, 
      invalidateOnRefresh: true, 
    });

  }, { scope: sectionRef });

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      // Changed to Dark Forest Green to match your reference
      className="relative w-full h-screen bg-[#1A2E25] text-[#F5F2EB] overflow-hidden flex items-center"
    >
      
      {/* Subtle Background aesthetic grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-[#F5F2EB]" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#F5F2EB]" />
      </div>

      {/* Sideways Section Title */}
      <div className="absolute top-1/2 left-6 md:left-12 z-20 -translate-y-1/2 -rotate-90 origin-left opacity-70 hidden md:block">
        <span className="text-sm tracking-[0.3em] font-medium whitespace-nowrap">
          Experience Grid
        </span>
      </div>

      {/* The Horizontal Scrolling Container */}
      <div 
        ref={scrollContainerRef} 
        className="relative z-10 flex h-full items-center px-[10vw] md:px-[15vw] gap-[5vw] whitespace-nowrap"
      >
        
        {/* Intro Text for the section before the cards start */}
        {/* Increased width and added massive pr-24 / pr-32 buffer to prevent the card overlap */}
        <div className="w-[90vw] md:w-[50vw] lg:w-[45vw] flex-shrink-0 flex flex-col justify-center whitespace-normal pr-16 md:pr-24 lg:pr-32">
          
          <img 
            src="/media/babogayalogo.png" 
            alt="Babogaya Resort Logo" 
            className="w-24 md:w-32 object-contain mb-6 md:mb-8 filter brightness-0 invert opacity-90"
          />
          
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold tracking-tighter leading-none mb-4 md:mb-6">
            BABOGAYA
          </h2>
          
          <p className="text-2xl md:text-4xl font-serif opacity-90 leading-relaxed mb-4">
            The Premier Retreat
          </p>
          <p className="text-base md:text-xl opacity-60 leading-relaxed max-w-xl">
            A harmonious bridge between architecture and untouched nature in the premier crater lake retreat, creating curated experiences for total immersion.
          </p>
        </div>

        {/* The 5 Experience Cards */}
        {experiences.map((item, index) => (
          <div 
            key={index} 
            className="w-[85vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 flex flex-col bg-white text-gray-900 rounded-2xl p-5 md:p-6 shadow-2xl group whitespace-normal"
          >
            
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 md:mb-6">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Card Content */}
            <div className="px-2 pb-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

          </div>
        ))}

        {/* Empty space at the end */}
        <div className="w-[10vw] flex-shrink-0" />

      </div>
    </section>
  );
}
