import React from 'react';
import { CharacterType } from '../types';
import { Sparkles, Heart, Zap, Play, Volume2, VolumeX, BookOpen, Layers } from 'lucide-react';
import { soundManager } from '../audio/soundManager';
import { SacredNamam, CoupleMonogram, BrassLamp } from './WeddingEmblems';
import { WeddingCountdown } from './WeddingCountdown';
import { ThirunamamSymbol, NilavilakkuSymbol, PadmaSymbol, CornerFlourish } from './RedGoldSymbols';

interface CharacterSelectProps {
  onSelectCharacter: (char: CharacterType) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPortal?: () => void;
  onOpenSuite?: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onSelectCharacter,
  isMuted,
  onToggleMute,
  onOpenPortal,
  onOpenSuite,
}) => {
  const [selected, setSelected] = React.useState<CharacterType>('vishnu');

  const handleStart = () => {
    soundManager.playCoin();
    onSelectCharacter(selected);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-b from-[#2a0609] via-[#4a0810] to-[#1e0407] text-[#fef3c7] flex flex-col items-center justify-between p-3 sm:p-5 overflow-y-auto">
      {/* Ornate Corner Flourishes */}
      <CornerFlourish position="top-left" size={48} />
      <CornerFlourish position="top-right" size={48} />

      {/* Top Navigation & Status Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between border-b border-[#D4AF37]/35 pb-3 pt-1">
        {/* Sacred Namam & Title */}
        <div className="flex items-center gap-2.5">
          <ThirunamamSymbol size={36} />
          <div>
            <div className="text-[10px] font-['Cinzel',serif] tracking-widest text-[#fde047] uppercase font-bold flex items-center gap-1.5">
              <span>18th Feb 2027</span>
              <span>•</span>
              <span>Chennai</span>
            </div>
            <h1 className="text-base sm:text-xl font-['Cinzel',serif] font-black tracking-wider text-transparent bg-gradient-to-r from-[#fef08a] via-[#facc15] to-[#fef08a] bg-clip-text">
              VISHNU & AKSHITHA
            </h1>
          </div>
        </div>

        {/* Live Wedding Date Countdown Ribbon */}
        <div className="hidden md:block">
          <WeddingCountdown compact />
        </div>

        {/* Action Controls: Portal & Audio Toggle */}
        <div className="flex items-center gap-2">
          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="px-3 py-1.5 rounded-full bg-[#7B0016] hover:bg-[#8f1025] border border-[#D4AF37] text-[#fde047] transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-['Cinzel',serif] font-bold"
              title="Explore Wedding Invitation & Timeline Portal"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#fde047]" />
              <span className="hidden sm:inline">Wedding Portal</span>
            </button>
          )}

          {onOpenSuite && (
            <button
              onClick={onOpenSuite}
              className="px-2.5 py-1.5 rounded-full bg-[#3d090d] hover:bg-[#521015] border border-[#c59b27]/60 text-amber-200 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1 text-xs font-semibold"
              title="View Authentic Invitation Suite"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Cards</span>
            </button>
          )}

          <button
            onClick={onToggleMute}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#3d090d] hover:bg-[#521015] border border-[#c59b27]/50 text-amber-200 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-semibold"
            title="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden lg:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Countdown Ribbon */}
      <div className="md:hidden my-1">
        <WeddingCountdown compact />
      </div>

      {/* Authentic Monogram & Tagline from the Wedding Card */}
      <div className="text-center my-2">
        <CoupleMonogram subtitle={false} />
        <div className="mt-1 text-xs sm:text-sm font-['Playfair_Display',serif] italic tracking-wide text-[#fde047]/90 font-medium">
          When Keralam met Andhra
        </div>
        <p className="text-[11px] sm:text-xs text-amber-200/80 max-w-md mx-auto mt-1">
          Pick your wedding champion, dodge aunties & photographers, and sprint through royal celebrations to meet at the Mandap!
        </p>
      </div>

      {/* Character Cards: Real Photos of Vishnu & Akshitha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl items-stretch my-2">
        {/* Vishnu (The Groom) Card */}
        <div
          onClick={() => setSelected('vishnu')}
          className={`relative group cursor-pointer rounded-3xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 ${
            selected === 'vishnu'
              ? 'bg-gradient-to-b from-[#4a1217] via-[#5c161d] to-[#360b0f] border-[#facc15] ring-4 ring-[#facc15]/30 scale-[1.02] shadow-2xl shadow-amber-900/50'
              : 'bg-[#29070a]/75 hover:bg-[#380b0f]/90 border-[#c59b27]/30 hover:border-[#c59b27]/70 opacity-80 hover:opacity-100 hover:scale-[1.01]'
          }`}
        >
          {/* Top Accent Ribbon */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#d97706] via-[#facc15] to-[#d97706]" />

          <div className="pt-2">
            <div className="text-center mb-2">
              <span className="text-[10px] uppercase font-['Cinzel',serif] tracking-widest text-[#fde047] font-semibold">
                Son of KK Babu & KL Mani • Keralam
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider text-[#fef08a] font-['Cinzel',serif]">
                Chi. Vishnu KB
              </h2>
              <span className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-[#1e0407] border border-[#c59b27]/60 text-[#fde047] font-bold tracking-widest text-[10px] uppercase">
                THE GROOM
              </span>
            </div>

            {/* Groom Real Photo Portrait Container */}
            <div className="relative mx-auto w-36 h-44 sm:w-44 sm:h-52 rounded-2xl bg-gradient-to-b from-[#7B0016]/40 to-[#1e0407]/90 border-2 border-[#D4AF37]/60 flex items-center justify-center overflow-hidden my-2 shadow-xl">
              <div className="absolute inset-1.5 border border-dashed border-[#D4AF37]/40 rounded-xl pointer-events-none z-20" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Photo Portrait with Gold Foil Trim */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#F5D061] to-[#AA7A1E] shadow-[0_0_20px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/groom_avatar.png"
                    alt="Chi. Vishnu KB"
                    className="w-full h-full object-cover rounded-full border-2 border-[#fffdf7]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/groom.jpg';
                    }}
                  />
                </div>
                <div className="mt-2.5 px-2.5 py-0.5 rounded-full bg-[#fde047]/20 border border-[#fde047]/40 text-[#fde047] text-[10px] font-semibold flex items-center gap-1">
                  <span>🌸</span>
                  <span>Rose & Jasmine Varmala</span>
                </div>
              </div>

              <span className="absolute top-2 left-3 text-sm z-20">🪙</span>
              <span className="absolute top-3 right-3 text-sm z-20">⭐</span>
            </div>

            {/* Stats */}
            <div className="space-y-1.5 mt-3 bg-[#1e0407]/70 rounded-xl p-2.5 border border-[#c59b27]/30 text-xs">
              <div className="flex items-center justify-between text-amber-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" /> Groom Speed
                </span>
                <span className="font-extrabold text-[#fde047] bg-[#fde047]/10 px-2 py-0.5 rounded text-[11px]">
                  MAX DASH ⚡
                </span>
              </div>
              <div className="flex items-center justify-between text-amber-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Heart className="w-3.5 h-3.5 text-rose-400" /> Mission
                </span>
                <span className="font-semibold text-rose-300 text-[11px]">
                  Run to Akshitha! 👰🏽
                </span>
              </div>
            </div>
          </div>

          {/* Selection indicator */}
          <div className="mt-3 pt-2 border-t border-[#c59b27]/25 flex items-center justify-center">
            <span
              className={`text-[10px] font-['Cinzel',serif] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full transition-all ${
                selected === 'vishnu'
                  ? 'bg-gradient-to-r from-[#fde047] to-[#facc15] text-[#3d090d] shadow-md font-black ring-2 ring-[#fde047]/50'
                  : 'bg-[#3b0b10] text-[#a8747a]'
              }`}
            >
              {selected === 'vishnu' ? '✓ Selected Groom' : 'Choose Vishnu'}
            </span>
          </div>
        </div>

        {/* Akshitha (The Bride) Card */}
        <div
          onClick={() => setSelected('akshitha')}
          className={`relative group cursor-pointer rounded-3xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 ${
            selected === 'akshitha'
              ? 'bg-gradient-to-b from-[#521319] via-[#661821] to-[#3a0c10] border-[#fb7185] ring-4 ring-[#fb7185]/30 scale-[1.02] shadow-2xl shadow-rose-950/50'
              : 'bg-[#29070a]/75 hover:bg-[#380b0f]/90 border-[#c59b27]/30 hover:border-[#c59b27]/70 opacity-80 hover:opacity-100 hover:scale-[1.01]'
          }`}
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#e11d48] via-[#fb7185] to-[#e11d48]" />

          <div className="pt-2">
            <div className="text-center mb-2">
              <span className="text-[10px] uppercase font-['Cinzel',serif] tracking-widest text-rose-300 font-semibold">
                Daughter of ShivKumar & Uma Devi • Andhra
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider text-rose-200 font-['Cinzel',serif]">
                Sow. Akshitha Sri Tekki
              </h2>
              <span className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-[#1e0407] border border-[#fb7185]/60 text-rose-200 font-bold tracking-widest text-[10px] uppercase">
                THE BRIDE
              </span>
            </div>

            {/* Bride Real Photo Portrait Container */}
            <div className="relative mx-auto w-36 h-44 sm:w-44 sm:h-52 rounded-2xl bg-gradient-to-b from-[#7B0016]/40 to-[#1e0407]/90 border-2 border-rose-400/60 flex items-center justify-center overflow-hidden my-2 shadow-xl">
              <div className="absolute inset-1.5 border border-dashed border-rose-400/40 rounded-xl pointer-events-none z-20" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Photo Portrait with Rose Gold Trim */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#fb7185] via-[#f43f5e] to-[#be123c] shadow-[0_0_20px_rgba(244,63,94,0.45)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/bride_avatar.png"
                    alt="Sow. Akshitha Sri Tekki"
                    className="w-full h-full object-cover rounded-full border-2 border-[#fffdf7]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/bride.jpg';
                    }}
                  />
                </div>
                <div className="mt-2.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-[10px] font-semibold flex items-center gap-1">
                  <span>🌼</span>
                  <span>Jasmine Gajra & Kanjeevaram</span>
                </div>
              </div>

              <span className="absolute top-2 right-3 text-sm z-20">💖</span>
              <span className="absolute top-3 left-3 text-sm z-20">✨</span>
            </div>

            {/* Stats */}
            <div className="space-y-1.5 mt-3 bg-[#1e0407]/70 rounded-xl p-2.5 border border-rose-500/30 text-xs">
              <div className="flex items-center justify-between text-rose-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" /> Bride Agility
                </span>
                <span className="font-extrabold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded text-[11px]">
                  DOUBLE JUMP 🦘
                </span>
              </div>
              <div className="flex items-center justify-between text-rose-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Heart className="w-3.5 h-3.5 text-amber-400" /> Mission
                </span>
                <span className="font-semibold text-amber-300 text-[11px]">
                  Run to Vishnu! 🤵🏽
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-rose-500/25 flex items-center justify-center">
            <span
              className={`text-[10px] font-['Cinzel',serif] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full transition-all ${
                selected === 'akshitha'
                  ? 'bg-gradient-to-r from-rose-400 to-rose-300 text-[#3d090d] shadow-md font-black ring-2 ring-rose-400/50'
                  : 'bg-[#3b0b10] text-[#a8747a]'
              }`}
            >
              {selected === 'akshitha' ? '✓ Selected Bride' : 'Choose Akshitha'}
            </span>
          </div>
        </div>
      </div>

      {/* Start Button & Controls Hint */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2 my-2">
        <button
          onClick={handleStart}
          className="w-full py-3.5 px-6 rounded-2xl font-['Cinzel',serif] font-bold text-base sm:text-lg tracking-wider uppercase text-[#1a0507] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#fde047] hover:from-[#fef08a] hover:to-[#facc15] border-2 border-[#fef08a] shadow-xl shadow-amber-950/60 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
        >
          <Play className="w-5 h-5 fill-[#1a0507]" />
          START WEDDING RUSH!
        </button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-[#fde047]/80 font-medium">
          <span>Jump: <kbd className="px-1.5 py-0.5 rounded bg-[#1e0407] border border-[#c59b27]/60 text-amber-200">↑ / Space</kbd></span>
          <span>Slide: <kbd className="px-1.5 py-0.5 rounded bg-[#1e0407] border border-[#c59b27]/60 text-amber-200">↓ / S</kbd></span>
        </div>
      </div>
    </div>
  );
};
