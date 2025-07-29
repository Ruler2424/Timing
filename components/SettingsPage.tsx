'use client';

import React, { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AppSettings, SoundAsset } from '../hooks/useSettings'; // Import types

interface SettingsPageProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
  onUpgradeClick: () => void; // Passed from parent
  settings: AppSettings; // All settings
  updateSettings: (newSettings: Partial<AppSettings>) => void; // Update function
  availableSounds: SoundAsset[]; // Available sounds
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  onThemeChange,
  currentTheme,
  onUpgradeClick,
  settings,
  updateSettings,
  availableSounds,
}) => {
  const { user } = useAuth();
  const isPro = user?.role === 'pro';

  const handleAlarmSoundChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedSoundId = event.target.value;
      const sound = availableSounds.find((s) => s.id === selectedSoundId);
      if (sound) {
        updateSettings({ alarmSound: sound });
      }
    },
    [availableSounds, updateSettings]
  );

  const handleCountdownSoundChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedSoundId = event.target.value;
      const sound = availableSounds.find((s) => s.id === selectedSoundId);
      if (sound) {
        updateSettings({ countdownSound: sound });
      }
    },
    [availableSounds, updateSettings]
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-[var(--card-bg-color)] rounded-lg shadow-md text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-6 text-center">App Settings</h1>

      <section className="mb-8 p-4 border border-[var(--border-color)] rounded-md">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="theme-select" className="block text-sm font-medium text-[var(--text-muted-color)]">
            Choose Theme:
          </label>
          <select
            id="theme-select"
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-[var(--bg-color)] text-[var(--text-color)]"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="theme-blue">Blue Accents</option>
          </select>
        </div>
      </section>

      <section className="mb-8 p-4 border border-[var(--border-color)] rounded-md">
        <h2 className="text-xl font-semibold mb-4">Sound Settings</h2>
        <div className="mb-4">
          <label htmlFor="alarm-sound-select" className="block text-sm font-medium text-[var(--text-muted-color)]">
            Alarm Sound:
          </label>
          <select
            id="alarm-sound-select"
            value={settings.alarmSound?.id || ''}
            onChange={handleAlarmSoundChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-[var(--bg-color)] text-[var(--text-color)]"
          >
            {availableSounds.map((sound) => (
              <option key={sound.id} value={sound.id}>
                {sound.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="countdown-sound-select" className="block text-sm font-medium text-[var(--text-muted-color)]">
            Countdown Sound:
          </label>
          <select
            id="countdown-sound-select"
            value={settings.countdownSound?.id || ''}
            onChange={handleCountdownSoundChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-[var(--bg-color)] text-[var(--text-color)]"
          >
            {availableSounds.map((sound) => (
              <option key={sound.id} value={sound.id}>
                {sound.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="p-4 border border-[var(--border-color)] rounded-md">
        <h2 className="text-xl font-semibold mb-4">Account Status</h2>
        <p className="text-[var(--text-muted-color)] mb-4">
          Current Status: <span className="font-bold text-[var(--text-color)]">{isPro ? 'Pro User' : 'Free User'}</span>
        </p>
        {!isPro && (
          <button
            onClick={onUpgradeClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Upgrade to Pro to unlock all features
          </button>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;