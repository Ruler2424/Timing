// App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import CountdownTimer from './components/CountdownTimer.tsx';
import Stopwatch from './components/Stopwatch.tsx';
import ProWidgetWrapper from './components/ProWidgetWrapper.tsx';
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
import SettingsPage from './components/SettingsPage.tsx'; 
import { useAuth } from './hooks/useAuth.ts';
import SubscriptionModal from './components/SubscriptionModal.tsx';
import { LockIcon } from './components/icons.tsx';
import TermsOfUse from './TermsOfUse.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import { AudioProvider } from './utils/sounds/playSound.tsx';
import { useSettings, AppSettings, SoundAsset } from './hooks/useSettings.ts'; 

// react-router-dom
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'; 
// Helmet for dynamic meta tags
import { Helmet } from 'react-helmet-async'; 

const WidgetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-12">
        {/* Use h2 for section titles */}
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">{title}</h2> 
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {children}
        </div>
    </section>
);

// Define metadata based on metadata.json
const appMetadata = {
  name: "React Time Widgets Dashboard",
  description: "A dashboard of minimalist, time-related mini-applications including a world clock, countdown timer, stopwatch, and alarm clock, all presented as widgets on a single page."
};

const App = () => {
  const { user, loading, signInWithGoogle, upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const { settings, updateSettings, isLoaded, availableSounds } = useSettings(); 
  const location = useLocation();
  const navigate = useNavigate(); 

  // Dynamically update page title and meta description
  const getPageTitle = useCallback(() => {
    switch (location.pathname) {
      case '/':
        return `${appMetadata.name} - Productivity & Time Tools`;
      case '/settings':
        return 'Settings - TimeCraft';
      case '/terms':
        return 'Terms of Use - TimeCraft';
      case '/privacy':
        return 'Privacy Policy - TimeCraft';
      default:
        return `${appMetadata.name}`;
    }
  }, [location.pathname]);

  const getPageDescription = useCallback(() => {
    switch (location.pathname) {
      case '/':
        return appMetadata.description;
      case '/settings':
        return 'Configure themes, sounds, and preferences for TimeCraft.';
      case '/terms':
        return 'Read the Terms of Use for TimeCraft.';
      case '/privacy':
        return 'Review the Privacy Policy for TimeCraft.';
      default:
        return appMetadata.description;
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleUpgrade = useCallback(() => {
    upgradeToPro();
    setIsModalOpen(false);
  }, [upgradeToPro]);

  const openUpgradeModal = useCallback(() => {
    if (!user) {
      // If user is not logged in, prompt sign-in perhaps via modal or redirect
       setIsModalOpen(true); // Assuming modal handles sign-in prompt
    } else {
      setIsModalOpen(true);
    }
  }, [user]);
  
  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);
  
  const handleAlarmSoundChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSoundId = event.target.value;
    const sound = availableSounds.find(s => s.id === selectedSoundId);
    if (sound) {
      updateSettings({ alarmSound: sound });
    }
  }, [availableSounds, updateSettings]);

  const handleCountdownSoundChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSoundId = event.target.value;
    const sound = availableSounds.find(s => s.id === selectedSoundId);
    if (sound) {
      updateSettings({ countdownSound: sound });
    }
  }, [availableSounds, updateSettings]);

  if (loading || !isLoaded) { 
    return (
        <>
            <Helmet>
                <title>Loading...</title>
                <meta name="description" content="TimeCraft is loading." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="text-xl font-semibold text-slate-700 dark:text-slate-200">Loading...</div>
            </div>
        </>
    );
  }

  const isPro = user?.role === 'pro';

  return (
    <AudioProvider>
      <Router>
        {/* Helmet section for SEO */}
        <Helmet>
          <title>{getPageTitle()}</title>
          <meta name="description" content={getPageDescription()} />
          <link rel="canonical" href={`https://timing-five.vercel.app${location.pathname}`} />
          {/* Open Graph tags */}
          <meta property="og:title" content={getPageTitle()} />
          <meta property="og:description" content={getPageDescription()} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://timing-five.vercel.app${location.pathname}`} />
          <meta property="og:image" content="https://timing-five.vercel.app/og-image.png" /> {/* Add a default OG image */}
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={getPageTitle()} />
          <meta name="twitter:description" content={getPageDescription()} />
          <meta name="twitter:image" content="https://timing-five.vercel.app/twitter-image.png" /> {/* Add a default Twitter image */}
        </Helmet>

        <div className="min-h-screen flex flex-col">
            <Header onUpgradeClick={openUpgradeModal} />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Main page title */}
            {location.pathname === '/' && (
              <h1 className="text-center text-4xl font-bold text-[var(--text-color)] mb-8">
                TimeCraft: Your All-in-One Timer Dashboard
              </h1>
            )}
                
                <Routes>
                    <Route path="/" element={
                        <>
                            <WidgetSection title="Focus & Productivity">
                                <PomodoroTimer />
                                <FlowTimer />
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><FocusTimer /></ProWidgetWrapper>
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><IntervalTimer /></ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Clocks & Timers">
                                <CountdownTimer countdownSoundSrc={settings.countdownSound.src} /> 
                                <Stopwatch />
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><WorldClock /></ProWidgetWrapper>
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><AlarmClock alarmSoundSrc={settings.alarmSound.src} /> </ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Health & Wellness">
                                <BreathingTimer />
                                <MeditationTimer />
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><SleepCycleCalculator /></ProWidgetWrapper>
                                <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><EyeRestReminder /></ProWidgetWrapper>
                            </WidgetSection>

                            <WidgetSection title="Planning & Analysis">
                                 <AgendaWidget />
                                 <TimeTracker />
                                 <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><DistractionTracker /></ProWidgetWrapper>
                                 <ProWidgetWrapper isPro={isPro} onUpgradeClick={openUpgradeModal}><DigitalCountdown /></ProWidgetWrapper>
                            </WidgetSection>
                        </>
                    } />

                    <Route path="/settings" element={
                        <SettingsPage 
                            onThemeChange={handleThemeChange} 
                            currentTheme={theme} 
                            onUpgradeClick={openUpgradeModal} 
                        />
                    } />
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