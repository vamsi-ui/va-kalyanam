import React, { useState, useEffect } from 'react';
import { CharacterType } from '../types';
import { WEDDING_DETAILS, getCountdownToDate } from '../utils/weddingData';
import { SacredNamam, CoupleMonogram, BrassLamp } from './WeddingEmblems';
import { ThirunamamSymbol, NilavilakkuSymbol, PadmaSymbol } from './RedGoldSymbols';
import { RotateCcw, Calendar, MapPin, Clock, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface WinModalProps {
  character: CharacterType;
  partner: CharacterType;
  score: number;
  coins: number;
  laddus: number;
  onRestart: () => void;
  onSelectCharacter: () => void;
  onOpenPortal?: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  character,
  partner,
  score,
  coins,
  laddus,
  onRestart,
  onSelectCharacter,
  onOpenPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'muhurtham' | 'reception'>('muhurtham');
  const details = activeTab === 'muhurtham' ? WEDDING_DETAILS.muhurtham : WEDDING_DETAILS.reception;

  // Live countdown
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

  // Google Calendar Link generator
  const createGoogleCalendarUrl = () => {
    const now = new Date();
    let year = now.getFullYear();
    const targetDate = new Date(year, details.month, details.dayNum, details.hour, details.minute);
    if (targetDate.getTime() < now.getTime()) year += 1;

    const startIso = `${year}02${details.dayNum < 10 ? '0' + details.dayNum : details.dayNum}T${
      details.hour < 10 ? '0' + details.hour : details.hour
    }${details.minute < 10 ? '0' + details.minute : details.minute}00`;
    const endHour = details.hour + 3;
    const endIso = `${year}02${details.dayNum < 10 ? '0' + details.dayNum : details.dayNum}T${
      endHour < 10 ? '0' + endHour : endHour
    }${details.minute < 10 ? '0' + details.minute : details.minute}00`;

    const title = encodeURIComponent(
      `Wedding of Vishnu & Akshitha - ${details.title}`
    );
    const desc = encodeURIComponent(
      `You are invited to celebrate the wedding of Chi. Vishnu KB and Sow. Akshitha Sri Tekki. Venue: ${details.venueName}, ${details.venueAddress}`
    );
    const loc = encodeURIComponent(`${details.venueName}, ${details.venueAddress}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${desc}&location=${loc}`;
  };

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
      <div className="relative w-full max-w-2xl bg-[#fffdf7] text-[#3d1217] rounded-[32px] p-5 sm:p-8 shadow-2xl border-4 border-[#c59b27] my-auto overflow-hidden">
        {/* Subtle Background Radial Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#7f1d1d_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Outer Red & Gold Border Accent */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#991b1b] via-[#c59b27] to-[#991b1b]" />

        {/* Top Header: Sacred Thirunamam & Lamp Icons */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="flex items-center justify-center gap-4">
            <NilavilakkuSymbol size={36} className="hidden sm:inline-block" />
            <ThirunamamSymbol size={44} />
            <NilavilakkuSymbol size={36} className="hidden sm:inline-block scale-x-[-1]" />
          </div>

          <div className="mt-1 text-center font-['Playfair_Display',serif] italic text-xs sm:text-sm text-[#7f1d1d] font-semibold tracking-wider">
            Mandap Reached! We invite you to celebrate the wedding of
          </div>

          {/* Couple's Real Portraits Side-by-Side in Royal Medallions */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 my-3">
            {/* Groom Photo */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#F5D061] to-[#AA7A1E] shadow-lg ring-2 ring-[#7B0016]/20">
                <img
                  src="/groom_avatar.png"
                  alt="Chi. Vishnu KB"
                  className="w-full h-full object-cover rounded-full border-2 border-[#fffdf7]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/groom.jpg';
                  }}
                />
              </div>
              <span className="text-[10px] font-['Cinzel',serif] font-bold text-[#881323] mt-1">Vishnu</span>
            </div>

            {/* Glowing Floral Varmala Union */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl text-rose-600 animate-pulse">❤️</span>
              <span className="text-xl sm:text-2xl font-['Great_Vibes',cursive] text-[#c59b27] -mt-1">Weds</span>
            </div>

            {/* Bride Photo */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#fb7185] via-[#f43f5e] to-[#D4AF37] shadow-lg ring-2 ring-[#7B0016]/20">
                <img
                  src="/bride_avatar.png"
                  alt="Sow. Akshitha Sri Tekki"
                  className="w-full h-full object-cover rounded-full border-2 border-[#fffdf7]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/bride.jpg';
                  }}
                />
              </div>
              <span className="text-[10px] font-['Cinzel',serif] font-bold text-[#881323] mt-1">Akshitha</span>
            </div>
          </div>

          {/* Couple Names - Authentic typography matching the invitation card */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-black font-['Cinzel',serif] tracking-wider text-[#881323]">
              Chi. Vishnu KB & Sow. Akshitha Sri Tekki
            </h2>
            <div className="text-[11px] sm:text-xs font-['Playfair_Display',serif] text-[#854d0e] italic font-medium">
              Son of KK Babu & KL Mani • Daughter of ShivKumar Tekki & Uma Devi Tekki
            </div>
          </div>

          {/* Couple's Tagline */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fef3c7] border border-[#c59b27]/40 text-[#92400e] text-[11px] font-['Playfair_Display',serif] italic font-semibold">
            <span>🪷</span>
            <span>When Keralam met Andhra</span>
            <span>🪷</span>
          </div>
        </div>

        {/* Tab Switcher: Muhurtham vs Reception */}
        <div className="flex justify-center gap-2 mt-4 mb-3">
          <button
            onClick={() => setActiveTab('muhurtham')}
            className={`px-4 py-1.5 rounded-full text-xs font-['Cinzel',serif] font-bold tracking-wider transition-all ${
              activeTab === 'muhurtham'
                ? 'bg-[#7f1d1d] text-[#fef08a] shadow-md border border-[#c59b27]'
                : 'bg-[#f4ebd0] text-[#7f1d1d] hover:bg-[#ebdcb9]'
            }`}
          >
            🪔 Muhurtham (18th Feb)
          </button>
          <button
            onClick={() => setActiveTab('reception')}
            className={`px-4 py-1.5 rounded-full text-xs font-['Cinzel',serif] font-bold tracking-wider transition-all ${
              activeTab === 'reception'
                ? 'bg-[#7f1d1d] text-[#fef08a] shadow-md border border-[#c59b27]'
                : 'bg-[#f4ebd0] text-[#7f1d1d] hover:bg-[#ebdcb9]'
            }`}
          >
            ✨ Reception (19th Feb)
          </button>
        </div>

        {/* Event Date & Venue Card */}
        <div className="bg-[#fcf7ea] border border-[#d4af37]/60 rounded-2xl p-3.5 sm:p-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#7f1d1d]">
            <Clock className="w-4 h-4 text-[#b45309]" />
            <span className="font-['Cinzel',serif] tracking-wide">{details.dateStr}</span>
          </div>

          <div className="mt-2 text-xs text-[#521b21] max-w-lg mx-auto">
            <span className="font-bold text-[#881323]">Venue: {details.venueName}</span>
            <div className="text-[11px] text-[#6b353b] leading-tight mt-0.5">
              {details.venueAddress}
            </div>
          </div>
        </div>

        {/* Live Wedding Countdown */}
        <div className="mt-4">
          <div className="text-center text-[11px] uppercase tracking-widest font-['Cinzel',serif] font-bold text-[#854d0e] mb-1.5">
            ⏳ Countdown to {details.title}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: String(timeLeft.hours).padStart(2, '0') },
              { label: 'MINUTES', val: String(timeLeft.minutes).padStart(2, '0') },
              { label: 'SECONDS', val: String(timeLeft.seconds).padStart(2, '0') },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-2 sm:py-2.5 rounded-xl bg-gradient-to-b from-[#7f1d1d] to-[#581216] text-[#fef08a] border border-[#c59b27]/60 shadow"
              >
                <span className="text-xl sm:text-2xl font-black font-mono text-[#fde047]">
                  {unit.val}
                </span>
                <span className="text-[9px] sm:text-[10px] font-['Cinzel',serif] tracking-wider text-amber-200/80">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Game Stats Badge */}
        <div className="mt-4 py-2 px-4 rounded-xl bg-[#f4ebd0]/70 border border-[#c59b27]/40 flex items-center justify-around text-xs font-bold text-[#7f1d1d]">
          <span className="flex items-center gap-1">
            <span>🏁 Mandap 500m</span>
          </span>
          <span className="text-[#c59b27]">|</span>
          <span className="flex items-center gap-1">
            <span>🪙 {coins} Coins</span>
          </span>
          <span className="text-[#c59b27]">|</span>
          <span className="flex items-center gap-1">
            <span>🟡 {laddus} Laddus</span>
          </span>
          <span className="text-[#c59b27]">|</span>
          <span className="flex items-center gap-1 text-[#b45309]">
            <span>⭐ {score} Pts</span>
          </span>
        </div>

        {/* Action Buttons: Add to Calendar, Google Maps, Play Again */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-2">
          {/* Add to Calendar */}
          <a
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl font-bold text-xs bg-[#7f1d1d] hover:bg-[#6b1818] text-[#fef08a] border border-[#c59b27] flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </a>

          {/* View Venue Map */}
          <a
            href={details.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl font-bold text-xs bg-[#f4ebd0] hover:bg-[#ebdcb9] text-[#7f1d1d] border border-[#c59b27]/60 flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#b91c1c]" />
            <span>Venue Map</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Play Again */}
          <button
            onClick={() => {
              soundManager.playCoin();
              onRestart();
            }}
            className="py-2.5 px-3 rounded-xl font-bold text-xs bg-[#065f46] hover:bg-[#047857] text-white border border-emerald-400 flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>

        {/* Switch Character or View Portal */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={() => {
              soundManager.playCoin();
              onSelectCharacter();
            }}
            className="text-[#854d0e] hover:text-[#7f1d1d] font-semibold underline underline-offset-4 transition-colors"
          >
            ← Switch Character (Play as {character === 'vishnu' ? 'Akshitha' : 'Vishnu'})
          </button>

          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="text-[#7f1d1d] hover:text-[#991b1b] font-bold flex items-center gap-1 underline underline-offset-4"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Wedding Portal & Gallery →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
