import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { InteractivePolaroid } from './InteractivePolaroid';
import { RedGoldDivider, PadmaSymbol } from './RedGoldSymbols';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'moments' | 'celebration';
  initials: string;
  rotation: number;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'couple1',
    src: '/couple1.jpeg',
    title: 'Together in Love',
    subtitle: 'Where every glance speaks a thousand words',
    category: 'moments',
    initials: 'A & V',
    rotation: -1.5,
  },
  {
    id: 'couple2',
    src: '/couple2.jpeg',
    title: 'Hand in Hand',
    subtitle: 'Stepping gracefully into our new chapter',
    category: 'moments',
    initials: 'A & V',
    rotation: 1.5,
  },
  {
    id: 'couple3',
    src: '/couple3.jpeg',
    title: 'Laughter & Light',
    subtitle: 'Joyful memories carved in timeless frames',
    category: 'moments',
    initials: 'A & V',
    rotation: -1,
  },
  {
    id: 'couple4',
    src: '/couple4.jpeg',
    title: 'Golden Radiance',
    subtitle: 'When hearts whisper sacred promises',
    category: 'moments',
    initials: 'A & V',
    rotation: 2,
  },
  {
    id: 'couple6',
    src: '/couple6.jpeg',
    title: 'Forever Us',
    subtitle: 'The best thing to hold onto in life is each other',
    category: 'moments',
    initials: 'A & V',
    rotation: -2,
  },
  {
    id: 'a10',
    src: '/a10.jpeg',
    title: 'Precious Glimpses',
    subtitle: 'Candid smiles that illuminate every room',
    category: 'celebration',
    initials: 'A & V',
    rotation: -1.5,
  },
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'moments' | 'celebration'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = activeFilter === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === activeFilter);

  const currentIndex = selectedPhoto ? galleryPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(galleryPhotos[currentIndex - 1]);
    } else {
      setSelectedPhoto(galleryPhotos[galleryPhotos.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < galleryPhotos.length - 1) {
      setSelectedPhoto(galleryPhotos[currentIndex + 1]);
    } else {
      setSelectedPhoto(galleryPhotos[0]);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 px-6 bg-[#FFFDD0] relative overflow-hidden"
    >
      {/* Decorative gold background motif */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237B0016' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-2"
          >
            <PadmaSymbol size={32} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-6xl font-serif text-[#7B0016] tracking-wide"
          >
            Moments in Love
          </motion.h2>
          <p className="text-xs uppercase tracking-widest text-[#7B0016]/70 mt-2 font-medium">
            Cherished Memories & Candid Celebrations
          </p>
          <RedGoldDivider symbol="lotus" className="!my-3" />

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'moments', label: 'Couple Moments' },
              { id: 'celebration', label: 'Candid & Celebrations' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 min-h-[40px] ${
                  activeFilter === tab.id
                    ? 'bg-[#7B0016] text-[#FFFDD0] shadow-md scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:text-[#7B0016] border border-[#D4AF37]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.15, duration: 0.6 }}
              className="flex justify-center"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="w-full max-w-xs cursor-pointer group">
                <InteractivePolaroid
                  src={photo.src}
                  alt={photo.title}
                  captionTitle={photo.title}
                  captionSubtitle={photo.subtitle}
                  initials={photo.initials}
                  rotation={photo.rotation}
                  scrollReveal={true}
                  aspectClass="aspect-[4/5]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo view"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-sm transition-all z-20"
              >
                <X size={24} />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full backdrop-blur-sm transition-all z-20"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full backdrop-blur-sm transition-all z-20"
              >
                <ChevronRight size={28} />
              </button>

              {/* Photo Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-4 sm:p-5 pb-8 rounded-sm shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col items-center border border-[#D4AF37]/40"
              >
                <div className="w-full aspect-[4/5] sm:max-h-[65vh] overflow-hidden rounded-xs bg-gray-900 shadow-inner">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-2xl text-[#7B0016] tracking-wide">
                    {selectedPhoto.title}
                  </h3>
                  <p className="font-serif italic text-sm text-gray-600 mt-1">
                    {selectedPhoto.subtitle}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[#D4AF37]">
                    <Sparkles size={13} />
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">
                      Akshitha & Vishnu · 2026-2027
                    </span>
                    <Sparkles size={13} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
