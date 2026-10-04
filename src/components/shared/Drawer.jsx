'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

const steps = [
  "Consultation",
  "Confirmation",
  "Planning",
  "On-boarding",
  "Safety briefing",
  "Departure"
];

export default function Drawer({ isOpen, setIsOpen }) {
  // Lock scroll and close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Dark Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-polar/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="relative w-full max-w-md h-full bg-snow text-charcoal flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 border-b border-charcoal/10">
              <span className="font-display text-2xl uppercase tracking-widest text-polar">The Process</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-polar/5 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Staggered List */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-8">
                {steps.map((step, i) => (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                    className="flex items-start gap-6 group"
                  >
                    <span className="font-mono text-xs tracking-widest text-glacier mt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-3xl text-polar transition-colors group-hover:text-glacier">
                        {step}
                      </h4>
                      <p className="text-sm text-charcoal/60 mt-2 leading-relaxed">
                        Curated preparation to ensure every detail is aligned with your expectations before embarking on the expedition.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}