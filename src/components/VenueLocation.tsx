import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Calendar } from 'lucide-react';
import { RedGoldDivider, NilavilakkuSymbol, CornerFlourish } from './RedGoldSymbols';

export function VenueLocation() {
  return (
    <section className="py-24 px-6 relative bg-[#FAF6ED] border-y border-[#D4AF37]/30">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center mb-2">
            <NilavilakkuSymbol size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#7B0016] tracking-wide">
            The Venues & Directions
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#7B0016]/80 font-serif mt-2 font-medium">
            Join us in celebration in Chennai
          </p>
          <RedGoldDivider symbol="lamp" className="!my-3" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Muhurtham Venue: SAN Event Hall */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2 border-[#D4AF37]/50 flex flex-col justify-between relative overflow-hidden">
            <CornerFlourish position="top-left" size={24} />
            <CornerFlourish position="top-right" size={24} />

            <div>
              <div className="flex items-center gap-2 text-xs font-['Cinzel',serif] text-[#D4AF37] tracking-widest uppercase mb-1 font-bold">
                <Calendar size={14} />
                <span>Wedding Muhurtham • Feb 19, 2027</span>
              </div>
              <h3 className="text-2xl font-serif text-[#7B0016] font-bold mb-2">
                SAN Event Hall
              </h3>
              <p className="text-[#5a0010]/80 font-serif text-sm leading-relaxed mb-4">
                East Coast Road (ECR), Kottivakkam, Chennai, Tamil Nadu 600041
              </p>
              <div className="p-3 bg-[#FAF6ED] rounded border border-[#D4AF37]/30 text-xs text-[#7B0016] font-serif leading-relaxed mb-6">
                <strong>Auspicious Muhurtham:</strong> 10:55 AM (Morning). Dedicated guest parking and traditional welcome desk at the main entrance.
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=SAN+Event+Hall+Kottivakkam+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B0016] hover:bg-[#8B0000] text-[#FFFDD0] border border-[#D4AF37] rounded-full text-xs font-['Cinzel',serif] tracking-wider uppercase font-semibold transition-all shadow-md active:scale-95"
            >
              <Navigation size={14} className="text-[#D4AF37]" />
              <span>Directions to SAN Event Hall</span>
            </a>
          </div>

          {/* 2. Reception Venue: MCC Lawn */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2 border-[#D4AF37]/50 flex flex-col justify-between relative overflow-hidden">
            <CornerFlourish position="top-left" size={24} />
            <CornerFlourish position="top-right" size={24} />

            <div>
              <div className="flex items-center gap-2 text-xs font-['Cinzel',serif] text-[#D4AF37] tracking-widest uppercase mb-1 font-bold">
                <Calendar size={14} />
                <span>Wedding Reception • Feb 18, 2027</span>
              </div>
              <h3 className="text-2xl font-serif text-[#7B0016] font-bold mb-2">
                MCC Lawn
              </h3>
              <p className="text-[#5a0010]/80 font-serif text-sm leading-relaxed mb-4">
                Madras Christian College Ground / Lawn, Chetpet, Chennai 600031
              </p>
              <div className="p-3 bg-[#FAF6ED] rounded border border-[#D4AF37]/30 text-xs text-[#7B0016] font-serif leading-relaxed mb-6">
                <strong>Evening Celebration:</strong> 6:30 PM Onwards. An evening of music, feast, and celebration under the stars.
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=MCC+Lawn+Chetpet+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B0016] hover:bg-[#8B0000] text-[#FFFDD0] border border-[#D4AF37] rounded-full text-xs font-['Cinzel',serif] tracking-wider uppercase font-semibold transition-all shadow-md active:scale-95"
            >
              <Navigation size={14} className="text-[#D4AF37]" />
              <span>Directions to MCC Lawn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
