import React from 'react';

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  inverted?: boolean;
  withGoldTrim?: boolean;
}

export function WaveDivider({ topColor, bottomColor, inverted = false, withGoldTrim = true }: WaveDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-none relative -my-1 z-20 pointer-events-none"
      style={{ backgroundColor: topColor }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`relative block w-full h-10 md:h-16 ${inverted ? 'rotate-180' : ''}`}
      >
        <defs>
          <linearGradient id="waveGoldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA7A1E" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF2A3" stopOpacity="1" />
            <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#AA7A1E" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Base filled curve */}
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          style={{ fill: bottomColor }}
        />

        {/* Decorative Gold Trim Line */}
        {withGoldTrim && (
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60"
            fill="none"
            stroke="url(#waveGoldStroke)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}
