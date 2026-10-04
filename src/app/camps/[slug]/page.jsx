'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Thermometer, Wifi, Coffee, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock Data for a specific camp
const campData = {
  title: 'Whichaway Camp',
  gps: '70° 45′ 51″ S, 11° 39′ 1″ E',
  desc: 'Set on the shores of an ancient freshwater lake and surrounded by a towering ice cliff, Whichaway is our flagship camp. It offers the perfect blend of cutting-edge aerospace design and old-world explorer luxury.',
  amenities: [
    { icon: Thermometer, label: 'Climate Controlled', desc: 'Maintained at a comfortable 20°C (68°F)' },
    { icon: Coffee, label: 'Gourmet Dining', desc: 'Multi-course meals by private chefs' },
    { icon: Wifi, label: 'Satellite Comms', desc: 'Basic connectivity to the outside world' },
    { icon: Wind, label: 'Sauna Pod', desc: 'Overlooking the frozen glacial lake' },
    { icon: Compass, label: 'Guided Exploration', desc: 'Expert polar guides on staff' }
  ],
  gallery: [
    { id: 1, title: 'Exterior Pods' },
    { id: 2, title: 'Dining Room' },
    { id: 3, title: 'Sauna View' },
    { id: 4, title: 'Lounge Area' },
    { id: 5, title: 'Guest Suite' },
  ],
  relatedItineraries: [
    { id: 1, title: 'Emperor Penguin Quest', duration: '8 Days', price: '$14,500' },
    { id: 2, title: 'South Pole Expedition', duration: '10 Days', price: '$55,000' }
  ]
};

export default function CampDetail({ params }) {
  // Logic for Framer Motion Drag Constraints
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    // Recalculate on window resize
    const handleResize = () => {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-snow text-charcoal pb-32">
      
      {/* 1. Cinematic Hero */}
      <section className="relative w-full h-[75vh] bg-polar overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12">
        <div 
          className="absolute inset-0 w-full h-full opacity-70 mix-blend-luminosity"
          style={{
            background: 'radial-gradient(circle at center, #9DB8C9 0%, #0B1B26 100%)', // Placeholder
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-snow via-transparent to-transparent z-10" />
        
        <div className="relative z-20 max-w-5xl">
          <div className="font-mono text-sm tracking-[0.2em] mb-4 text-glacier flex items-center gap-4">
            <Compass size={16} />
            {campData.gps}
          </div>
          <h1 className="font-display text-6xl md:text-8xl tracking-display-tight text-polar leading-none">
            {campData.title}
          </h1>
        </div>
      </section>

      {/* 2. Intro & Description */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-12 md:pt-0 text-center mb-32">
        <p className="text-2xl md:text-4xl font-display text-polar leading-[1.4]">
          {campData.desc}
        </p>
      </section>

      {/* 3. Amenities Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <h3 className="font-display text-4xl mb-12 text-polar">Camp Amenities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {campData.amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col gap-4 p-8 bg-ice rounded-sm group hover:bg-polar hover:text-snow transition-colors duration-500">
                <div className="w-12 h-12 rounded-full border border-charcoal/20 group-hover:border-snow/30 flex items-center justify-center text-glacier transition-colors duration-500">
                  <Icon strokeWidth={1.5} size={24} />
                </div>
                <div>
                  <h4 className="font-display text-2xl mb-2">{item.label}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Draggable Image Carousel */}
      <section className="w-full mb-32 overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex justify-between items-end max-w-7xl mx-auto">
          <h3 className="font-display text-4xl text-polar">The Encampment</h3>
          <span className="text-[11px] uppercase tracking-label font-medium text-charcoal/50 hidden md:block">
            Drag to explore
          </span>
        </div>
        
        {/* Carousel Container */}
        <div ref={carouselRef} className="w-full cursor-grab active:cursor-grabbing pl-6 md:pl-12">
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            dragElastic={0.15} // Adds a nice resistance at the edges
            className="flex gap-6 w-max pr-6 md:pr-12"
          >
            {campData.gallery.map((img) => (
              <div 
                key={img.id} 
                className="relative w-[75vw] md:w-[600px] aspect-[4/3] bg-polar rounded-sm overflow-hidden flex-shrink-0 pointer-events-none"
              >
                {/* Placeholder gradient for image */}
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{ background: 'linear-gradient(135deg, #1A1F24, #9DB8C9)' }}
                />
                <div className="absolute bottom-6 left-6 text-[11px] uppercase tracking-label font-medium text-snow bg-polar/50 backdrop-blur-md px-3 py-1 rounded-full">
                  {img.title}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Related Itineraries */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-charcoal/10">
        <h3 className="font-display text-4xl mb-12 text-polar">Featured in</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campData.relatedItineraries.map(trip => (
            <Link 
              key={trip.id} 
              href={`/itineraries/trip-${trip.id}`}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 border border-charcoal/20 hover:border-polar rounded-sm transition-colors duration-500"
            >
              <div>
                <span className="text-[11px] uppercase tracking-label text-glacier block mb-2">{trip.duration}</span>
                <h4 className="font-display text-3xl text-polar">{trip.title}</h4>
              </div>
              <div className="flex items-center gap-6 mt-6 md:mt-0">
                <span className="font-display text-2xl text-charcoal/60 group-hover:text-polar transition-colors">{trip.price}</span>
                <div className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-polar group-hover:text-snow transition-all duration-500">
                  <ArrowRight size={16} strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}