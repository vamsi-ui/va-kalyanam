import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { RedGoldDivider, CornerFlourish, PadmaSymbol } from './RedGoldSymbols';

interface Poll {
  id: string;
  question: string;
  option1: string;
  option2: string;
  votes1: number;
  votes2: number;
}

const initialPolls: Poll[] = [
  {
    id: 'q1',
    question: 'Who is the better dancer?',
    option1: 'Akshitha',
    option2: 'Vishnu',
    votes1: 85,
    votes2: 42,
  },
  {
    id: 'q2',
    question: 'Who will cry first during the vows?',
    option1: 'Akshitha',
    option2: 'Vishnu',
    votes1: 56,
    votes2: 89,
  },
  {
    id: 'q3',
    question: 'Who is more likely to be late to their own wedding?',
    option1: 'Akshitha',
    option2: 'Vishnu',
    votes1: 34,
    votes2: 67,
  },
];

export function Predictions() {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({}); // pollId -> selectedOption
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({}); // pollId -> boolean

  const handleSelect = (pollId: string, option: 'option1' | 'option2') => {
    setUserVotes((prev) => ({ ...prev, [pollId]: option }));
  };

  const handleVote = (pollId: string) => {
    const vote = userVotes[pollId];
    if (!vote) return;

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            votes1: vote === 'option1' ? poll.votes1 + 1 : poll.votes1,
            votes2: vote === 'option2' ? poll.votes2 + 1 : poll.votes2,
          };
        }
        return poll;
      })
    );
    setSubmitted((prev) => ({ ...prev, [pollId]: true }));
  };

  return (
    <section className="py-24 px-6 relative bg-gradient-to-b from-[#FFFDD0] via-[#FAF6E8] to-[#FFFDD0] overflow-hidden">
      {/* Background subtle lattice */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5a2.5 2.5 0 0 1 5 0V16h15v2H25v2.5a2.5 2.5 0 0 1-5 0z' fill='%237B0016' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center mb-2">
            <PadmaSymbol size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#7B0016] tracking-wide">
            Wedding Predictions
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#7B0016]/80 font-serif mt-2 font-medium">
            Cast your vote and see what everyone else thinks!
          </p>
          <RedGoldDivider symbol="lotus" className="!my-3" />
        </motion.div>

        <div className="space-y-8">
          {polls.map((poll, index) => {
            const isSubmitted = submitted[poll.id];
            const selectedVote = userVotes[poll.id];
            const totalVotes = poll.votes1 + poll.votes2;
            const percent1 = totalVotes === 0 ? 0 : Math.round((poll.votes1 / totalVotes) * 100);
            const percent2 = totalVotes === 0 ? 0 : Math.round((poll.votes2 / totalVotes) * 100);

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border-2 border-[#D4AF37]/50 relative overflow-hidden"
              >
                <CornerFlourish position="top-left" size={24} />
                <CornerFlourish position="top-right" size={24} />
                <CornerFlourish position="bottom-left" size={24} />
                <CornerFlourish position="bottom-right" size={24} />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B0016] via-[#D4AF37] to-[#7B0016]" />

                <h3 className="text-xl md:text-2xl font-serif text-[#7B0016] font-semibold mb-6 text-center">
                  {poll.question}
                </h3>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="voting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <div className="flex w-full max-w-md gap-4 mb-6">
                        <button
                          onClick={() => handleSelect(poll.id, 'option1')}
                          className={`flex-1 py-3.5 px-4 rounded-md border-2 transition-all duration-300 font-serif text-base tracking-wide flex items-center justify-center gap-2 ${
                            selectedVote === 'option1'
                              ? 'border-[#7B0016] bg-[#7B0016] text-[#FFFDD0] shadow-md font-bold'
                              : 'border-[#D4AF37]/40 text-[#7B0016] hover:border-[#D4AF37] hover:bg-[#FAF6ED]'
                          }`}
                        >
                          {selectedVote === 'option1' && <Check size={16} className="text-[#D4AF37]" />}
                          <span>{poll.option1}</span>
                        </button>
                        <button
                          onClick={() => handleSelect(poll.id, 'option2')}
                          className={`flex-1 py-3.5 px-4 rounded-md border-2 transition-all duration-300 font-serif text-base tracking-wide flex items-center justify-center gap-2 ${
                            selectedVote === 'option2'
                              ? 'border-[#7B0016] bg-[#7B0016] text-[#FFFDD0] shadow-md font-bold'
                              : 'border-[#D4AF37]/40 text-[#7B0016] hover:border-[#D4AF37] hover:bg-[#FAF6ED]'
                          }`}
                        >
                          {selectedVote === 'option2' && <Check size={16} className="text-[#D4AF37]" />}
                          <span>{poll.option2}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleVote(poll.id)}
                        disabled={!selectedVote}
                        className={`px-8 py-3 rounded-full text-xs font-['Cinzel',serif] tracking-[0.2em] uppercase transition-all duration-300 shadow-md ${
                          selectedVote
                            ? 'bg-[#7B0016] text-[#FFFDD0] hover:bg-[#900] border border-[#D4AF37] hover:shadow-lg active:scale-95'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                        }`}
                      >
                        Submit Vote
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full max-w-md mx-auto space-y-5"
                    >
                      <div className="relative">
                        <div className="flex justify-between text-sm font-medium mb-1.5 text-[#7B0016] font-serif">
                          <span className={percent1 >= percent2 ? 'font-bold text-[#881323]' : ''}>
                            {poll.option1}
                          </span>
                          <span className="font-semibold">{percent1}%</span>
                        </div>
                        <div className="h-3 w-full bg-amber-100 rounded-full overflow-hidden border border-[#D4AF37]/30">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent1}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-[#7B0016] to-[#991b1b]"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex justify-between text-sm font-medium mb-1.5 text-[#7B0016] font-serif">
                          <span className={percent2 >= percent1 ? 'font-bold text-[#881323]' : ''}>
                            {poll.option2}
                          </span>
                          <span className="font-semibold">{percent2}%</span>
                        </div>
                        <div className="h-3 w-full bg-amber-100 rounded-full overflow-hidden border border-[#D4AF37]/30">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent2}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-[#b45309] to-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <p className="text-center text-xs text-[#7B0016]/70 mt-4 tracking-widest uppercase font-serif flex items-center justify-center gap-1.5">
                        <Sparkles size={12} className="text-[#D4AF37]" />
                        <span>Thanks for voting!</span>
                        <Sparkles size={12} className="text-[#D4AF37]" />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
