import React from 'react';
import { CharacterType } from '../types';
import { RotateCcw, Users, HeartOff, Clock, BookOpen } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface GameOverModalProps {
  character: CharacterType;
  distance: number;
  targetDistance: number;
  score: number;
  coins: number;
  onRestart: () => void;
  onSelectCharacter: () => void;
  onOpenPortal?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  character,
  distance,
  targetDistance,
  score,
  coins,
  onRestart,
  onSelectCharacter,
  onOpenPortal,
}) => {
  const playerImgSrc = character === 'vishnu' ? '/groom_avatar.png' : '/bride_avatar.png';

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-md bg-[#fffdf7] text-[#3d1217] border-4 border-[#c59b27] rounded-3xl p-6 text-center shadow-2xl">
        {/* Top Accent Ribbon */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#991b1b] via-[#c59b27] to-[#991b1b]" />

        {/* Character Avatar with Heart Icon */}
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-2">
          <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#AA7A1E] shadow-md">
            <img
              src={playerImgSrc}
              alt={character === 'vishnu' ? 'Vishnu' : 'Akshitha'}
              className="w-full h-full object-cover rounded-full border border-white filter grayscale-[30%]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = character === 'vishnu' ? '/groom.jpg' : '/bride.jpg';
              }}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#fef2f2] border border-rose-300 flex items-center justify-center shadow">
            <HeartOff className="w-4 h-4 text-[#dc2626]" />
          </div>
        </div>

        <h2 className="text-2xl font-black font-['Cinzel',serif] tracking-wider text-[#881323]">
          MANDAP DELAYED!
        </h2>

        <p className="mt-1.5 text-xs text-[#6e373c] font-['Playfair_Display',serif] italic">
          The Aunties held you for blessings and the photographers asked for one more candid photo!
        </p>

        {/* Distance Remaining */}
        <div className="my-3 px-4 py-2 rounded-2xl bg-[#fcf7ea] border border-[#d4af37]/60 text-xs text-[#7f1d1d]">
          <span className="font-bold">Reached {distance}m of {targetDistance}m</span>
          <div className="text-[11px] text-[#92400e] mt-0.5 font-medium">
            Just {targetDistance - distance}m left to the Mandap stage!
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around my-2 text-center bg-[#f4ebd0]/70 p-2 rounded-xl border border-[#c59b27]/30 text-xs">
          <div>
            <div className="text-base font-black text-[#881323]">🪙 {coins}</div>
            <div className="text-[10px] text-[#854d0e] uppercase font-bold">Coins</div>
          </div>
          <div>
            <div className="text-base font-black text-[#881323]">⭐ {score}</div>
            <div className="text-[10px] text-[#854d0e] uppercase font-bold">Score</div>
          </div>
        </div>

        {/* Wedding Date Reminder */}
        <div className="my-2.5 text-[11px] font-['Cinzel',serif] font-bold text-[#881323] flex items-center justify-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#b45309]" />
          <span>Muhurtham: 18th Feb | 10:55 AM</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            onClick={() => {
              soundManager.playCoin();
              onRestart();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-[#7f1d1d] hover:bg-[#6b1818] text-[#fef08a] border border-[#c59b27] transition-transform active:scale-95 flex items-center justify-center gap-1.5 font-['Cinzel',serif]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            TRY AGAIN
          </button>

          <button
            onClick={() => {
              soundManager.playCoin();
              onSelectCharacter();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-[#f4ebd0] hover:bg-[#ebdcb9] text-[#7f1d1d] border border-[#c59b27]/60 transition-transform active:scale-95 flex items-center justify-center gap-1.5 font-['Cinzel',serif]"
          >
            <Users className="w-3.5 h-3.5" />
            SWITCH HERO
          </button>
        </div>

        {onOpenPortal && (
          <div className="mt-2 text-center">
            <button
              onClick={onOpenPortal}
              className="text-xs text-[#854d0e] hover:text-[#7f1d1d] font-semibold underline underline-offset-2 flex items-center justify-center gap-1 mx-auto"
            >
              <BookOpen className="w-3 h-3" />
              <span>Explore Wedding Portal</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
