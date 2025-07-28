// app/layout.tsx
// This file is a Server Component (no 'use client' directive at the top)

import './globals.css'; // Global styles import
import { Inter, Roboto_Mono } from 'next/font/google'; // Next.js Font imports

// Provider imports (these will contain 'use client' internally or wrap client components)
import { AuthProvider } from '@/hooks/useAuth';
import { AudioProvider } from '@/utils/sounds/playSound';
import { SettingsProvider } from '@/hooks/useSettings';

// Client component that manages theme state and renders header/footer/modal
import ClientLayoutContent from '@/components/ClientLayoutContent';


// Configure Next.js Fonts - ensure weights are loaded for bold styles
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'], // <-- ИСПРАВЛЕНО: 'weights' заменено на 'weight'
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '700'], // <-- ИСПРАВЛЕНО: 'weights' заменено на 'weight'
});

// Global metadata for the site
export const metadata = {
  // ... (Your metadata here, as provided in previous answers)
  title: {
    default: 'TimeCraft: Your All-in-One Timer Dashboard',
    template: '%s - TimeCraft',
  },
  description: 'Manage your time effectively with online timers, alarms, stopwatches, Pomodoro, and more — all in one place at Timing',
  keywords: "timer, alarm clock, pomodoro timer, productivity tools, time management, countdown timer, stopwatch, online timer, focus timer, work timer, study timer, break timer, time tracker, task timer, digital timer, interval timer, kitchen timer, timer app, alarm app, reminder app, time tracking software, time blocking, timeboxing, productivity app, time planner, daily timer, time management techniques, time management app, focus booster, time tracker app, online stopwatch, time audit, work-life balance, mindfulness timer, meditation timer, task management, schedule planner, time budgeting, alarm clock app, countdown clock, productivity dashboard, timer widgets, web timer, timer with alarm, timer for work, timer for study, timer for meditation, time logging, time efficiency, timer dashboard, timer with sound, time control tools, free online timer, multi-purpose timer, silent timer, loud alarm timer, visual timer, desktop timer, chrome timer extension, productivity hacks, time optimization, pomodoro technique, daily schedule tool, time monitoring, productivity timer, focused work sessions, distraction-free timer, customizable timer, long countdown timer, short timer, mobile timer app, task scheduler, hourly chime timer, time reminder, recurring alarm timer, smart alarm clock, timer for kids, timer for exercise, timer for meetings, timer for yoga, timer for cooking, task-oriented timer, effective time management, life balance tools, focus mode timer, GTD tools, daily productivity, time boxing app, work interval timer, 25 minute timer, 5 minute break timer, web-based timer, goal-oriented timer, hourly timer with alert, minimalist timer, professional timer, productivity tracker, morning routine timer, bedtime alarm, habit tracker timer, workflow enhancer, online productivity timer, real-time timer, browser-based timer, high precision timer, accurate online timer, responsive timer interface, countdown with alarm, alarm timer with repeat, notification timer, time goal tracker, attention booster, task timer with stats, activity timer, pomodoro with reporting, dark mode timer app, timer with analytics, motivational timer",

  openGraph: {
    title: 'TimeCraft: Your All-in-One Timer Dashboard',
    description: 'A dashboard of minimalist, time-related mini-applications including a world clock, countdown timer, stopwatch, and alarm clock, all presented as widgets on a single page.',
    url: 'https://timing-five.vercel.app/',
    siteName: 'TimeCraft',
    images: [
      {
        url: 'https://timing-five.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TimeCraft Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeCraft: Your All-in-One Timer Dashboard',
    description: 'A dashboard of minimalist, time-related mini-applications including a world clock, countdown timer, stopwatch, and alarm clock, all presented as widgets on a single page.',
    images: ['https://timing-five.vercel.app/twitter-image.png'],
  },
  verification: {
    google: '9JyMyl6n6EhEVDWdNkZYz91qgLzdZDu0sn_VjlIfeak',
  },
};

// Main RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply font variables and a base font class to the body */}
      <body className={`${inter.variable} ${robotoMono.variable} font-sans`}>
        <AuthProvider>
          <SettingsProvider>
            <AudioProvider>
              {/* Render ClientLayoutContent, which will manage the theme class on the body */}
              <ClientLayoutContent>{children}</ClientLayoutContent>
            </AudioProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}