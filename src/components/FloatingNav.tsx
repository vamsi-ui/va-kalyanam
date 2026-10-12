import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  scrollProgress: number;
}

export function FloatingNav({ activeSection, onNavigate, scrollProgress }: FloatingNavProps) {
  const sections = [
    { id: 'home', label: 'Welcome' },
    { id: 'story', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'events', label: 'Events' },
    { id: 'game', label: 'Game' },
  ];

  return (
    <>
      {/* Top Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/10 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFFDD0] to-[#D4AF37]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Bottom Nav Dock (Thumb friendly, accessible, graceful glassmorphism) */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-md w-full"
        aria-label="Wedding sections navigation"
      >
        <div className="mx-auto bg-[#7B0016]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-[0_12px_40px_rgba(0,0,0,0.35)] rounded-full px-2 py-1.5 flex items-center justify-between gap-1">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={`relative flex-1 py-2 px-2.5 sm:px-3 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center whitespace-nowrap ${
                  isActive
                    ? 'text-[#7B0016] font-semibold'
                    : 'text-[#FFFDD0]/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSectionIndicator"
                    className="absolute inset-0 bg-[#D4AF37] rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
