import React, { useState, useEffect } from 'react';
import { WEDDING_DETAILS, getCountdownToDate } from '../utils/weddingData';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface WeddingCountdownProps {
  compact?: boolean;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState<'muhurtham' | 'reception'>('muhurtham');
  const details = activeTab === 'muhurtham' ? WEDDING_DETAILS.muhurtham : WEDDING_DETAILS.reception;

  const [timeLeft, setTimeLeft] = useState(() =>
    getCountdownToDate(details.month, details.dayNum, details.hour, details.minute)
  );

  useEffect(() => {
    const update = () => {
      setTimeLeft(getCountdownToDate(details.month, details.dayNum, details.hour, details.minute));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [details]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 sm:gap-4 px-3 py-1.5 rounded-full bg-[#1e0508]/85 border border-[#d4af37]/40 shadow-inner text-amber-100 text-xs sm:text-sm">
        <span className="flex items-center gap-1 text-[#fde047] font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>18th Feb</span>
        </span>
        <span className="text-[#d4af37]/60">|</span>
        <div className="flex items-center gap-1.5 font-mono font-bold text-[#fef08a]">
          <span>{timeLeft.days}d</span>
          <span>:</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span className="text-[#f59e0b]">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-[#fffcf2] via-[#faf5e6] to-[#f4ecd8] text-[#3e181b] rounded-3xl p-5 sm:p-6 border-2 border-[#c59b27] shadow-2xl relative overflow-hidden">
      {/* Decorative Traditional Corner Motifs */}
      <div className="absolute top-2 left-2 text-[#c59b27] text-xs opacity-70">❖</div>
      <div className="absolute top-2 right-2 text-[#c59b27] text-xs opacity-70">❖</div>
      <div className="absolute bottom-2 left-2 text-[#c59b27] text-xs opacity-70">❖</div>
      <div className="absolute bottom-2 right-2 text-[#c59b27] text-xs opacity-70">❖</div>

      {/* Tab Switcher: Muhurtham vs Reception */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setActiveTab('muhurtham')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Cinzel',serif] font-bold tracking-wider transition-all ${
            activeTab === 'muhurtham'
              ? 'bg-[#7f1d1d] text-[#fef08a] shadow-md border border-[#c59b27]'
              : 'bg-[#ebdcb9] text-[#5c1d24] hover:bg-[#dfcfa7]'
          }`}
        >
          🪔 Muhurtham (18th Feb)
        </button>
        <button
          onClick={() => setActiveTab('reception')}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-['Cinzel',serif] font-bold tracking-wider transition-all ${
            activeTab === 'reception'
              ? 'bg-[#7f1d1d] text-[#fef08a] shadow-md border border-[#c59b27]'
              : 'bg-[#ebdcb9] text-[#5c1d24] hover:bg-[#dfcfa7]'
          }`}
        >
          ✨ Reception (19th Feb)
        </button>
      </div>

      {/* Date & Time Header */}
      <div className="text-center mb-4">
        <h4 className="text-lg sm:text-xl font-['Cinzel',serif] font-bold text-[#7f1d1d] tracking-wide">
          {details.title}
        </h4>
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-['Playfair_Display',serif] text-[#854d0e] mt-0.5">
          <Clock className="w-3.5 h-3.5 text-[#b45309]" />
          <span>{details.dateStr}</span>
        </div>
      </div>

      {/* Live Digital Countdown Clock */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 my-3">
        {[
          { label: 'DAYS', val: timeLeft.days },
          { label: 'HOURS', val: String(timeLeft.hours).padStart(2, '0') },
          { label: 'MINUTES', val: String(timeLeft.minutes).padStart(2, '0') },
          { label: 'SECONDS', val: String(timeLeft.seconds).padStart(2, '0') },
        ].map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center py-2 sm:py-3 rounded-2xl bg-gradient-to-b from-[#7f1d1d] to-[#5a1417] text-[#fef08a] border border-[#c59b27]/60 shadow-md"
          >
            <span className="text-xl sm:text-3xl font-black font-mono tracking-tight text-[#fde047]">
              {unit.val}
            </span>
            <span className="text-[10px] sm:text-xs font-['Cinzel',serif] tracking-widest text-amber-200/80 mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Venue & Directions */}
      <div className="mt-4 pt-3 border-t border-[#d8c393] text-center">
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7f1d1d]">
          <MapPin className="w-4 h-4 text-[#b91c1c]" />
          <span>Venue: {details.venueName}</span>
        </div>
        <p className="text-[11px] sm:text-xs text-[#6e373c] max-w-md mx-auto mt-0.5 leading-snug">
          {details.venueAddress}
        </p>

        <a
          href={details.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-3 py-1 rounded-full bg-[#ebdcb9] hover:bg-[#dfcfa7] text-[#7f1d1d] text-[11px] font-semibold border border-[#c59b27]/50 transition-colors shadow-sm"
        >
          📍 Open in Google Maps
        </a>
      </div>
    </div>
  );
};
