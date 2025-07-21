// App.tsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import CountdownTimer from './components/CountdownTimer.tsx';
import Stopwatch from './components/Stopwatch.tsx';
import WorldClock from './components/WorldClock.tsx';
import AnalogClock from './components/AnalogClock.tsx';
import AlarmClock from './components/AlarmClock.tsx';
import DigitalCountdown from './components/DigitalCountdown.tsx';
import PomodoroTimer from './components/PomodoroTimer.tsx';
import TimeTracker from './components/TimeTracker.tsx';
import MeditationTimer from './components/MeditationTimer.tsx';
import BreathingTimer from './components/BreathingTimer.tsx';
import EyeRestReminder from './components/EyeRestReminder.tsx';
import IntervalTimer from './components/IntervalTimer.tsx';
import FlowTimer from './components/FlowTimer.tsx';
import SleepCycleCalculator from './components/SleepCycleCalculator.tsx';
import DistractionTracker from './components/DistractionTracker.tsx';
import AgendaWidget from './components/AgendaWidget.tsx';
import FocusTimer from './components/FocusTimer.tsx';
import { useAuth } from './hooks/useAuth.ts';
import SubscriptionModal from './components/SubscriptionModal.tsx';
import { LockIcon } from './components/icons.tsx';
import TermsOfUse from './TermsOfUse.tsx';
// This import is now correct if PrivacyPolicy.tsx uses 'export function PrivacyPolicy()'
import PrivacyPolicy from './PrivacyPolicy.tsx';
import { AudioProvider } from './utils/sounds/playSound.tsx';

// Assuming you have react-router-dom installed and set up
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const WidgetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {children}
        </div>
    </section>
);

const ProWidgetWrapper = ({ children, isPro, onUpgradeClick }: { children: React.ReactNode, isPro: boolean, onUpgradeClick: () => void }) => {
    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div
            className="relative rounded-2xl shadow-lg h-64 overflow-hidden group"
            onClick={onUpgradeClick}
            aria-label="Upgrade to Pro to unlock this widget"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onUpgradeClick() }}
        >
            <div className="absolute inset-0 blur-sm grayscale select-none -m-2 pointer-events-none">
                {children}
            </div>
            <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-900/70 flex items-center justify-center cursor-pointer transition-colors duration-300 group-hover:bg-slate-300/60 dark:group-hover:bg-slate-900/80">
                <div className="text-center p-5 bg-[var(--card-bg-color)]/90 backdrop-blur-sm rounded-xl shadow-xl border border-black/10">
                    <LockIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <p className="font-bold text-[var(--text-color)]">PRO Feature</p>
                    <p className="text-sm text-[var(--text-color)] group-hover:underline">Click to upgrade</p>
                 </div>
            </div>
        </div>
    );
};


const App = () => {
  const { user, loading, signInWithGoogle, upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleUpgrade = () => {
    upgradeToPro();
    setIsModalOpen(false);
  }

  // This is the correct function name
  const openUpgradeModal = () => {
    if (!user) {
      signInWithGoogle();
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <div className="text-xl font-semibold text-slate-700 dark:text-slate-200">Loading...</div>
        </div>
    );
  }

  const isPro = user?.role === 'pro';

  return (
    <AudioProvider>
    <Router>
        <div className="min-h-screen flex flex-col">
            <Header onUpgradeClick={openUpgradeModal} />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">

                {isPro && (
                    <div className="bg-[var(--card-bg-color)] p-4 rounded-lg mb-8 shadow-sm">
                        <h3 className="font-semibold mb-2 text-[var(--text-color)]">Pro Themes</h3>
                        <div className="flex gap-2">
                            <button onClick={() => setTheme('light')} className={`px-3 py-1 text-sm rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600'}`}>Light</button>
                            <button onClick={() => setTheme('dark')} className={`px-3 py-1 text-sm rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600'}`}>Dark</button>
                            <button onClick={() => setTheme('theme-blue')} className={`px-3 py-1 text-sm rounded ${theme === 'theme-blue' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600'}`}>Blue</button>
                        </div>
                    </div>
                )}

                <Routes> {/* Wrap routes in <Routes> */}
                    {/* Main content of the app */}
                    <Route path="/" element={
                        <> {/* Use a fragment or another element to render multiple top-level elements */}
                            <WidgetSection title="Focus & Productivity">
                                <PomodoroTimer />
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><FlowTimer /></ProWidgetWrapper>
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><FocusTimer /></ProWidgetWrapper>
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><IntervalTimer /></ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Clocks & Timers">
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><WorldClock /></ProWidgetWrapper>
                                <Stopwatch />
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><CountdownTimer /></ProWidgetWrapper>
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><AlarmClock /></ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Health & Wellness">
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><SleepCycleCalculator /></ProWidgetWrapper>
                                <BreathingTimer />
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><MeditationTimer /></ProWidgetWrapper>
                                {/* Corrected here */}
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><EyeRestReminder /></ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Planning & Analysis">
                                 {/* Corrected here */}
                                 <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><AgendaWidget /></ProWidgetWrapper>
                                 <TimeTracker />
                                 {/* Corrected here */}
                                 <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><DistractionTracker /></ProWidgetWrapper>
                                 {/* Corrected here */}
                                 <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><DigitalCountdown /></ProWidgetWrapper>
                            </WidgetSection>
                        </>
                    } />

                    {/* Define your page routes */}
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
            </main>
            <Footer />
            {isModalOpen && <SubscriptionModal onClose={() => setIsModalOpen(false)} onUpgrade={handleUpgrade} />}
        </div>
    </Router>
    </AudioProvider>
  );
};

export default App;