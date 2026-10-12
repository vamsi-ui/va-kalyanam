import React from 'react';

// Sacred Vaishnavite Thiruman / Namam symbol at top of Muhurtham card
export const SacredNamam: React.FC<{ className?: string }> = ({ className = 'w-8 h-10' }) => (
  <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer U shape (white with gold stroke) */}
    <path
      d="M10 5 C10 32, 22 55, 30 62 C38 55, 50 32, 50 5 L44 5 C44 28, 35 48, 30 52 C25 48, 16 28, 16 5 Z"
      fill="#fffdfa"
      stroke="#c59b27"
      strokeWidth="2"
    />
    {/* Base Lotus pediment */}
    <path
      d="M20 60 Q30 68 40 60 Q30 64 20 60 Z"
      fill="#c59b27"
    />
    {/* Center Red Tilak stripe (Sri Churnam) */}
    <path
      d="M28 8 L32 8 L32 50 Q30 54 28 50 Z"
      fill="#b91c1c"
    />
  </svg>
);

// Couple's monogram: "A V" with Pink Lotus and tagline "When Keralam met Andhra"
export const CoupleMonogram: React.FC<{ subtitle?: boolean }> = ({ subtitle = true }) => (
  <div className="flex flex-col items-center justify-center select-none text-center">
    <div className="relative flex items-center justify-center">
      {/* Golden artistic lettering AV */}
      <div className="relative font-['Cinzel',serif] font-black text-5xl sm:text-6xl text-transparent bg-gradient-to-b from-[#fef08a] via-[#eab308] to-[#ca8a04] bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center tracking-tighter">
        <span>A</span>
        {/* Pink Lotus flower blooming in center */}
        <span className="text-3xl sm:text-4xl -mx-1 filter drop-shadow animate-pulse">
          🪷
        </span>
        <span className="text-4xl sm:text-5xl -ml-1 text-[#fbbf24]">വി</span>
      </div>
    </div>
    {subtitle && (
      <div className="mt-1 text-xs sm:text-sm font-['Playfair_Display',serif] italic tracking-wider text-amber-200/90 font-medium">
        When Keralam met Andhra
      </div>
    )}
  </div>
);

// Golden Temple Nilavilakku (Auspicious Kerala Brass Lamp)
export const BrassLamp: React.FC<{ className?: string }> = ({ className = 'w-6 h-12' }) => (
  <svg viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Flame */}
    <path d="M15 2 Q18 9 15 14 Q12 9 15 2 Z" fill="#fbbf24" />
    <path d="M15 5 Q17 10 15 13 Q13 10 15 5 Z" fill="#f97316" />
    {/* Lamp Top Dish */}
    <ellipse cx="15" cy="16" rx="8" ry="3" fill="#ca8a04" stroke="#eab308" strokeWidth="1" />
    {/* Stem */}
    <rect x="13.5" y="18" width="3" height="26" fill="#ca8a04" />
    <ellipse cx="15" cy="30" rx="4" ry="2" fill="#eab308" />
    {/* Base */}
    <path d="M7 54 Q15 48 23 54 L25 58 L5 58 Z" fill="#ca8a04" stroke="#eab308" strokeWidth="1" />
  </svg>
);
