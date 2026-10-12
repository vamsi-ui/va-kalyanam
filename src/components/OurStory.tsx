import React from 'react';
import { motion } from 'motion/react';
import { InteractivePolaroid } from './InteractivePolaroid';
import { RedGoldDivider, CornerFlourish, PadmaSymbol } from './RedGoldSymbols';

export function OurStory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen py-24 px-6 bg-gradient-to-b from-[#FFFDD0] via-[#FAF6E8] to-[#FFFDD0] relative overflow-hidden"
    >
      {/* Decorative background mandala embellishments */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237B0016' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto pt-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-2"
          >
            <PadmaSymbol size={32} />
          </motion.div>
          <motion.h2
            viewport={{ once: true, amount: 0.3 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-[#7B0016] tracking-wide"
          >
            Our Story
          </motion.h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#7B0016]/80 font-serif mt-2 font-medium">
            When Keralam met Andhra — A Destiny in the Making
          </p>
          <RedGoldDivider symbol="lotus" className="!my-3" />
        </div>

        {/* Story Card with Royal Gold Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl border-2 border-[#D4AF37]/50 mb-16 relative"
        >
          {/* Corner Flourishes */}
          <CornerFlourish position="top-left" size={32} />
          <CornerFlourish position="top-right" size={32} />
          <CornerFlourish position="bottom-left" size={32} />
          <CornerFlourish position="bottom-right" size={32} />

          <div className="absolute top-2 left-4 text-4xl text-[#D4AF37]/50 font-serif leading-none select-none">“</div>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center font-serif px-4">
            We met in the office. We were friends, but years later, that friendship blossomed. When he finally asked if we could date, I took a lot of time to say yes! After a few months, and a little push from family, things just eventually—and beautifully—started happening.
          </p>
          <div className="absolute bottom-2 right-5 text-4xl text-[#D4AF37]/50 font-serif leading-none select-none">”</div>
        </motion.div>

        {/* Side-by-Side Polaroids with Scroll Color Transition */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 md:gap-16">
          {/* Akshitha Polaroid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-72 sm:w-64 md:w-72"
          >
            <div className="p-2 rounded-lg bg-[#FAF6E8] border border-[#D4AF37]/50 shadow-lg">
              <InteractivePolaroid
                src="/akshitha.jpeg"
                alt="Akshitha"
                captionTitle="The Bride"
                captionSubtitle="The one who took her time."
                initials="AT"
                rotation={-2}
                aspectClass="aspect-[3/4]"
                scrollReveal={true}
              />
            </div>
          </motion.div>

          {/* Vishnu Polaroid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-72 sm:w-64 md:w-72"
          >
            <div className="p-2 rounded-lg bg-[#FAF6E8] border border-[#D4AF37]/50 shadow-lg">
              <InteractivePolaroid
                src="/vishnu.jpeg"
                alt="Vishnu"
                captionTitle="The Groom"
                captionSubtitle="The one who waited."
                initials="VB"
                rotation={2}
                aspectClass="aspect-[3/4]"
                scrollReveal={true}
              />
            </div>
          </motion.div>
        </div>

        {/* Romantic Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-xs tracking-widest text-[#7B0016]/80 uppercase mt-12 font-medium"
        >
          ✨ A timeless bond brought to life in full color
        </motion.p>
      </div>
    </motion.section>
  );
}
