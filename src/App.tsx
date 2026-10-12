/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { CharacterType, GameState } from './types';
import { CharacterSelect } from './components/CharacterSelect';
import { WeddingCanvas } from './components/WeddingCanvas';
import { HUD } from './components/HUD';
import { ControlsOverlay } from './components/ControlsOverlay';
import { WinModal } from './components/WinModal';
import { GameOverModal } from './components/GameOverModal';
import { soundManager } from './audio/soundManager';

// Royal Wedding Website Components (Original Portal)
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingNav } from './components/FloatingNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OurStory } from './components/OurStory';
import { EventsHub } from './components/EventsHub';
import { GallerySection } from './components/GallerySection';
import { Predictions } from './components/Predictions';
import { VenueLocation } from './components/VenueLocation';
import { VivahaRunSection } from './components/VivahaRunSection';
import { WaveDivider } from './components/WaveDivider';
import { InvitationSuiteModal } from './components/InvitationSuiteModal';
import {
  ThirunamamSymbol,
  NilavilakkuSymbol,
  GajaSymbol,
  PadmaSymbol,
  RedGoldDivider,
  CornerFlourish,
} from './components/RedGoldSymbols';

import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Gamepad2,
  BookOpen,
  Play,
  RotateCcw,
} from 'lucide-react';

