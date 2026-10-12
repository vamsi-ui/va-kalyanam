import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, Play, Pause, Upload, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// The audio file /theme-song.mp3 is trimmed directly to start at the 50s mark.
// Total song duration is 5:12 (312s). 50s to end = 262s.
const START_OFFSET_SECONDS = 50; 
const TOTAL_SONG_DURATION = 312; // 5m 12s

const AUDIO_FALLBACKS = [
  '/theme-song.mp3',
  '/theme-song-50s.mp3',
  '/neetho.mp3',
  '/song.mp3',
  '/theme.mp3',
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sourceIndex, setSourceIndex] = useState<number>(0);
  const [songTitle, setSongTitle] = useState<string>('Neetho • The NonViolinist Project');
  const [songSubtitle, setSongSubtitle] = useState<string>('Gowtham Bharadwaj & Saathvika Raj');
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:50');
  const [durationFormatted, setDurationFormatted] = useState<string>('5:12');
  const [progress, setProgress] = useState<number>(0);
  const [hasPromptDismissed, setHasPromptDismissed] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Safe Play invocation that handles browser autoplay restrictions
  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.7;
      audio.muted = isMuted;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setHasPromptDismissed(true);
      }
    } catch (err) {
      console.warn('Autoplay restricted by browser, awaiting user gesture:', err);
      setIsPlaying(false);
    }
  }, [isMuted]);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      playAudio();
      return;
    }

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isPlaying, isMuted, playAudio]);

  const handleRestart = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      playAudio();
    }
  }, [playAudio]);

  // Global user interaction listener to initiate audio on first tap/click
  useEffect(() => {
    let unlocked = false;

    const unlockOnGesture = () => {
      if (unlocked) return;
      unlocked = true;
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.7;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasPromptDismissed(true);
          })
          .catch(() => {
            // User did not interact with audio directly or permissions still pending
          });
      }
    };

    // Try immediate autoplay first
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPromptDismissed(true);
        })
        .catch(() => {
          // Normal: browsers block unmuted autoplay without prior interaction
        });
    }

    window.addEventListener('click', unlockOnGesture, { once: true, passive: true });
    window.addEventListener('touchstart', unlockOnGesture, { once: true, passive: true });
    window.addEventListener('pointerdown', unlockOnGesture, { once: true, passive: true });
    window.addEventListener('keydown', unlockOnGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', unlockOnGesture);
      window.removeEventListener('touchstart', unlockOnGesture);
      window.removeEventListener('pointerdown', unlockOnGesture);
      window.removeEventListener('keydown', unlockOnGesture);
    };
  }, []);

  // Update time display mapping file time (0 to 262s) to song time (50s to 312s)
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const fileCurrent = audio.currentTime || 0;
    const fileDuration = audio.duration || (TOTAL_SONG_DURATION - START_OFFSET_SECONDS);

    // Virtual Song Current Time: starting at 50s
    const virtualCurrent = Math.min(TOTAL_SONG_DURATION, Math.floor(fileCurrent + START_OFFSET_SECONDS));
    const curMins = Math.floor(virtualCurrent / 60);
    const curSecs = (virtualCurrent % 60).toString().padStart(2, '0');
    setCurrentTimeFormatted(`${curMins}:${curSecs}`);

    // Total song duration is 5:12
    setDurationFormatted('5:12');

    // Progress percentage from 50s to 312s
    const pct = Math.min(100, Math.max(0, (fileCurrent / fileDuration) * 100));
    setProgress(pct);
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const handleAudioError = () => {
    console.warn(`Audio source ${AUDIO_FALLBACKS[sourceIndex]} failed to load. Trying fallback...`);
    if (sourceIndex + 1 < AUDIO_FALLBACKS.length) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setLoadError(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      const objUrl = URL.createObjectURL(file);
      audioRef.current.src = objUrl;
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setSongTitle(cleanName);
      setSongSubtitle('Custom Wedding Track');
      setLoadError(false);
      audioRef.current.currentTime = 0;
      playAudio();
    }
  };

  const currentSource = AUDIO_FALLBACKS[sourceIndex];

  return (
    <div className="fixed top-3 sm:top-5 right-3 sm:right-6 z-50 flex items-center gap-2 max-w-[calc(100vw-24px)] select-none">
      {/* Hidden file input for uploading custom audio if desired */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      <AnimatePresence>
        {/* Active Player Card with live sound bars, controls, and progress */}
        {isPlaying && !isMuted ? (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="flex flex-col justify-center px-3 py-1.5 bg-[#3e060c]/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/60 text-[#FFFDD0] shadow-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Animated audio equalizer bars */}
              <div className="flex items-end gap-[2px] h-3.5 w-3 shrink-0">
                <span className="w-[2px] bg-[#F5D061] rounded-full animate-pulse h-3" />
                <span className="w-[2px] bg-[#D4AF37] rounded-full animate-bounce h-2" />
                <span className="w-[2px] bg-[#F5D061] rounded-full animate-pulse h-3.5" />
              </div>

              {/* Song details */}
              <div className="flex flex-col text-left pr-1 max-w-[140px] sm:max-w-[210px]">
                <span className="font-semibold text-[#fef08a] truncate text-[11px] leading-tight">
                  {songTitle}
                </span>
                <span className="text-[9px] text-[#F5D061]/80 truncate leading-tight">
                  {songSubtitle}
                </span>
              </div>

              {/* Action buttons inside card */}
              <div className="flex items-center gap-1 border-l border-[#D4AF37]/30 pl-1.5 ml-0.5">
                {/* Pause */}
                <button
                  onClick={pauseAudio}
                  title="Pause music"
                  className="p-1 rounded-full hover:bg-black/40 text-[#F5D061] active:scale-95 transition-all"
                >
                  <Pause size={12} />
                </button>

                {/* Replay from 0:50 */}
                <button
                  onClick={handleRestart}
                  title="Replay from 0:50"
                  className="p-1 rounded-full hover:bg-black/40 text-[#D4AF37] active:scale-95 transition-all"
                >
                  <RotateCcw size={12} />
                </button>

                {/* Upload own audio */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload another music file"
                  className="p-1 rounded-full hover:bg-black/40 text-[#D4AF37] active:scale-95 transition-all"
                >
                  <Upload size={11} />
                </button>
              </div>
            </div>

            {/* Subtle Gold Progress Line from 0:50 to 5:12 */}
            <div className="mt-1 flex items-center justify-between gap-1.5 text-[8px] text-[#F5D061]/80 font-mono">
              <span>0:50 ({currentTimeFormatted})</span>
              <div className="flex-1 h-[2px] bg-[#680012] rounded-full overflow-hidden mx-1">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFFDD0] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{durationFormatted}</span>
            </div>
          </motion.div>
        ) : (
          /* When paused or waiting for gesture: Prominent interactive play pill */
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={playAudio}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#4a080e]/95 hover:bg-[#680012] backdrop-blur-md rounded-full border border-[#D4AF37]/80 text-[#FFFDD0] shadow-xl active:scale-95 transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#4a080e] shadow-inner group-hover:scale-105 transition-transform">
              <Play size={11} className="fill-[#4a080e] translate-x-[1px]" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-semibold text-[#fef08a] text-[11px] flex items-center gap-1">
                Play Neetho
                <Sparkles size={9} className="text-[#F5D061]" />
              </span>
              <span className="text-[9px] text-[#D4AF37]">
                Starts at 0:50
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Play / Mute Floating Round Button */}
      <button
        onClick={toggleMute}
        aria-label={isPlaying && !isMuted ? 'Mute wedding music' : 'Play wedding music'}
        title={isPlaying ? (isMuted ? 'Unmute' : 'Mute') : 'Play Neetho theme song (from 0:50)'}
        className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8B0000] to-[#55000d] rounded-full flex items-center justify-center text-[#D4AF37] hover:from-[#A00000] hover:to-[#680012] active:scale-95 transition-all border-2 border-[#D4AF37] shadow-2xl shrink-0"
      >
        {isMuted || !isPlaying ? (
          <VolumeX size={19} className="text-amber-200/90" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Volume2 size={19} className="text-[#FFFDD0]" />
          </motion.div>
        )}

        {/* Pulse ring when music is ready but paused */}
        {!isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/50 animate-ping pointer-events-none" />
        )}
      </button>

      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentSource}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onError={handleAudioError}
        preload="auto"
      />
    </div>
  );
}
