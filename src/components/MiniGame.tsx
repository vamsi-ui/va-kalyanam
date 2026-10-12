import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Heart, Trophy } from 'lucide-react';

type Character = 'akshitha' | 'vishnu' | null;
type Phase = 'select' | 'play' | 'reward';

export function MiniGame() {
  const [character, setCharacter] = useState<Character>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [progress, setProgress] = useState(0);
  const [tapBounce, setTapBounce] = useState(0);

  useEffect(() => {
    if (progress >= 100 && phase === 'play') {
      setPhase('reward');
    }
  }, [progress, phase]);

  const handleTap = () => {
    if (phase === 'play' && progress < 100) {
      setTapBounce(prev => prev + 1);
      setProgress(p => Math.min(p + 12.5, 100));
    }
  };

  const startGame = (char: Character) => {
    setCharacter(char);
    setPhase('play');
    setProgress(0);
  };

  const resetGame = () => {
    setPhase('select');
    setCharacter(null);
    setProgress(0);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center py-20 px-6"
    >
      {/* Background Subtle Florals */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5a2.5 2.5 0 0 1 5 0V16h15v2H25v2.5a2.5 2.5 0 0 1-5 0z' fill='%237B0016' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-10 h-10 mx-auto rounded-full bg-[#7B0016]/10 flex items-center justify-center text-[#7B0016] mb-3"
          >
            <Trophy size={18} />
          </motion.div>
          <motion.h2 
            viewport={{ once: true, amount: 0.3 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-[#7B0016] tracking-wide"
          >
            Pursuit of Love
          </motion.h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-medium">
            An Interactive Journey Together
          </p>
        </div>

        <div className="w-full relative flex flex-col justify-center items-center min-h-[380px]">
          <AnimatePresence mode="wait">
            {phase === 'select' && (
              <motion.div 
                key="select"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#D4AF37]/30"
              >
                <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2">Choose your player!</h3>
                <p className="text-xs text-gray-500 mb-6 font-light">Who will run towards their soulmate?</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => startGame('akshitha')}
                    className="group bg-gradient-to-b from-white to-[#FFFDD0]/30 p-5 rounded-xl shadow-md border-2 border-gray-100 hover:border-[#7B0016] hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center min-h-[48px]"
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] shadow-md overflow-hidden mb-3 group-hover:scale-110 transition-transform bg-[#7B0016]/10">
                      <img 
                        src="/bride_avatar.png" 
                        alt="Akshitha" 
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/bride.jpg'; }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="font-serif text-[#7B0016] text-lg font-semibold">Akshitha</span>
                    <span className="text-[10px] tracking-wider uppercase text-gray-500 mt-0.5">The Bride</span>
                  </button>

                  <button 
                    onClick={() => startGame('vishnu')}
                    className="group bg-gradient-to-b from-white to-[#FFFDD0]/30 p-5 rounded-xl shadow-md border-2 border-gray-100 hover:border-[#7B0016] hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center min-h-[48px]"
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] shadow-md overflow-hidden mb-3 group-hover:scale-110 transition-transform bg-[#D4AF37]/20">
                      <img 
                        src="/groom_avatar.png" 
                        alt="Vishnu" 
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/groom.jpg'; }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="font-serif text-[#7B0016] text-lg font-semibold">Vishnu</span>
                    <span className="text-[10px] tracking-wider uppercase text-gray-500 mt-0.5">The Groom</span>
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'play' && (
              <motion.div 
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                {/* Progress Indicator */}
                <div className="w-full max-w-md bg-gray-200/80 rounded-full h-3 mb-6 overflow-hidden border border-[#D4AF37]/30 shadow-inner">
                  <motion.div 
                    className="bg-gradient-to-r from-[#D4AF37] to-[#7B0016] h-full rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  />
                </div>

                {/* Track Arena */}
                <div 
                  className="w-full max-w-xl h-52 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-[#D4AF37]/30 shadow-xl relative overflow-hidden cursor-pointer select-none flex flex-col justify-between p-4"
                  onClick={handleTap}
                >
                  <div className="text-center text-gray-600 font-serif text-sm md:text-base pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 font-medium text-[#7B0016] bg-white/80 px-3 py-1 rounded-full shadow-xs">
                      <Sparkles size={14} className="text-[#D4AF37]" />
                      Tap repeatedly to sprint towards love! ({Math.round(progress)}%)
                    </span>
                  </div>

                  {/* Ground Line */}
                  <div className="w-full border-b-2 border-dashed border-[#D4AF37]/50 relative pb-10">
                    {/* Runner Avatar */}
                    <motion.div 
                      key={`runner-${tapBounce}`}
                      className="absolute bottom-1 left-4 pointer-events-none"
                      animate={{ 
                        left: `calc(5% + ${progress * 0.72}%)`,
                        y: [0, -14, 0],
                        rotate: [0, -6, 6, 0]
                      }}
                      transition={{ 
                        y: { repeat: Infinity, duration: 0.35, ease: 'easeInOut' },
                        rotate: { duration: 0.3 }
                      }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] shadow-xl overflow-hidden bg-white ring-2 ring-[#7B0016]">
                        <img 
                          src={character === 'akshitha' ? '/bride_avatar.png' : '/groom_avatar.png'} 
                          alt="Runner" 
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = character === 'akshitha' ? '/bride.jpg' : '/groom.jpg'; }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Waiting Partner Avatar */}
                    <motion.div 
                      className="absolute bottom-1 right-4 pointer-events-none"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] shadow-xl overflow-hidden bg-white ring-2 ring-[#D4AF37]">
                        <img 
                          src={character === 'akshitha' ? '/groom_avatar.png' : '/bride_avatar.png'} 
                          alt="Waiting Partner" 
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = character === 'akshitha' ? '/groom.jpg' : '/bride.jpg'; }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Tap Button CTA */}
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={handleTap}
                      className="px-8 py-3 bg-[#7B0016] text-[#FFFDD0] rounded-full uppercase tracking-widest text-xs font-semibold shadow-lg hover:bg-[#8B0000] active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Heart size={14} fill="#FFFDD0" />
                      <span>Tap to Run Faster</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'reward' && (
              <motion.div 
                key="reward"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                {/* Romantic Rose Exchange Animation */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <motion.div 
                    initial={{ scale: 0.8, x: -30 }}
                    animate={{ scale: 1.1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-[#D4AF37] shadow-xl overflow-hidden bg-white ring-4 ring-[#7B0016]/20"
                  >
                    <img 
                      src={character === 'akshitha' ? '/bride_avatar.png' : '/groom_avatar.png'} 
                      alt="Player" 
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = character === 'akshitha' ? '/bride.jpg' : '/groom.jpg'; }}
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                  
                  <motion.span 
                    initial={{ scale: 0, y: -20, rotate: -45 }}
                    animate={{ scale: 1.3, y: 0, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                    className="text-5xl md:text-6xl select-none"
                  >
                    🌹
                  </motion.span>
                  
                  <motion.div 
                    initial={{ scale: 0.8, x: 30 }}
                    animate={{ scale: 1.1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-[#D4AF37] shadow-xl overflow-hidden bg-white ring-4 ring-[#D4AF37]/30"
                  >
                    <img 
                      src={character === 'akshitha' ? '/groom_avatar.png' : '/bride_avatar.png'} 
                      alt="Partner" 
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = character === 'akshitha' ? '/groom.jpg' : '/bride.jpg'; }}
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                </div>

                {/* Grand "Countdown to Forever" Poster Drop */}
                <motion.div
                  initial={{ y: -400, opacity: 0, rotate: -3 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.8 }}
                  className="bg-[#7B0016] text-[#D4AF37] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-sm text-center max-w-md w-full border-2 border-[#D4AF37] relative overflow-hidden"
                >
                  <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[#D4AF37]/50" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#D4AF37]/50" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#D4AF37]/50" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[#D4AF37]/50" />

                  <p className="uppercase tracking-[0.25em] text-[10px] text-[#FFFDD0] mb-3 font-medium">
                    Countdown to Forever
                  </p>
                  
                  <h3 className="text-4xl md:text-5xl font-script text-[#D4AF37] mb-4">
                    Akshitha & Vishnu
                  </h3>
                  
                  <p className="font-serif text-[#FFFDD0] text-base mb-2 italic">
                    "Two hearts, two cultures, one lifetime of adventures."
                  </p>
                  
                  <div className="w-20 h-[1px] bg-[#D4AF37]/60 mx-auto my-5" />
                  
                  <div className="text-sm font-light text-[#FFFDD0] space-y-1">
                    <p className="font-serif font-medium text-lg text-[#D4AF37]">
                      Feb 18th & 19th, 2027
                    </p>
                    <p className="text-xs tracking-wider opacity-90">
                      Hyderabad, Telangana
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      onClick={resetGame}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-[#7B0016] transition-colors"
                    >
                      <RotateCcw size={14} />
                      <span>Play Again</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

