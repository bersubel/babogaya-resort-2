'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Experience', href: '/experience' },
  { title: 'Operation', href: '/operation' },
  { title: 'About', href: '/about' },
];

export default function MenuOverlay({ isOpen, setIsOpen }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Lock scroll and trap focus when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] bg-polar text-snow flex flex-col justify-between p-6 md:p-12"
        >
          {/* Top Bar inside Menu */}
          <div className="flex justify-between items-center">
            <span className="font-display text-2xl uppercase tracking-widest">Polar</span>
            <motion.button 
              onClick={() => setIsOpen(false)}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="p-2 hover:opacity-60 transition-opacity"
            >
              <X size={32} strokeWidth={1} />
            </motion.button>
          </div>

          {/* Staggered Serif Links */}
          <nav className="flex flex-col items-center justify-center gap-4 flex-1">
            {menuItems.map((item, i) => (
              <div key={item.title} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%', transition: { delay: 0 } }} // Fast exit
                  transition={{ delay: 0.2 + (i * 0.08), duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative block font-display text-6xl md:text-8xl tracking-display-tight transition-opacity duration-500"
                    style={{ opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1 }}
                  >
                    {item.title}
                    {/* Hover Underline */}
                    <span className="absolute left-0 bottom-2 w-0 h-[2px] bg-snow transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>

          {/* Bottom Action Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-between items-center text-[11px] uppercase tracking-label font-medium border-t border-snow/20 pt-6"
          >
            <Link href="/rates" className="hover:opacity-60 transition-opacity">Dates & Prices</Link>
            <Link href="/enquire" className="hover:opacity-60 transition-opacity">Enquire Now</Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}