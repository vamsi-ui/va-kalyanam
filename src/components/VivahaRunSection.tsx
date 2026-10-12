import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { CharacterType, GameState } from '../types';
import { WeddingCanvas } from './WeddingCanvas';
import { HUD } from './HUD';
import { ControlsOverlay } from './ControlsOverlay';
import { WinModal } from './WinModal';
import { GameOverModal } from './GameOverModal';
import { soundManager } from '../audio/soundManager';
import {
  ThirunamamSymbol,
  NilavilakkuSymbol,
  GajaSymbol,
  PadmaSymbol,
  RedGoldDivider,
  CornerFlourish,
} from './RedGoldSymbols';
import {
  Sparkles,
  Heart,
  Zap,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Trophy,
  Shield,
  Layers,
} from 'lucide-react';

interface VivahaRunSectionProps {
  onOpenFullscreen: () => void;
  onOpenSuite: () => void;
}

export function VivahaRunSection({ onOpenFullscreen, onOpenSuite }: VivahaRunSectionProps) {
  const [gameState, setGameState] = useState<GameState>('select');
  const [character, setCharacter] = useState<CharacterType>('vishnu');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [gameKey, setGameKey] = useState<number>(1);

  const [stats, setStats] = useState({
    score: 0,
    coins: 0,
    laddus: 0,
    distance: 0,
    targetDistance: 500,
    hearts: 3,
    shieldActive: false,
    magnetActive: false,
  });

  const partner: CharacterType = character === 'vishnu' ? 'akshitha' : 'vishnu';

  const handleToggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  }, [isMuted]);

  const handleSelectCharacter = (chosen: CharacterType) => {
    setCharacter(chosen);
    setStats({
      score: 0,
      coins: 0,
      laddus: 0,
      distance: 0,
      targetDistance: 500,
      hearts: 3,
      shieldActive: false,
      magnetActive: false,
    });
    setGameKey((k) => k + 1);
    setGameState('playing');
  };

  const handleUpdateStats = useCallback(
    (update: {
      score?: number;
      coins?: number;
      laddus?: number;
      distance?: number;
      hearts?: number;
      shieldActive?: boolean;
      magnetActive?: boolean;
    }) => {
      setStats((prev) => ({ ...prev, ...update }));
    },
    []
  );

  const handleRestart = () => {
    setStats({
      score: 0,
      coins: 0,
      laddus: 0,
      distance: 0,
      targetDistance: 500,
      hearts: 3,
      shieldActive: false,
      magnetActive: false,
    });
    setGameKey((k) => k + 1);
    setGameState('playing');
  };

  const handleGoToSelect = () => {
    soundManager.stopMusic();
    setGameState('select');
  };

  const handleTogglePause = () => {
    setGameState((prev) => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-[#2A0609] via-[#38080D] to-[#250306] text-white overflow-hidden">
      {/* Decorative Traditional Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23D4AF37' stroke-width='1.5' stroke-dasharray='4 3'/%3E%3Ccircle cx='40' cy='40' r='12' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Cpath d='M40 5 L40 75 M5 40 L75 40' stroke='%23D4AF37' stroke-width='0.75' stroke-dasharray='2 3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header: Sacred Emblems & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          {/* Symmetrical Crest */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2">
            <NilavilakkuSymbol size={32} />
            <ThirunamamSymbol size={50} />
            <NilavilakkuSymbol size={32} className="scale-x-[-1]" />
          </div>

          <span className="text-xs font-['Cinzel',serif] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            || विवाह धावनम् • VIVAHA RUN ||
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FFFDD0] tracking-wide mt-1">
            The Royal Wedding Rush
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic max-w-xl mx-auto mt-2">
            Help Chi. Vishnu KB & Sow. Akshitha Sri Tekki sprint down the sacred wedding path, collecting golden laddus and blessings to exchange Varmala garlands at the Mandap!
          </p>

          <RedGoldDivider symbol="thirunamam" className="!my-3" />
        </motion.div>

        {/* The Royal Arcade Pavilion Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-b from-[#1E0407] to-[#120204] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Ornate Corner Flourishes */}
          <CornerFlourish position="top-left" size={36} />
          <CornerFlourish position="top-right" size={36} />
          <CornerFlourish position="bottom-left" size={36} />
          <CornerFlourish position="bottom-right" size={36} />

          {/* Pavilion Top Marquee Bar */}
          <div className="bg-[#2D060A] border-b border-[#D4AF37]/40 px-4 py-2.5 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-['Cinzel',serif] text-xs font-bold text-[#F5D061] tracking-wider uppercase">
                {gameState === 'select' ? 'Choose Your Runner' : `${character === 'vishnu' ? 'Chi. Vishnu KB' : 'Sow. Akshitha Sri Tekki'} Racing to Mandap`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-full bg-black/40 hover:bg-[#881323] text-amber-300 border border-[#D4AF37]/40 text-xs transition-all"
                title={isMuted ? 'Unmute Game' : 'Mute Game'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={onOpenFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#2A0609] font-['Cinzel',serif] text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen Arcade</span>
              </button>
            </div>
          </div>

          {/* VIEWPORT AREA */}
          <div className="relative w-full h-[520px] sm:h-[580px] bg-[#1a0305] overflow-hidden">
            {/* 1. Character Select View */}
            {gameState === 'select' && (
              <div className="absolute inset-0 p-4 sm:p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
                <span className="text-[11px] sm:text-xs font-['Cinzel',serif] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  Select Your Wedding Runner
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#FFFDD0] mt-1 mb-6">
                  Who will lead the procession?
                </h3>

                {/* Character Cards with Real Photo Avatars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-2xl w-full mb-6">
                  {/* Vishnu KB (Groom) */}
                  <div
                    onClick={() => handleSelectCharacter('vishnu')}
                    className="group cursor-pointer bg-gradient-to-b from-[#2D060A] to-[#1F0407] p-5 rounded-2xl border-2 border-[#D4AF37]/50 hover:border-[#F5D061] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex flex-col items-center relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#7B0016] text-[#F5D061] text-[10px] font-bold border border-[#D4AF37]/40">
                      Groom
                    </div>
                    {/* Real photo avatar */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFFDD0] to-[#D4AF37] shadow-xl group-hover:scale-105 transition-transform mb-3">
                      <img
                        src="/groom_avatar.png"
                        alt="Chi. Vishnu KB"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/groom.jpg';
                        }}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h4 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#F5D061]">
                      Chi. Vishnu KB
                    </h4>
                    <p className="text-xs text-amber-200/80 font-serif italic mb-3">
                      The Noble Groom • Speed Runner
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#FFFDD0] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30 mb-4">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Special: Swift Double Jump</span>
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#2A0609] font-['Cinzel',serif] text-xs font-black tracking-wider uppercase group-hover:shadow-lg transition-all flex items-center justify-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-[#2A0609]" />
                      <span>Run as Vishnu</span>
                    </button>
                  </div>

                  {/* Akshitha Sri Tekki (Bride) */}
                  <div
                    onClick={() => handleSelectCharacter('akshitha')}
                    className="group cursor-pointer bg-gradient-to-b from-[#2D060A] to-[#1F0407] p-5 rounded-2xl border-2 border-[#D4AF37]/50 hover:border-[#F5D061] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex flex-col items-center relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#7B0016] text-[#F5D061] text-[10px] font-bold border border-[#D4AF37]/40">
                      Bride
                    </div>
                    {/* Real photo avatar */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFFDD0] to-[#D4AF37] shadow-xl group-hover:scale-105 transition-transform mb-3">
                      <img
                        src="/bride_avatar.png"
                        alt="Sow. Akshitha Sri Tekki"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/bride.jpg';
                        }}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h4 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#F5D061]">
                      Sow. Akshitha Sri Tekki
                    </h4>
                    <p className="text-xs text-amber-200/80 font-serif italic mb-3">
                      The Radiant Bride • Graceful Runner
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#FFFDD0] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30 mb-4">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span>Special: Laddu Magnet Boost</span>
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#2A0609] font-['Cinzel',serif] text-xs font-black tracking-wider uppercase group-hover:shadow-lg transition-all flex items-center justify-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-[#2A0609]" />
                      <span>Run as Akshitha</span>
                    </button>
                  </div>
                </div>

                {/* Quick Hint */}
                <p className="text-[11px] text-amber-200/60 font-serif">
                  Press <strong>Space / Up</strong> to Jump (Double Jump supported) • Press <strong>Down</strong> to Slide under obstacles
                </p>
              </div>
            )}

            {/* 2. Active Game Canvas */}
            {gameState !== 'select' && (
              <div className="relative w-full h-full">
                <WeddingCanvas
                  key={gameKey}
                  character={character}
                  partner={partner}
                  isPaused={gameState === 'paused'}
                  gameState={gameState}
                  onUpdateStats={handleUpdateStats}
                  onGameOver={() => setGameState('gameover')}
                  onWin={() => setGameState('won')}
                />

                {/* Integrated In-Game HUD */}
                <HUD
                  character={character}
                  partner={partner}
                  score={stats.score}
                  coins={stats.coins}
                  laddus={stats.laddus}
                  distance={stats.distance}
                  targetDistance={stats.targetDistance}
                  hearts={stats.hearts}
                  shieldActive={stats.shieldActive}
                  magnetActive={stats.magnetActive}
                  isPaused={gameState === 'paused'}
                  isMuted={isMuted}
                  onTogglePause={handleTogglePause}
                  onToggleMute={handleToggleMute}
                  onOpenPortal={() => {}}
                />

                {/* Touch Controls for mobile phones */}
                {gameState === 'playing' && <ControlsOverlay />}

                {/* Pause Overlay inside pavilion */}
                {gameState === 'paused' && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                    <div className="bg-[#1F0407] border-2 border-[#D4AF37] rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl">
                      <h4 className="font-['Cinzel',serif] text-lg font-bold text-[#F5D061] mb-1">
                        MANDAP PAUSED
                      </h4>
                      <p className="text-xs text-amber-200/80 font-serif italic mb-4">
                        Catch your breath before the auspicious moment!
                      </p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleTogglePause}
                          className="py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-[#2A0609] font-['Cinzel',serif] flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#2A0609]" />
                          RESUME
                        </button>
                        <button
                          onClick={handleRestart}
                          className="py-2 px-4 rounded-xl text-xs bg-[#3A060C] hover:bg-[#52000E] text-[#FFFDD0] border border-[#D4AF37]/50 font-['Cinzel',serif]"
                        >
                          RESTART
                        </button>
                        <button
                          onClick={handleGoToSelect}
                          className="text-xs text-amber-300 underline underline-offset-2 py-1"
                        >
                          Change Runner
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* In-Pavilion Win Modal */}
                {gameState === 'won' && (
                  <WinModal
                    character={character}
                    partner={partner}
                    score={stats.score}
                    coins={stats.coins}
                    laddus={stats.laddus}
                    onRestart={handleRestart}
                    onSelectCharacter={handleGoToSelect}
                    onOpenPortal={() => {
                      const el = document.getElementById('events');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                )}

                {/* In-Pavilion Game Over Modal */}
                {gameState === 'gameover' && (
                  <GameOverModal
                    character={character}
                    distance={stats.distance}
                    targetDistance={stats.targetDistance}
                    score={stats.score}
                    coins={stats.coins}
                    onRestart={handleRestart}
                    onSelectCharacter={handleGoToSelect}
                    onOpenPortal={() => {
                      const el = document.getElementById('events');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Pavilion Footer Bar */}
          <div className="bg-[#1E0407] border-t border-[#D4AF37]/40 px-4 py-3 flex items-center justify-between text-xs text-amber-200/80 flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span>🎯 Goal: 500m to the Mandap</span>
              <span>🍬 Collect Laddus for Blessing Bonus</span>
            </div>
            <div className="flex items-center gap-3">
              {gameState !== 'select' && (
                <button
                  onClick={handleGoToSelect}
                  className="text-amber-300 hover:text-white underline underline-offset-2 font-medium"
                >
                  Change Character
                </button>
              )}
              <button
                onClick={onOpenSuite}
                className="text-amber-300 hover:text-white underline underline-offset-2 font-medium"
              >
                View Wedding Invitation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
