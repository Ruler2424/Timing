// components/SettingsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSettings, AppSettings, SoundAsset } from '../hooks/useSettings';
import { useAuth } from '../hooks/useAuth';
import { LockIcon } from './icons.tsx';
import { availableSounds } from '../utils/sounds/audioAssets';

interface SettingsPageProps {
    onThemeChange: (theme: string) => void;
    currentTheme: string;
    onUpgradeClick: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onThemeChange, currentTheme, onUpgradeClick }) => {
    const { settings, updateSettings, isLoaded, availableSounds } = useSettings();
    const { user } = useAuth();

    const isPro = user?.role === 'pro';

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

    if (!isLoaded) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-semibold text-gray-500">Loading settings...</p>
            </div>
        );
    }

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-color)] mb-8 text-center">Settings</h2>
            
            <div className="bg-[var(--card-bg-color)] p-6 rounded-lg shadow-md border border-[var(--border-color)] mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">General</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-semibold mb-2 text-[var(--text-color)]">Theme</label>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => onThemeChange('light')} className={`px-4 py-2 text-sm rounded-md transition-colors ${currentTheme === 'light' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`}>Light</button>
                            <button onClick={() => onThemeChange('dark')} className={`px-4 py-2 text-sm rounded-md transition-colors ${currentTheme === 'dark' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`}>Dark</button>
                            <button onClick={() => onThemeChange('theme-blue')} className={`px-4 py-2 text-sm rounded-md transition-colors ${currentTheme === 'theme-blue' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`}>Blue</button>
                        </div>
                    </div>

                    {!isPro && (
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-[var(--text-color)]">Pro Features</label>
                            <button 
                                onClick={onUpgradeClick}
                                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition-colors flex items-center justify-center"
                            >
                                <LockIcon className="w-5 h-5 mr-2 text-white" />
                                Upgrade to Pro
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[var(--card-bg-color)] p-6 rounded-lg shadow-md border border-[var(--border-color)]">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--text-color)]">Sounds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="alarm-sound-select" className="block text-lg font-semibold mb-2 text-[var(--text-color)]">Alarm Sound</label>
                        <select 
                            id="alarm-sound-select"
                            value={settings.alarmSound.id} 
                            onChange={handleAlarmSoundChange}
                            className={`w-full p-2 rounded border text-white focus:outline-none focus:ring-2 transition-colors ${!isPro ? 'bg-gray-700 border-gray-600 cursor-not-allowed opacity-70' : 'bg-white/20 border-slate-600 focus:ring-blue-500'}`}
                            disabled={!isPro}
                        >
                            {availableSounds.map(sound => (
                                <option key={sound.id} value={sound.id} className="bg-gray-700 text-white">
                                    {sound.name}
                                </option>
                            ))}
                        </select>
                        {!isPro && (
                            <p className="text-sm text-yellow-500 mt-1 flex items-center">
                                <LockIcon className="w-4 h-4 mr-1" /> Upgrade to Pro to change sounds.
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="countdown-sound-select" className="block text-lg font-semibold mb-2 text-[var(--text-color)]">Countdown Sound</label>
                        <select 
                            id="countdown-sound-select"
                            value={settings.countdownSound.id} 
                            onChange={handleCountdownSoundChange}
                            className={`w-full p-2 rounded border text-white focus:outline-none focus:ring-2 transition-colors ${!isPro ? 'bg-gray-700 border-gray-600 cursor-not-allowed opacity-70' : 'bg-white/20 border-slate-600 focus:ring-blue-500'}`}
                            disabled={!isPro}
                        >
                            {availableSounds.map(sound => (
                                <option key={sound.id} value={sound.id} className="bg-gray-700 text-white">
                                    {sound.name}
                                </option>
                            ))}
                        </select>
                        {!isPro && (
                            <p className="text-sm text-yellow-500 mt-1 flex items-center">
                                <LockIcon className="w-4 h-4 mr-1" /> Upgrade to Pro to change sounds.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SettingsPage;