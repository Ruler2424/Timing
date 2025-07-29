// app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'TimeCraft: Your All-in-One Timer Dashboard',
    template: '%s - TimeCraft',
  },
  description: 'Manage your time effectively with online timers, alarms, stopwatches, Pomodoro, and more — all in one place at Timing',
  // ... rest of your metadata
  keywords: "online timer, alarm clock online, stopwatch, countdown timer, pomodoro timer, all-in-one timer dashboard, time management, productivity tools, free online timer, study timer, work timer, concentration app, focus booster",
  openGraph: {
    title: 'TimeCraft: Your Ultimate All-in-One Timer Dashboard for Unmatched Productivity',
    description: 'Discover TimeCraft, the ultimate all-in-one timer dashboard designed to boost your productivity. Featuring Pomodoro, Stopwatches, Alarms, and more, TimeCraft is your complete online time management solution.',
    url: 'https://timing-five.vercel.app/', // Replace with your actual domain
    siteName: 'TimeCraft',
    images: [
      {
        url: 'https://timing-five.vercel.app/og-image-article.png', // Create a specific OG image for this article
        width: 1200,
        height: 630,
        alt: 'TimeCraft All-in-One Timer Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'article', // Use 'article' type for blog posts
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeCraft: Your Ultimate All-in-One Timer Dashboard for Unmatched Productivity',
    description: 'Discover TimeCraft, the ultimate all-in-one timer dashboard designed to boost your productivity. Featuring Pomodoro, Stopwatches, Alarms, and more, TimeCraft is your complete online time management solution.',
    images: ['https://timing-five.vercel.app/twitter-image-article.png'], // Create a specific Twitter image for this article
  },
};