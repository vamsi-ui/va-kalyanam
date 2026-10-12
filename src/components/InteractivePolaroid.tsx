import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface FallbackPolaroidImageProps {
  src: string;
  alt: string;
  isRevealed: boolean;
  className?: string;
  coupleSubtitle?: string;
  initials?: string;
  style?: React.CSSProperties;
}

export function FallbackPolaroidImage({
  src,
  alt,
  isRevealed,
  className = '',
  coupleSubtitle = 'A & V',
  initials = 'A & V',
  style,
}: FallbackPolaroidImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        style={style}
        className={`w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#7B0016] via-[#8B0000] to-[#5a0010] text-[#D4AF37] select-none transition-all duration-1000 ease-out ${isRevealed ? 'filter-none' : 'grayscale contrast-125'}`}
      >
        {/* Subtle patterned gold ring background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none border-[6px] border-[#D4AF37] m-2 rounded-sm" />
        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-black/20 mb-3 shadow-inner">
          <span className="font-serif text-2xl tracking-widest text-[#D4AF37]">{initials}</span>
        </div>
        <p className="font-serif text-lg tracking-wide text-center font-medium text-[#FFFDD0]">{alt}</p>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/90 mt-1 font-light">{coupleSubtitle}</p>
        <span className="text-[11px] text-[#FFFDD0]/70 mt-3 font-mono tracking-wider italic">
          {isRevealed ? '✨ Captured in Love' : 'A timeless memory'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      style={style}
      className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isRevealed ? 'grayscale-0 contrast-100 saturate-100' : 'grayscale contrast-110 saturate-0'} ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

interface InteractivePolaroidProps {
  src: string;
  alt: string;
  captionTitle?: string;
  captionSubtitle?: string;
  initials?: string;
  rotation?: number;
  revealed?: boolean;
  onReveal?: () => void;
  aspectClass?: string;
  scrollReveal?: boolean;
}

export function InteractivePolaroid({
  src,
  alt,
  captionTitle,
  captionSubtitle,
  initials,
  rotation = 0,
  revealed,
  onReveal,
  aspectClass = 'aspect-[3/4]',
  scrollReveal = true,
}: InteractivePolaroidProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.35, once: true });
  const [internalRevealed, setInternalRevealed] = useState(false);

  // If revealed is explicitly passed as boolean, respect it; otherwise use scroll detection or internal tap
  const isRevealed = revealed !== undefined ? revealed : (scrollReveal ? (isInView || internalRevealed) : internalRevealed);

  const handleTap = () => {
    if (!isRevealed) {
      setInternalRevealed(true);
      if (onReveal) onReveal();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.03, rotate: rotation + (rotation >= 0 ? 1 : -1) }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className="relative bg-white p-3.5 pb-12 shadow-[0_16px_35px_rgba(0,0,0,0.18)] rounded-sm cursor-pointer select-none border border-black/5"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={handleTap}
    >
      <div className={`w-full ${aspectClass} bg-gray-100 overflow-hidden shadow-inner relative`}>
        <FallbackPolaroidImage
          src={src}
          alt={alt}
          isRevealed={isRevealed}
          coupleSubtitle={captionTitle}
          initials={initials}
        />
      </div>

      <div className="absolute bottom-3 left-0 w-full text-center px-3">
        <p className={`font-serif text-sm transition-colors duration-700 ${isRevealed ? 'text-[#7B0016] font-medium' : 'text-gray-700'}`}>
          {captionTitle || alt}
        </p>
        {captionSubtitle && (
          <motion.p
            animate={{ opacity: isRevealed ? 1 : 0.7 }}
            transition={{ duration: 0.6 }}
            className={`text-[11px] font-serif italic mt-0.5 transition-colors duration-700 ${isRevealed ? 'text-[#7B0016]/80' : 'text-gray-500'}`}
          >
            {captionSubtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
