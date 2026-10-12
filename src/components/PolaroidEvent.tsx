import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EventItem } from '../types';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface PolaroidEventProps {
  event: EventItem;
  index: number;
}

export function PolaroidEvent({ event, index }: PolaroidEventProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Alternate rotations for a casual scattered look
  const rotation = index % 2 === 0 ? -2 : 3;

  return (
    <motion.div
      layout
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative w-full max-w-sm mx-auto cursor-pointer group`}
    >
      <motion.div
        layout
        animate={{
          rotate: isOpen ? 0 : rotation,
          scale: isOpen ? 1.05 : 1,
          zIndex: isOpen ? 10 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`bg-white p-4 md:p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-sm ${isOpen ? event.bgClass : ''} transition-colors duration-700`}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-gray-200">
          <img
            src={event.imageUrl}
            alt={event.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${isOpen ? 'grayscale-0 scale-100' : 'grayscale-[100%] scale-105 group-hover:scale-100'}`}
          />
          {/* Overlay gradient for text readability when open, if needed */}
        </div>

        {/* Content */}
        <motion.div layout className="mt-6 flex flex-col items-center text-center">
          <h3 className={`text-2xl font-serif mb-2 transition-colors duration-500 ${isOpen ? event.themeClass : 'text-gray-800'}`}>
            {event.title}
          </h3>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden w-full"
              >
                <div className="pt-4 border-t border-black/10 mt-2 space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar size={16} className={event.themeClass} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={16} className={event.themeClass} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={16} className={event.themeClass} />
                    <span>{event.location}</span>
                  </div>
                  <p className="mt-4 italic leading-relaxed text-gray-600">
                    "{event.description}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
