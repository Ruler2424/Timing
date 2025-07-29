// app/dashboard/page.tsx
'use client'; // <-- IMPORTANT: This is a Client Component as it uses hooks and interactive widgets

import React, { useCallback } from 'react';

// Imports of your widget components
import CountdownTimer from '@/components/CountdownTimer';
import Stopwatch from '@/components/Stopwatch';
import ProWidgetWrapper from '@/components/ProWidgetWrapper'; // Import ProWidgetWrapper
import WorldClock from '@/components/WorldClock';
import AlarmClock from '@/components/AlarmClock';
import DigitalCountdown from '@/components/DigitalCountdown';
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
  const { user } = useAuth();
  const { settings } = useSettings();

  const isPro = user?.role === 'pro';

  const openUpgradeModal = useCallback(() => {
    console.log("Triggering upgrade modal from Dashboard.");
    // This function would typically interact with a global state/context to open the modal.
    // Assuming such a mechanism exists or will be implemented elsewhere.
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-center text-4xl font-bold text-[var(--text-color)] mb-8">
        TimeCraft: Your All-in-One Timer Dashboard
      </h1>

      <WidgetSection title="Focus & Productivity">
        <PomodoroTimer />
        <FlowTimer />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Focus Timer">
          <FocusTimer />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Interval Timer">
          <IntervalTimer />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Clocks & Timers">
        <CountdownTimer countdownSoundSrc={settings.countdownSound.src} />
        <Stopwatch />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="World Clock">
          <WorldClock />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Alarm Clock">
          <AlarmClock alarmSoundSrc={settings.alarmSound.src} />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Health & Wellness">
        <BreathingTimer />
        <MeditationTimer />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Sleep Cycle Calculator">
          <SleepCycleCalculator />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Eye Rest Reminder">
          <EyeRestReminder />
        </ProWidgetWrapper>
      </WidgetSection>

      <WidgetSection title="Planning & Analysis">
        <AgendaWidget />
        <TimeTracker />
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Distraction Tracker">
          <DistractionTracker />
        </ProWidgetWrapper>
        <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal} widgetTitle="Digital Countdown">
          <DigitalCountdown />
        </ProWidgetWrapper>
      </WidgetSection>
    </div>
  );
}