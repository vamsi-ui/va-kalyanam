import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, BookOpen, Calendar, Gamepad2, Layers } from 'lucide-react';
import { InteractivePolaroid } from './InteractivePolaroid';
import {
  ThirunamamSymbol,
  NilavilakkuSymbol,
  GajaSymbol,
  PadmaSymbol,
  RoyalMonogramEmblem,
  GoldLinkedBorderFrame,
  CornerFlourish,
} from './RedGoldSymbols';
import { InvitationSuiteModal } from './InvitationSuiteModal';

interface WelcomeScreenProps {
  onNavigate: (screen: 'story' | 'events' | 'game') => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSuiteOpen, setIsSuiteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsRevealed(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.scrollY > 20) {
      setIsRevealed(true);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#7A0016] via-[#870019] to-[#680012] flex flex-col items-center justify-between p-4 sm:p-6 pt-8 sm:pt-12 pb-16 overflow-hidden">
      {/* Background Royal Texture & Gold Lattice / Mandala overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-rule='evenodd'%3E%3Ccircle cx='60' cy='60' r='45' fill='none' stroke='%23D4AF37' stroke-width='1.5' stroke-dasharray='4 3'/%3E%3Ccircle cx='60' cy='60' r='25' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Cpath d='M60 10 L60 110 M10 60 L110 60' stroke='%23D4AF37' stroke-width='0.75' stroke-dasharray='2 4'/%3E%3Ccircle cx='60' cy='15' r='3'/%3E%3Ccircle cx='60' cy='105' r='3'/%3E%3Ccircle cx='15' cy='60' r='3'/%3E%3Ccircle cx='105' cy='60' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Outer Grand Linked Gold Border for Main Card Framing */}
      <div className="absolute inset-2 sm:inset-4 border-2 border-[#D4AF37]/50 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-6 border border-[#D4AF37]/25 rounded-lg pointer-events-none" />

      {/* Four Royal Corner Flourishes */}
      <CornerFlourish position="top-left" size={54} />
      <CornerFlourish position="top-right" size={54} />
      <CornerFlourish position="bottom-left" size={54} />
      <CornerFlourish position="bottom-right" size={54} />

      {/* Top Sacred Shloka & Thirunamam Invocation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center text-center mt-2 max-w-xl"
      >
        {/* Sacred Symbols Crest: Nilavilakku - Thirunamam - Nilavilakku */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <NilavilakkuSymbol size={36} className="text-[#D4AF37]" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <ThirunamamSymbol size={50} />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FFFDD0]/90 font-serif mt-1 font-medium">
              || शुभं भवतु ||
            </span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <NilavilakkuSymbol size={36} className="text-[#D4AF37]" />
          </motion.div>
        </div>

        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#FFFDD0]/75 font-light">
          An Auspicious Invitation to Celebrate
        </p>
      </motion.div>

      {/* Center Royal Monogram, Royal Elephants, & Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center text-center my-3 max-w-4xl px-2"
      >
        {/* Royal Crest with Symmetrical Golden Elephants */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-8 my-1">
          {/* Left Elephant facing right */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden sm:block"
          >
            <GajaSymbol size={64} facing="right" />
          </motion.div>

          {/* Central Royal Monogram Emblem */}
          <div className="relative">
            <RoyalMonogramEmblem size={150} subtext="" />
          </div>

          {/* Right Elephant facing left */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden sm:block"
          >
            <GajaSymbol size={64} facing="left" />
          </motion.div>
        </div>

        {/* Couple Names in Classical Luxury Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFDD0] tracking-wide mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          Akshitha <span className="text-[#D4AF37] font-script text-4xl sm:text-6xl md:text-7xl px-1">&amp;</span> Vishnu
        </motion.h1>

        {/* Tagline & Cultural Heritage */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <PadmaSymbol size={22} />
          <p className="text-base sm:text-2xl text-[#FFFDD0]/95 font-serif tracking-widest font-light italic">
            When Keralam met Andhra
          </p>
          <PadmaSymbol size={22} />
        </div>
      </motion.div>

      {/* Center Polaroid framed in Royal Red-Gold mount */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center my-4"
      >
        <div className="w-72 sm:w-80 relative">
          {/* Ornate Gold Frame wrapper around Polaroid */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#8B0018] to-[#5A0010] border-2 border-[#D4AF37]/60 shadow-[0_12px_36px_rgba(0,0,0,0.6)] relative">
            <CornerFlourish position="top-left" size={28} />
            <CornerFlourish position="top-right" size={28} />
            <CornerFlourish position="bottom-left" size={28} />
            <CornerFlourish position="bottom-right" size={28} />

            <InteractivePolaroid
              src="/couple1.jpeg"
              alt="Akshitha & Vishnu"
              captionTitle="Akshitha & Vishnu"
              captionSubtitle="Together in Love"
              initials="A & V"
              revealed={isRevealed}
              onReveal={() => setIsRevealed(true)}
              aspectClass="aspect-[4/5]"
            />
          </div>
        </div>

        {/* Invitation Suite Trigger Button */}
        <motion.button
          onClick={() => setIsSuiteOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-5 py-2.5 bg-black/30 hover:bg-[#D4AF37] text-[#FFFDD0] hover:text-[#7A0016] border border-[#D4AF37]/80 rounded-full text-xs uppercase tracking-widest font-medium flex items-center gap-2 shadow-lg transition-all duration-300"
          aria-label="View Royal Invitation Cards"
        >
          <Layers size={15} className="text-[#D4AF37] group-hover:text-[#7A0016]" />
          <span>View Royal Invitation Cards</span>
          <Sparkles size={13} className="text-[#FFFDD0]" />
        </motion.button>
      </motion.div>

      {/* Navigation Pills & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="z-10 flex flex-col items-center gap-3 w-full max-w-sm sm:max-w-2xl px-4 mt-2"
      >
        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <button
            onClick={() => onNavigate('story')}
            className="w-full sm:w-auto px-7 py-3 bg-[#FFFDD0] text-[#7A0016] border border-[#D4AF37] rounded-full uppercase tracking-widest text-xs sm:text-sm font-semibold shadow-xl hover:bg-[#D4AF37] hover:text-[#7A0016] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen size={16} />
            <span>Our Story</span>
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="w-full sm:w-auto px-7 py-3 bg-[#FFFDD0] text-[#7A0016] border border-[#D4AF37] rounded-full uppercase tracking-widest text-xs sm:text-sm font-semibold shadow-xl hover:bg-[#D4AF37] hover:text-[#7A0016] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            <span>The Events</span>
          </button>
          <button
            onClick={() => onNavigate('game')}
            className="w-full sm:w-auto px-7 py-3 bg-transparent text-[#FFFDD0] border-2 border-[#D4AF37] rounded-full uppercase tracking-widest text-xs sm:text-sm font-semibold shadow-xl hover:bg-[#D4AF37] hover:text-[#7A0016] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Gamepad2 size={16} />
            <span>Play Game</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => onNavigate('story')}
          className="flex flex-col items-center text-[#FFFDD0]/70 hover:text-[#D4AF37] transition-colors mt-2 text-xs tracking-widest uppercase gap-1"
          aria-label="Scroll to explore"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
      </motion.div>

      {/* Royal Invitation Suite Modal */}
      <InvitationSuiteModal isOpen={isSuiteOpen} onClose={() => setIsSuiteOpen(false)} />
    </section>
  );
}
