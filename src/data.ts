import { EventItem } from './types';

export const weddingEvents: EventItem[] = [
  {
    id: 'engagement',
    title: 'Engagement (Nischithartham)',
    date: 'Nov 20, 2026',
    time: '6:30 PM (Evening)',
    location: 'M Central',
    description: 'Join us for our engagement ceremony as our families officially come together.',
    imageUrl: '/nisch.jpeg',
    themeClass: 'text-wedding-sage',
    bgClass: 'bg-[#E3E7DF]', // Light sage
    timestamp: new Date('2026-11-20T18:30:00'),
  },
  {
    id: 'wedding',
    title: 'Wedding',
    date: 'Feb 18, 2027',
    time: '10:55 AM (Morning Muhurtham)',
    location: 'San events',
    description: 'The auspicious moment where we tie the knot. We request your presence and blessings on our special day.',
    imageUrl: '/couple1.jpeg',
    themeClass: 'text-wedding-red',
    bgClass: 'bg-[#FFF8F0]', // Light Gold/Red undertone
    timestamp: new Date('2027-02-18T10:55:00'),
  },
  {
    id: 'reception',
    title: 'Reception',
    date: 'Feb 19, 2027',
    time: '6:30 PM (Evening)',
    location: 'MCC lawn',
    description: 'An evening of celebration, music, and joy. Come share our happiness as we celebrate our new journey!',
    imageUrl: '/couple2.jpeg',
    themeClass: 'text-wedding-crimson',
    bgClass: 'bg-[#FDF5E6]', // Cream
    timestamp: new Date('2027-02-19T18:30:00'),
  },
];
