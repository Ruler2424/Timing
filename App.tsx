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
import SettingsPage from './components/SettingsPage.tsx'; // Импорт нового компонента
import { useAuth } from './hooks/useAuth.ts';
import SubscriptionModal from './components/SubscriptionModal.tsx';
import { LockIcon } from './components/icons.tsx';
import TermsOfUse from './TermsOfUse.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import { AudioProvider } from './utils/sounds/playSound.tsx';
// Импортируем useSettings, чтобы получить доступ к settings, updateSettings, isLoaded, И availableSounds
import { useSettings, AppSettings, SoundAsset } from './hooks/useSettings.ts'; 

// react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const WidgetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {children}
        </div>
    </section>
);



const App = () => {
  const { user, loading, signInWithGoogle, upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  // Получаем ВСЕ данные из useSettings: settings, updateSettings, isLoaded, И availableSounds
  const { settings, updateSettings, isLoaded, availableSounds } = useSettings(); 

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleUpgrade = useCallback(() => {
    upgradeToPro();
    setIsModalOpen(false);
  }, [upgradeToPro]);

  const openUpgradeModal = useCallback(() => {
    if (!user) {
      signInWithGoogle();
    } else {
      setIsModalOpen(true);
    }
  }, [user, signInWithGoogle]);

  // Обработчик для изменения темы
  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);
  
  // Обработчик для изменения звука будильника
  const handleAlarmSoundChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSoundId = event.target.value;
    const sound = availableSounds.find(s => s.id === selectedSoundId); // Теперь availableSounds доступен
    if (sound) {
      updateSettings({ alarmSound: sound });
    }
  }, [availableSounds, updateSettings]); // availableSounds теперь доступен

  // Обработчик для изменения звука таймера обратного отсчета
  const handleCountdownSoundChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSoundId = event.target.value;
    const sound = availableSounds.find(s => s.id === selectedSoundId); // Теперь availableSounds доступен
    if (sound) {
      updateSettings({ countdownSound: sound });
    }
  }, [availableSounds, updateSettings]); // availableSounds теперь доступен


  if (loading || !isLoaded) { 
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

                    {/* Страница настроек */}
                    <Route path="/settings" element={
                        <SettingsPage 
                            onThemeChange={handleThemeChange} 
                            currentTheme={theme} 
                            onUpgradeClick={openUpgradeModal} 
                            // availableSounds передается из useSettings() прямо в SettingsPage
                        />
                    } />

                    {/* Страницы Terms и Privacy */}
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