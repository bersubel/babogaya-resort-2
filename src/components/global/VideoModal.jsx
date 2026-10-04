'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function VideoModal({ isOpen, setIsOpen }) {
  // Close on Escape key
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
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Dark Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-polar/90 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Expanding Video Container */}
          <motion.div 
            layoutId="video-player-expand"
            className="relative w-full max-w-7xl aspect-video bg-black shadow-2xl rounded-sm overflow-hidden z-10"
            initial={{ borderRadius: 24 }}
            animate={{ borderRadius: 4 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <video 
              src="/media/hero.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-cover"
            />
            
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 bg-snow/10 hover:bg-snow/20 backdrop-blur-md rounded-full text-snow transition-colors"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}