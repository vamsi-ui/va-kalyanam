import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, compact = false }: { targetDate: Date; compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex gap-1.5 ${compact ? 'sm:gap-2.5 mt-4' : 'sm:gap-4 mt-6'} text-[#7B0016] justify-center`}>
      <TimeUnit value={timeLeft.days} label="DAYS" compact={compact} />
      <TimeUnit value={timeLeft.hours} label="HOURS" compact={compact} />
      <TimeUnit value={timeLeft.minutes} label="MINS" compact={compact} />
      <TimeUnit value={timeLeft.seconds} label="SECS" compact={compact} />
    </div>
  );
}

function TimeUnit({ value, label, compact }: { value: number; label: string; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center border border-[#D4AF37]/50 rounded-lg bg-[#7B0016]/5 shadow-sm transition-transform hover:scale-105 duration-200 ${compact ? 'w-14 h-16 sm:w-16 sm:h-18' : 'w-18 h-22 sm:w-22 sm:h-26'}`}>
      <div className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-4xl'} font-serif font-bold text-[#7B0016] tabular-nums tracking-normal`}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className={`text-[8px] sm:text-[9px] tracking-[0.18em] font-medium text-[#7B0016]/75 uppercase mt-0.5`}>
        {label}
      </div>
    </div>
  );
}

