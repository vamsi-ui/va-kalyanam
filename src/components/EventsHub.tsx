import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingEvents } from '../data';
import { CountdownTimer } from './CountdownTimer';
import { FallbackPolaroidImage } from './InteractivePolaroid';
import {
  RedGoldDivider,
  NilavilakkuSymbol,
  ThirunamamSymbol,
  GajaSymbol,
  PadmaSymbol,
  CornerFlourish,
} from './RedGoldSymbols';

export function EventsHub() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen py-24 px-6 bg-gradient-to-b from-[#faf9f6] via-[#FDFBF7] to-[#faf9f6] relative overflow-hidden"
    >
      {/* Background subtle mandala pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23D4AF37' stroke-width='2'/%3E%3Ccircle cx='40' cy='40' r='15' fill='none' stroke='%23D4AF37' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto pt-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-2"
          >
            <NilavilakkuSymbol size={34} />
          </motion.div>
          <motion.h2
            viewport={{ once: true, amount: 0.3 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-center text-[#7B0016] tracking-wide"
          >
            The Events
          </motion.h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#7B0016]/80 font-serif mt-2 font-medium">
            Countdowns to Sacred Muhurtham & Joyous Celebrations
          </p>
          <RedGoldDivider symbol="lamp" className="!my-3" />
        </div>

        <div className="relative border-l md:border-l-0 md:border-t-0 md:flex flex-col">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20 -translate-x-1/2" />

          {/* Vertical line for mobile */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/60 to-[#D4AF37]/20" />

          {weddingEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <EventNode key={event.id} event={event} isEven={isEven} index={index} />
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function EventNode({ event, isEven, index }: { event: any; isEven: boolean; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.35, once: true });
  const [internalColor, setInternalColor] = useState(false);
  const isColor = isInView || internalColor;

  const imageStyle: React.CSSProperties | undefined =
    event.id === 'reception' ? { width: '300px', height: '300px' } : undefined;

  // Auspicious symbol matching each event
  const renderEventSymbol = () => {
    if (event.id === 'wedding') {
      return <ThirunamamSymbol size={28} />;
    }
    if (event.id === 'engagement') {
      return <PadmaSymbol size={26} />;
    }
    return <GajaSymbol size={30} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row items-center w-full my-8 md:my-12 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline Dot (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 w-7 h-7 rounded-full bg-[#D4AF37] -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-[#faf9f6] items-center justify-center shadow-md">
        <div className="w-2.5 h-2.5 rounded-full bg-[#7B0016]" />
      </div>

      <div className="md:w-1/2 flex justify-center px-4 sm:px-8 w-full pl-6 md:pl-8 relative">
        {/* Timeline Dot (Mobile) */}
        <div className="md:hidden absolute -left-[11px] top-12 w-6 h-6 rounded-full bg-[#D4AF37] z-10 border-4 border-[#faf9f6] flex items-center justify-center shadow-md">
          <div className="w-2 h-2 rounded-full bg-[#7B0016]" />
        </div>

        {/* Event Card with Polaroid Style & Scroll Color Reveal */}
        <motion.div
          ref={cardRef}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white p-5 pb-6 shadow-[0_16px_36px_rgba(0,0,0,0.08)] rounded-lg border-2 border-[#D4AF37]/40 w-full max-w-sm select-none relative overflow-hidden"
          onClick={() => setInternalColor(true)}
        >
          {/* Ornate Corner Flourishes */}
          <CornerFlourish position="top-left" size={26} />
          <CornerFlourish position="top-right" size={26} />
          <CornerFlourish position="bottom-left" size={26} />
          <CornerFlourish position="bottom-right" size={26} />

          {/* Top Event Badge with Sacred Symbol */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
            <div className="p-1 rounded-full bg-[#7B0016]/10 text-[#7B0016] flex items-center justify-center">
              {renderEventSymbol()}
            </div>
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
          </div>

          {/* Polaroid Image Area with Color Pop */}
          <div className="aspect-[16/10] bg-gray-100 overflow-hidden mb-4 relative rounded-md shadow-inner flex items-center justify-center border border-[#D4AF37]/30">
            <FallbackPolaroidImage
              src={event.imageUrl}
              alt={event.title}
              isRevealed={isColor}
              coupleSubtitle={event.location}
              initials={event.title.charAt(0)}
              style={imageStyle}
            />
          </div>

          {/* Event Content Details */}
          <div className="text-center px-2">
            <h3 className="text-2xl font-serif text-[#7B0016] mb-2 font-medium">
              {event.title}
            </h3>

            <div className="space-y-1 mb-3 text-xs sm:text-sm text-gray-600 font-sans">
              <p className="flex items-center justify-center gap-1.5 font-medium text-gray-800">
                <Calendar size={14} className="text-[#D4AF37]" />
                <span>{event.date}</span>
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Clock size={14} className="text-[#D4AF37]" />
                <span>{event.time}</span>
              </p>
              <p className="flex items-center justify-center gap-1.5 font-medium text-[#7B0016]">
                <MapPin size={14} className="text-[#7B0016]" />
                <span>Venue: {event.location}</span>
              </p>
            </div>

            {/* Live Countdown Timer under each event */}
            <div className="border-t border-[#D4AF37]/30 pt-3 mt-3">
              <span className="text-[10px] uppercase tracking-widest text-[#7B0016]/80 block font-medium">
                Countdown
              </span>
              <CountdownTimer targetDate={event.timestamp} compact={true} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="md:w-1/2 hidden md:block" />
    </motion.div>
  );
}
