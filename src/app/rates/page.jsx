'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Mock Data for Departures
const departures = [
  { id: 1, title: 'Emperor Penguin Quest', season: 'Early Season', dates: 'Nov 12 – Nov 19, 2026', duration: '8 Days', price: 14500, status: 'Limited', desc: 'Experience the magic of the Weddell Sea as emperor penguin chicks take their first steps on the sea ice.' },
  { id: 2, title: 'South Pole Expedition', season: 'Entire Season', dates: 'Dec 05 – Dec 14, 2026', duration: '10 Days', price: 55000, status: 'Available', desc: 'A bespoke overland and flight journey from the coastal ice shelves to the absolute bottom of the Earth.' },
  { id: 3, title: 'Antarctic Peninsula', season: 'Late Season', dates: 'Feb 10 – Feb 22, 2027', duration: '13 Days', price: 12000, status: 'Waitlist', desc: 'Navigate iceberg-choked channels at the peak of whale migration season.' },
  { id: 4, title: 'Into the Weddell Sea', season: 'Early Season', dates: 'Nov 22 – Dec 02, 2026', duration: '11 Days', price: 16500, status: 'Available', desc: 'Follow the historic path of Shackleton into the treacherous and beautiful pack ice.' },
  { id: 5, title: 'The Ross Ice Shelf', season: 'Entire Season', dates: 'Jan 15 – Jan 26, 2027', duration: '12 Days', price: 22000, status: 'Available', desc: 'Explore the largest ice shelf of Antarctica and step inside perfectly preserved historic explorer huts.' },
];

// GSAP Animated Price Component
const AnimatedPrice = ({ value }) => {
  const priceRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      priceRef.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power3.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: priceRef.current,
          start: "top 90%",
        },
        onUpdate: function() {
          // Add commas to the number while animating
          priceRef.current.innerText = '$' + Math.ceil(this.targets()[0].innerText).toLocaleString();
        }
      }
    );
  }, []);

  return <span ref={priceRef} className="font-display text-2xl md:text-3xl">$0</span>;
};

export default function RatesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filters = ['All', 'Early Season', 'Entire Season', 'Late Season'];

  const filteredDepartures = activeFilter === 'All' 
    ? departures 
    : departures.filter(d => d.season === activeFilter);

  const toggleRow = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-snow text-charcoal pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Content Area (Filters & Table) */}
        <div className="flex-1">
          <header className="mb-16">
            <h1 className="font-display text-5xl md:text-7xl text-polar tracking-display-tight mb-6">
              Dates & Prices
            </h1>
            <p className="text-sm text-charcoal/70 max-w-lg leading-relaxed">
              Explore our upcoming expeditions. Seasons dictate the shifting landscape—from the pristine pack ice of the early season to the spectacular whale migrations late in the summer.
            </p>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 border-b border-charcoal/10 pb-6">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setExpandedId(null); // Close any open rows when filtering
                }}
                className={`text-[11px] uppercase tracking-label font-medium px-4 py-2 rounded-full transition-colors ${
                  activeFilter === filter 
                    ? 'bg-polar text-snow' 
                    : 'bg-transparent text-charcoal/60 hover:text-polar border border-charcoal/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Accordion Table */}
          <div className="flex flex-col border-t border-charcoal/20">
            <AnimatePresence initial={false}>
              {filteredDepartures.map((trip) => {
                const isOpen = expandedId === trip.id;
                
                return (
                  <motion.div 
                    key={trip.id}
                    layout // Animates other rows smoothly when one opens
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-charcoal/10"
                  >
                    {/* Collapsed Row Header */}
                    <div 
                      onClick={() => toggleRow(trip.id)}
                      className="flex flex-col md:flex-row md:items-center justify-between py-6 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1">
                        <div className="w-48 text-[11px] uppercase tracking-label text-charcoal/60">
                          {trip.dates}
                        </div>
                        <h3 className="font-display text-2xl text-polar group-hover:text-glacier transition-colors">
                          {trip.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0">
                        <AnimatedPrice value={trip.price} />
                        <motion.div 
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                          className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/50 group-hover:border-polar group-hover:text-polar transition-colors"
                        >
                          <ChevronDown size={16} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded Content Area */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-4 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                            <p className="text-sm text-charcoal/80 leading-relaxed flex-1 max-w-xl">
                              {trip.desc}
                            </p>
                            
                            <div className="flex flex-col gap-4 min-w-[200px] bg-ice p-6 rounded-sm">
                              <div className="flex justify-between text-xs">
                                <span className="uppercase tracking-label text-charcoal/60">Duration</span>
                                <span className="font-medium">{trip.duration}</span>
                              </div>
                              <div className="flex justify-between text-xs border-t border-polar/10 pt-4">
                                <span className="uppercase tracking-label text-charcoal/60">Availability</span>
                                <span className={`font-medium ${trip.status === 'Waitlist' ? 'text-sand' : 'text-glacier'}`}>
                                  {trip.status}
                                </span>
                              </div>
                              <Link href="/enquire" className="mt-4 flex items-center justify-between w-full text-[11px] uppercase tracking-label font-medium text-snow bg-polar px-4 py-3 rounded-sm hover:bg-charcoal transition-colors">
                                Enquire Now
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar: Sticky Action Panel */}
        <div className="hidden lg:block w-80 relative">
          <div className="sticky top-32 p-8 bg-polar text-snow rounded-sm flex flex-col items-start shadow-2xl">
            <span className="text-[10px] uppercase tracking-label text-glacier mb-4">
              Secure your placement
            </span>
            <h4 className="font-display text-3xl tracking-display-tight mb-4">
              Ready to embark?
            </h4>
            <p className="text-sm text-snow/70 leading-relaxed mb-8">
              Due to environmental strictures, our guest capacity is extremely limited. Contact our expedition specialists to finalize your itinerary.
            </p>
            <Link 
              href="/enquire"
              className="w-full bg-snow text-polar text-center py-4 text-[11px] uppercase tracking-label font-medium hover:bg-ice transition-colors rounded-sm"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

      </div>
      
      {/* Mobile Sticky Button (Bottom Fixed) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-snow/90 backdrop-blur-md border-t border-charcoal/10 z-40">
        <Link 
          href="/enquire"
          className="block w-full bg-polar text-snow text-center py-4 text-[11px] uppercase tracking-label font-medium rounded-sm shadow-xl"
        >
          Contact Our Team
        </Link>
      </div>

    </main>
  );
}