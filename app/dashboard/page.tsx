// app/dashboard/page.tsx
'use client'; // <-- IMPORTANT: This is a Client Component as it uses hooks and interactive widgets

import React, { useCallback } from 'react';

// Imports of your widget components
// Ensure these paths are correct based on your project structure (e.g., '@/components/CountdownTimer')
import CountdownTimer from '@/components/CountdownTimer';
import Stopwatch from '@/components/Stopwatch';
import ProWidgetWrapper from '@/components/ProWidgetWrapper';
import WorldClock from '@/components/WorldClock';
import AnalogClock from '@/components/AnalogClock'; // If you have and use this component
import AlarmClock from '@/components/AlarmClock';
import DigitalCountdown from '@/components/DigitalCountdown'; // Your DigitalCountdown component
import PomodoroTimer from '@/components/PomodoroTimer';
import TimeTracker from '@/components/TimeTracker';
import MeditationTimer from '@/components/MeditationTimer';
import BreathingTimer from '@/components/BreathingTimer';
import EyeRestReminder from '@/components/EyeRestReminder';
import IntervalTimer from '@/components/IntervalTimer';
import FlowTimer from '@/components/FlowTimer';
import SleepCycleCalculator from '@/components/SleepCycleCalculator';
import DistractionTracker from '@/components/DistractionTracker';
import AgendaWidget from '@/components/AgendaWidget';
import FocusTimer from '@/components/FocusTimer';

// Imports of hooks for authentication and settings logic
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';

// Import for Next.js navigation (if needed for this page)
import { usePathname } from 'next/navigation'; // Can be used, but not strictly critical for this page's core function
import { useRouter } from 'next/navigation'; // If programmatic navigation is needed

// Widget Section component to group widgets
const WidgetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {children}
    </div>
  </section>
);

// Dashboard Page component
export default function DashboardPage() {
  const { user, loading, signInWithGoogle, upgradeToPro } = useAuth(); // Use useAuth hook
  const { settings, updateSettings, availableSounds } = useSettings(); // Use useSettings hook

  // State for subscription modal (if it's handled specifically on this page).
  // Note: ClientLayoutContent already has a global modal, so this might not be needed
  // unless you want very specific modal behavior here.
  // const [isModalOpen, setIsModalOpen] = useState(false); // Likely not needed here if handled globally

  const isPro = user?.role === 'pro';

  // Function to trigger the "Upgrade to Pro" modal
  // This function would typically be passed to the Header and ProWidgetWrapper components.
  // The actual modal state management is in app/layout.tsx (ClientLayoutContent).
  // For now, if a ProWidgetWrapper is clicked, it will log a message.
  // The real logic to open the modal would come from ClientLayoutContent providing a context or callback.
  const openUpgradeModal = useCallback(() => {
    console.log("Triggering upgrade modal from Dashboard.");
    // In a full application, you might:
    // setIsModalOpen(true); // if the modal was scoped only to this page
    // Or call a function from a global context/state if modalOpen is managed globally.
  }, []);


  // --- Metadata for this specific page ---
  // In Next.js App Router, you can export a `metadata` object directly from `page.tsx`.
  // This will override or extend the general metadata defined in `app/layout.tsx`.
  // The title for this page will typically follow the template from layout, e.g., "Dashboard - TimeCraft".
  // If you want a very specific title for *only* this page, you can uncomment and define it:
  // export const metadata = {
  //   title: 'Your Timer Dashboard',
  //   description: 'The central hub for all your time tracking and productivity widgets.',
  // };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-center text-4xl font-bold text-[var(--text-color)] mb-8">
        TimeCraft: Your All-in-One Timer Dashboard
      </h1>

      <WidgetSection title="Focus & Productivity">
        <PomodoroTimer />
        <FlowTimer />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <FocusTimer />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <IntervalTimer />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Clocks & Timers">
        <CountdownTimer countdownSoundSrc={settings.countdownSound.src} />
        <Stopwatch />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <WorldClock />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <AlarmClock alarmSoundSrc={settings.alarmSound.src} />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Health & Wellness">
        <BreathingTimer />
        <MeditationTimer />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <SleepCycleCalculator />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <EyeRestReminder />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Planning & Analysis">
        <AgendaWidget />
        <TimeTracker />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <DistractionTracker />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}>
          <DigitalCountdown />
        </ProWidgetWrapper>
      </WidgetSection>
    </div>
  );
}