export default function App() {
  // Navigation & View States
  // The original wedding website is the primary view
  const [fullscreenArcade, setFullscreenArcade] = useState<boolean>(false);
  const [isSuiteOpen, setIsSuiteOpen] = useState<boolean>(false);

  // Active section for the floating navigation dock
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Fullscreen Game Engine States
  const [fsGameState, setFsGameState] = useState<GameState>('select');
  const [fsCharacter, setFsCharacter] = useState<CharacterType>('vishnu');
  const [fsIsMuted, setFsIsMuted] = useState<boolean>(false);
  const [fsGameKey, setFsGameKey] = useState<number>(1);

  const [fsStats, setFsStats] = useState({
    score: 0,
    coins: 0,
    laddus: 0,
    distance: 0,
    targetDistance: 500,
    hearts: 3,
    shieldActive: false,
    magnetActive: false,
  });

  const fsPartner: CharacterType = fsCharacter === 'vishnu' ? 'akshitha' : 'vishnu';

  // Track scroll position to update floating dock
  useEffect(() => {
    if (fullscreenArcade) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);

      const sectionIds = ['game', 'venue', 'predictions', 'gallery', 'events', 'story', 'home'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(id === 'venue' || id === 'predictions' ? 'events' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fullscreenArcade]);

  // Navigate between sections in wedding website
  const handleSectionNavigate = (sectionId: string) => {
    if (fullscreenArcade) {
      setFullscreenArcade(false);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  // Fullscreen game controls
  const handleFsToggleMute = useCallback(() => {
    const next = !fsIsMuted;
    setFsIsMuted(next);
    soundManager.setMuted(next);
  }, [fsIsMuted]);

  const handleFsSelectCharacter = useCallback((chosen: CharacterType) => {
    setFsCharacter(chosen);
    setFsStats({
      score: 0,
      coins: 0,
      laddus: 0,
      distance: 0,
      targetDistance: 500,
      hearts: 3,
      shieldActive: false,
      magnetActive: false,
    });
    setFsGameKey((k) => k + 1);
    setFsGameState('playing');
  }, []);

  const handleFsUpdateStats = useCallback(
    (update: {
      score?: number;
      coins?: number;
      laddus?: number;
      distance?: number;
      hearts?: number;
      shieldActive?: boolean;
      magnetActive?: boolean;
    }) => {
      setFsStats((prev) => ({ ...prev, ...update }));
    },
    []
  );

  const handleFsRestart = useCallback(() => {
    setFsStats({
      score: 0,
      coins: 0,
      laddus: 0,
      distance: 0,
      targetDistance: 500,
      hearts: 3,
      shieldActive: false,
      magnetActive: false,
    });
    setFsGameKey((k) => k + 1);
    setFsGameState('playing');
  }, []);

  const handleFsGoToSelect = useCallback(() => {
    soundManager.stopMusic();
    setFsGameState('select');
  }, []);

  const handleFsTogglePause = useCallback(() => {
    setFsGameState((prev) => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
  }, []);

  // Exit fullscreen and scroll to a section
  const handleExitFullscreen = (targetId = 'game') => {
    setFullscreenArcade(false);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="relative w-screen min-h-screen bg-[#2A0609] font-['Outfit',sans-serif] text-white">
      {/* Continuous Romantic Wedding Music Audio Player */}
      <AudioPlayer />

      {/* ========================================================================= */}
      {/* 1. FULLSCREEN ARCADE MODE (OPTIONAL IMMERSIVE VIEW FOR GUESTS)            */}
      {/* ========================================================================= */}
      {fullscreenArcade ? (
        <div className="relative w-screen h-screen overflow-hidden bg-[#1E0407]">
          {/* Pinned Top Bar to Return to Wedding Website */}
          <nav className="fixed top-3 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
            <button
              onClick={() => handleExitFullscreen('game')}
              className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e0407]/90 backdrop-blur-md border border-[#D4AF37] text-[#F5D061] text-xs font-['Cinzel',serif] font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>Back to Wedding Website</span>
            </button>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={() => setIsSuiteOpen(true)}
                className="px-3.5 py-2 rounded-full bg-[#1e0407]/90 backdrop-blur-md border border-[#D4AF37]/50 text-amber-200 text-xs font-['Cinzel',serif] flex items-center gap-1.5 shadow-xl hover:text-white transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Invitation Suite</span>
              </button>

              <button
                onClick={handleFsToggleMute}
                className="p-2 rounded-full bg-[#1e0407]/90 backdrop-blur-md border border-[#D4AF37]/50 text-amber-200 shadow-xl hover:text-white transition-all"
                title={fsIsMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {fsIsMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </nav>

          {/* Fullscreen Character Select */}
          {fsGameState === 'select' && (
            <CharacterSelect
              onSelectCharacter={handleFsSelectCharacter}
              isMuted={fsIsMuted}
              onToggleMute={handleFsToggleMute}
              onOpenPortal={() => handleExitFullscreen('home')}
              onOpenSuite={() => setIsSuiteOpen(true)}
            />
          )}

          {/* Fullscreen Game Canvas */}
          {fsGameState !== 'select' && (
            <div className="relative w-full h-full">
              <WeddingCanvas
                key={fsGameKey}
                character={fsCharacter}
                partner={fsPartner}
                isPaused={fsGameState === 'paused'}
                gameState={fsGameState}
                onUpdateStats={handleFsUpdateStats}
                onGameOver={() => setFsGameState('gameover')}
                onWin={() => setFsGameState('won')}
              />

              <HUD
                character={fsCharacter}
                partner={fsPartner}
                score={fsStats.score}
                coins={fsStats.coins}
                laddus={fsStats.laddus}
                distance={fsStats.distance}
                targetDistance={fsStats.targetDistance}
                hearts={fsStats.hearts}
                shieldActive={fsStats.shieldActive}
                magnetActive={fsStats.magnetActive}
                isPaused={fsGameState === 'paused'}
                isMuted={fsIsMuted}
                onTogglePause={handleFsTogglePause}
                onToggleMute={handleFsToggleMute}
                onOpenPortal={() => handleExitFullscreen('home')}
              />

              {fsGameState === 'playing' && <ControlsOverlay />}

              {/* Pause Modal */}
              {fsGameState === 'paused' && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center p-4">
                  <div className="bg-[#fffdf7] text-[#3d1217] border-4 border-[#c59b27] rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl">
                    <h3 className="text-xl font-bold text-[#881323] font-['Cinzel',serif] mb-1.5 tracking-wider">
                      MANDAP PAUSED
                    </h3>
                    <p className="text-xs text-[#6e373c] font-['Playfair_Display',serif] italic mb-4">
                      Catch your breath before the auspicious Varmala moment!
                    </p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleFsTogglePause}
                        className="py-2.5 px-4 rounded-xl font-bold text-xs bg-[#7f1d1d] hover:bg-[#6b1818] text-[#fef08a] border border-[#c59b27] flex items-center justify-center gap-1.5 font-['Cinzel',serif]"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#fef08a]" />
                        RESUME RUN
                      </button>
                      <button
                        onClick={handleFsRestart}
                        className="py-2 px-4 rounded-xl font-bold text-xs bg-[#f4ebd0] hover:bg-[#ebdcb9] text-[#7f1d1d] border border-[#c59b27]/50 flex items-center justify-center gap-1.5 font-['Cinzel',serif]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        RESTART
                      </button>
                      <button
                        onClick={handleFsGoToSelect}
                        className="py-1.5 px-4 rounded-xl text-xs text-[#854d0e] hover:text-[#7f1d1d] font-semibold underline underline-offset-2"
                      >
                        ← Character Select
                      </button>
                      <button
                        onClick={() => handleExitFullscreen('events')}
                        className="py-1 px-4 text-[11px] text-[#7f1d1d] font-bold hover:underline"
                      >
                        Return to Wedding Portal →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Win Modal */}
              {fsGameState === 'won' && (
                <WinModal
                  character={fsCharacter}
                  partner={fsPartner}
                  score={fsStats.score}
                  coins={fsStats.coins}
                  laddus={fsStats.laddus}
                  onRestart={handleFsRestart}
                  onSelectCharacter={handleFsGoToSelect}
                  onOpenPortal={() => handleExitFullscreen('events')}
                />
              )}

              {/* Game Over Modal */}
              {fsGameState === 'gameover' && (
                <GameOverModal
                  character={fsCharacter}
                  distance={fsStats.distance}
                  targetDistance={fsStats.targetDistance}
                  score={fsStats.score}
                  coins={fsStats.coins}
                  onRestart={handleFsRestart}
                  onSelectCharacter={handleFsGoToSelect}
                  onOpenPortal={() => handleExitFullscreen('events')}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. THE ORIGINAL WEDDING PORTAL (MAIN FULL EXPERIENCE)                     */
        /* ========================================================================= */
        <div className="relative w-full overflow-x-hidden min-h-screen bg-[#2A0609]">
          {/* Floating Navigation Dock (Thumb-friendly & Accessible) */}
          <FloatingNav
            activeSection={activeSection}
            onNavigate={handleSectionNavigate}
            scrollProgress={scrollProgress}
          />

          {/* 1. Welcome Screen (Hero Countdown, Red-Gold Symbols, Couple Polaroid) */}
          <div id="home">
            <WelcomeScreen onNavigate={(screen) => handleSectionNavigate(screen === 'game' ? 'game' : screen)} />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#680012" bottomColor="#FFFDD0" withGoldTrim={true} />

          {/* 2. Our Story (Scroll-triggered Black & White to Color Polaroid Effect) */}
          <div id="story">
            <OurStory />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#FFFDD0" bottomColor="#FAF9F6" withGoldTrim={true} />

          {/* 3. The Events Hub (Muhurtham at SAN Event Hall, Reception at MCC Lawn, Maps & Countdown) */}
          <div id="events">
            <EventsHub />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#FAF9F6" bottomColor="#FAF6ED" withGoldTrim={true} />

          {/* 4. Photo Gallery Section (With bride, groom, nischithartham removed as requested) */}
          <div id="gallery">
            <GallerySection />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#FAF6ED" bottomColor="#FFFDD0" withGoldTrim={true} />

          {/* 5. Wedding Predictions & Interactive Polls */}
          <div id="predictions">
            <Predictions />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#FFFDD0" bottomColor="#FAF6ED" withGoldTrim={true} />

          {/* 6. Venue & Directions */}
          <div id="venue">
            <VenueLocation />
          </div>

          {/* Wave Transition with Gold Filigree Trim */}
          <WaveDivider topColor="#FAF6ED" bottomColor="#2A0609" withGoldTrim={true} />

          {/* 7. VIVAHA RUN VIDEO GAME SECTION (INCORPORATED INTO THE WEDDING WEBSITE) */}
          <div id="game">
            <VivahaRunSection
              onOpenFullscreen={() => setFullscreenArcade(true)}
              onOpenSuite={() => setIsSuiteOpen(true)}
            />
          </div>

          {/* Grand Royal Red & Gold Wedding Footer */}
          <footer className="relative bg-gradient-to-b from-[#2A0609] via-[#38080D] to-[#1A0305] text-[#FAF6ED] pt-16 pb-24 px-4 overflow-hidden border-t-2 border-[#D4AF37]/50">
            {/* Corner Flourishes */}
            <CornerFlourish position="top-left" size={60} />
            <CornerFlourish position="top-right" size={60} />

            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
              {/* Sacred Thirunamam & Auspicious Nilavilakku Lamps */}
              <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
                <NilavilakkuSymbol size={44} />
                <ThirunamamSymbol size={64} />
                <NilavilakkuSymbol size={44} className="scale-x-[-1]" />
              </div>

              {/* Auspicious Shloka */}
              <div className="font-['Cinzel',serif] text-xs sm:text-sm text-[#D4AF37] tracking-widest uppercase mb-1">
                || माङ्गल्यं तन्तुनानेन मम जीवनहेतुना ||
              </div>
              <p className="text-xs text-amber-200/80 italic max-w-md mx-auto mb-6">
                "United by sacred vows, blessed by families and loved ones."
              </p>

              <RedGoldDivider symbol="thirunamam" />

              {/* Couple's Names & Dates */}
              <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-[#F5D061] tracking-wider mt-4">
                Akshitha Sri Tekki & Vishnu KB
              </h3>
              <p className="font-['Playfair_Display',serif] italic text-xs sm:text-sm text-amber-200/90 mt-1">
                When Keralam met Andhra — February 18th & 19th, 2027 • Chennai
              </p>

              {/* Bottom Quick Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#D4AF37] mt-8 pt-6 border-t border-[#D4AF37]/25 w-full max-w-md">
                <button
                  onClick={() => handleSectionNavigate('game')}
                  className="hover:text-white font-bold underline underline-offset-4 flex items-center gap-1"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> Play Vivaha Run
                </button>
                <span>•</span>
                <button
                  onClick={() => setIsSuiteOpen(true)}
                  className="hover:text-white font-bold underline underline-offset-4 flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" /> View Invitation Cards
                </button>
                <span>•</span>
                <a
                  href="https://maps.google.com/?q=SAN+Event+Hall+Kottivakkam+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-bold underline underline-offset-4"
                >
                  Venue Directions
                </a>
              </div>

              <div className="text-[11px] text-amber-200/60 mt-6 font-['Cinzel',serif] tracking-wider">
                With Love & Auspicious Blessings • 2027
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Lightbox Modal for Authentic Royal Invitation Cards Suite */}
      <InvitationSuiteModal isOpen={isSuiteOpen} onClose={() => setIsSuiteOpen(false)} />
    </div>
  );
}
