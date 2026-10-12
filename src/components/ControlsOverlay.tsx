import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const ControlsOverlay: React.FC = () => {
  const triggerJump = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('game-action-jump'));
  };

  const triggerSlide = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('game-action-slide'));
  };

  return (
    <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-30 select-none">
      {/* Slide Button (Left) */}
      <button
        onMouseDown={triggerSlide}
        onTouchStart={triggerSlide}
        className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-b from-[#7f1d1d]/90 to-[#501115]/95 hover:from-[#991b1b] hover:to-[#5c1419] border-2 border-[#c59b27] text-[#fef08a] font-['Cinzel',serif] font-bold text-base shadow-xl backdrop-blur-md active:scale-90 transition-transform"
      >
        <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        <span>SLIDE</span>
      </button>

      {/* Jump Button (Right) */}
      <button
        onMouseDown={triggerJump}
        onTouchStart={triggerJump}
        className="pointer-events-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-[#c59b27] to-[#8c6710] hover:from-[#d4af37] hover:to-[#a37914] border-2 border-[#fef08a] text-[#2a0609] font-['Cinzel',serif] font-black text-base shadow-xl backdrop-blur-md active:scale-90 transition-transform"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        <span>JUMP</span>
      </button>
    </div>
  );
};
