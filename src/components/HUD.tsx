import React from 'react';
import { CharacterType } from '../types';
import { Heart, Pause, Play, Volume2, VolumeX, Shield, Sparkles, BookOpen } from 'lucide-react';

interface HUDProps {
  character: CharacterType;
  partner: CharacterType;
  score: number;
  coins: number;
  laddus: number;
  distance: number;
  targetDistance: number;
  hearts: number;
  shieldActive: boolean;
  magnetActive: boolean;
  isPaused: boolean;
  isMuted: boolean;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onOpenPortal?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  character,
  partner,
  score,
  coins,
  laddus,
  distance,
  targetDistance,
  hearts,
  shieldActive,
  magnetActive,
  isPaused,
  isMuted,
  onTogglePause,
  onToggleMute,
  onOpenPortal,
}) => {
  const progressPercent = Math.min(100, Math.floor((distance / targetDistance) * 100));

  const playerImgSrc = character === 'vishnu' ? '/groom_avatar.png' : '/bride_avatar.png';
  const partnerImgSrc = partner === 'vishnu' ? '/groom_avatar.png' : '/bride_avatar.png';

  return (
    <div className="absolute top-0 inset-x-0 p-3 sm:p-4 pointer-events-none flex flex-col gap-2 z-30 select-none">
      {/* Top Bar: Controls + Hearts + Stats */}
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
        {/* Left: Player Avatar, Hearts, Date Pill & Power-ups */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Player Mini Avatar Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#F5D061] shadow-lg flex-shrink-0">
            <img
              src={playerImgSrc}
              alt={character === 'vishnu' ? 'Vishnu' : 'Akshitha'}
              className="w-full h-full object-cover rounded-full border border-[#fffdf7]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = character === 'vishnu' ? '/groom.jpg' : '/bride.jpg';
              }}
            />
          </div>

          {/* Hearts container */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#230407]/85 backdrop-blur-md border border-[#c59b27]/40 shadow-lg">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  h <= hearts
                    ? 'fill-rose-500 text-rose-500 scale-100 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                    : 'fill-stone-800 text-stone-600 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Wedding Date Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#230407]/85 backdrop-blur-md border border-[#c59b27]/40 text-[#fef08a] text-xs font-['Cinzel',serif] font-bold shadow-lg">
            <span>🪔</span>
            <span>18th Feb • Muhurtham</span>
          </div>

          {/* Active Power-up Badges */}
          {shieldActive && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-950/90 border border-sky-400 text-sky-200 text-xs font-bold animate-pulse shadow-md">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Kalash Shield!</span>
            </div>
          )}

          {magnetActive && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-950/90 border border-rose-400 text-rose-200 text-xs font-bold animate-pulse shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Garland Magnet!</span>
            </div>
          )}
        </div>

        {/* Right: Scores & Action Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Stats Chips */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 shadow-lg text-xs sm:text-sm font-black">
            {/* Coins */}
            <div className="flex items-center gap-1 text-amber-300">
              <span className="text-sm sm:text-base">🪙</span>
              <span>{coins}</span>
            </div>

            {/* Laddus */}
            <div className="flex items-center gap-1 text-orange-400 border-l border-white/10 pl-2">
              <span className="text-sm sm:text-base">🟡</span>
              <span>{laddus}</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1 text-yellow-200 border-l border-white/10 pl-2">
              <span className="text-xs text-amber-400/80 font-semibold uppercase">Score</span>
              <span>{score}</span>
            </div>
          </div>

          {/* Portal Switcher Button if available */}
          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-[#7B0016]/90 backdrop-blur-md border border-[#c59b27] text-[#fef08a] text-xs font-['Cinzel',serif] font-bold hover:bg-[#8f1025] transition-all shadow-lg active:scale-95"
              title="View Wedding Details Portal"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#fef08a]" />
              <span>Portal</span>
            </button>
          )}

          {/* Pause / Resume */}
          <button
            onClick={onTogglePause}
            className="p-2 sm:p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-200 hover:bg-amber-900/60 transition-all hover:scale-105 active:scale-95 shadow-lg"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-200 hover:bg-amber-900/60 transition-all hover:scale-105 active:scale-95 shadow-lg"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Wedding Mandap Distance Progress Bar */}
      <div className="w-full max-w-xl mx-auto px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/35 shadow-xl pointer-events-auto">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-amber-200 mb-1">
          <div className="flex items-center gap-1.5">
            <img
              src={playerImgSrc}
              alt=""
              className="w-4 h-4 rounded-full object-cover border border-[#c59b27]"
            />
            <span>{character === 'vishnu' ? 'Vishnu' : 'Akshitha'}</span>
            <span className="text-amber-400 font-normal">sprinting</span>
          </div>

          <div className="text-[#fde047] font-mono">
            {distance}m / {targetDistance}m
          </div>

          <div className="flex items-center gap-1.5 text-rose-300">
            <span>Mandap</span>
            <img
              src={partnerImgSrc}
              alt=""
              className="w-4 h-4 rounded-full object-cover border border-rose-400"
            />
            <span>{partner === 'akshitha' ? 'Akshitha' : 'Vishnu'}</span>
          </div>
        </div>

        {/* Progress track */}
        <div className="relative w-full h-3 rounded-full bg-stone-900/90 border border-amber-600/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-yellow-400 rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
