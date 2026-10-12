// Authentic Wedding Details & Countdown from the Invitation Card

export const WEDDING_DETAILS = {
  couple: {
    groom: {
      title: 'Chi.',
      name: 'Vishnu KB',
      parents: 'Son of KK Babu & KL Mani',
      state: 'Keralam',
    },
    bride: {
      title: 'Sow.',
      name: 'Akshitha Sri Tekki',
      parents: 'Daughter of ShivKumar Tekki & Uma Devi Tekki',
      state: 'Andhra',
    },
    tagline: 'When Keralam met Andhra',
  },
  muhurtham: {
    title: 'Muhurtham',
    dateStr: '18th Feb | Thursday | 10:55 AM',
    day: 'Thursday',
    dateText: '18th February',
    timeText: '10:55 AM',
    month: 1, // Feb (0-indexed)
    dayNum: 18,
    hour: 10,
    minute: 55,
    venueName: 'SAN Event Hall',
    venueAddress: '3/432, 4th Cross Street LakshmanaPerumal Nagar, Kottivakkam, Chennai, Tamil Nadu 600041',
    mapsUrl: 'https://maps.google.com/?q=SAN+Event+Hall+Kottivakkam+Chennai+600041',
  },
  reception: {
    title: 'Reception',
    dateStr: '19th Feb | Friday | 6:30 PM Onwards',
    day: 'Friday',
    dateText: '19th February',
    timeText: '6:30 PM Onwards',
    month: 1, // Feb
    dayNum: 19,
    hour: 18,
    minute: 30,
    venueName: 'MCC Marriage Lawn',
    venueAddress: '2/226, East Coast Rd, CHINNANDIKUPPAM, Vettuvankeni, Chennai, Tamil Nadu 600041',
    mapsUrl: 'https://maps.google.com/?q=MCC+Marriage+Lawn+Vettuvankeni+Chennai+600041',
  },
};

export function getCountdownToDate(targetMonth: number, targetDay: number, targetHour: number, targetMinute: number) {
  const now = new Date();
  let targetYear = now.getFullYear();
  let target = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, 0);

  // If the date has already passed this calendar year, count down to the next occurrence
  if (target.getTime() <= now.getTime()) {
    targetYear += 1;
    target = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, 0);
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    targetDate: target,
  };
}
