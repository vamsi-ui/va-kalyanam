import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ThirunamamSymbol, NilavilakkuSymbol, GajaSymbol, PadmaSymbol } from './RedGoldSymbols';

interface InvitationSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const invitationCards = [
  {
    id: 'full-suite',
    title: 'The Royal Wedding Suite',
    subtitle: 'Classic Crimson & Gold Invitation Triptych',
    image: '/website-theme.jpeg',
    description:
      'The complete traditional wedding suite featuring royal crimson red, sacred Vaishnavite Thirunamam, Nilavilakku brass lamps, royal caparisoned elephants, and classic gold filigree borders.',
    shloka: '|| वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||',
  },
  {
    id: 'card-1',
    title: 'The Monogram & Blessing Card',
    subtitle: 'A & V Royal Monogram & Auspicious Invocation',
    image: '/theme/card_0.jpeg',
    description:
      'The sacred first card adorned with the divine Thirunamam, the intertwined A & V monogram crest, and blessings celebrating the sacred union of Keralam and Andhra traditions.',
    shloka: '|| मङ्गलम् भगवान् विष्णुः मङ्गलम् गरुडध्वजः ||',
  },
  {
    id: 'card-2',
    title: 'The Muhurtham & Ceremony Card',
    subtitle: 'Auspicious Wedding Muhurtham — Feb 18, 2027',
    image: '/theme/card_1.jpeg',
    description:
      'The sacred ceremony details welcoming guests to witness the Kalyanam and shower Akshatas and heartfelt blessings on Akshitha and Vishnu.',
    shloka: '|| माङ्गल्यं तन्तुनानेन मम जीवनहेतुना ||',
  },
  {
    id: 'card-3',
    title: 'The Reception & Celebrations Card',
    subtitle: 'Grand Reception — Feb 19, 2027',
    image: '/theme/card_2.jpeg',
    description:
      'The celebratory evening card for a night of music, festivity, and dinner under starlit skies at MCC Lawn.',
    shloka: '|| शुभं भवतु कल्याणम् ||',
  },
];

export function InvitationSuiteModal({ isOpen, onClose }: InvitationSuiteModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isOpen) return null;

  const currentCard = invitationCards[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? invitationCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === invitationCards.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#7A0016] via-[#8B0018] to-[#55000C] text-[#FFFDD0] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-[#D4AF37]/60 p-4 sm:p-8"
        >
          {/* Ornate Gold Corner Flourishes */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#D4AF37] hover:text-[#7A0016] text-[#FFFDD0] border border-[#D4AF37]/50 flex items-center justify-center transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <NilavilakkuSymbol size={28} />
              <ThirunamamSymbol size={32} />
              <NilavilakkuSymbol size={28} />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif">
              Traditional Red & Gold Collection
            </p>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#FFFDD0] tracking-wide mt-1">
              Royal Wedding Invitation Suite
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37]/80 mx-auto mt-2" />
          </div>

          {/* Card Carousel Preview */}
          <div className="relative mb-6">
            <div className="relative overflow-hidden rounded-xl border border-[#D4AF37]/50 bg-black/30 p-2 sm:p-4 flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
              <motion.img
                key={currentCard.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={currentCard.image}
                alt={currentCard.title}
                className="max-h-[500px] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-[#D4AF37]/30"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#7A0016] text-[#FFFDD0] border border-[#D4AF37]/60 flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous card"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#7A0016] text-[#FFFDD0] border border-[#D4AF37]/60 flex items-center justify-center transition-all shadow-lg"
                aria-label="Next card"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Card Information */}
            <div className="mt-4 text-center px-4">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                Card {selectedIndex + 1} of {invitationCards.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FFFDD0] mt-1">
                {currentCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] italic font-serif mt-0.5">
                {currentCard.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#FFFDD0]/85 max-w-2xl mx-auto mt-2 leading-relaxed font-sans">
                {currentCard.description}
              </p>
              <p className="text-xs text-[#D4AF37]/90 font-serif tracking-widest mt-2">
                {currentCard.shloka}
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 border-t border-[#D4AF37]/30 pt-4">
            {invitationCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group relative rounded-lg overflow-hidden border-2 transition-all p-1 bg-black/30 flex flex-col items-center ${
                  selectedIndex === idx
                    ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-[1.02]'
                    : 'border-white/10 opacity-70 hover:opacity-100 hover:border-[#D4AF37]/50'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-14 sm:h-20 w-full object-cover rounded"
                />
                <span className="text-[10px] sm:text-xs text-center truncate w-full text-[#FFFDD0] mt-1 font-serif">
                  {idx === 0 ? 'Full Suite' : `Card ${idx}`}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
