'use client';
import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <>
      {/* The Mist Wipe - Slides up and clears when a new page loads */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[100] bg-gradient-to-t from-snow via-snow to-transparent"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Page Content Reveal */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {children}
      </motion.main>
    </>
  );
}