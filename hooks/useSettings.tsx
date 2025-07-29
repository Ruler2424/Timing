// src/hooks/useSettings.tsx
'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { SoundAsset, availableSounds } from '@/utils/sounds/audioAssets';

// Typename for storing all settings
export interface AppSettings {
    alarmSound: SoundAsset;
    countdownSound: SoundAsset;
    theme: string;
    // Add other settings here
}

// Ensure availableSounds is not empty before accessing index 0, though it should be guaranteed by audioAssets.ts.
// We can use a non-null assertion if we're absolutely certain it always has elements.
const firstAvailableSound: SoundAsset = availableSounds.length > 0 
  ? availableSounds[0]! 
  : { id: 'default', name: 'Default', src: '/sounds/default.mp3' };


const defaultSettings: AppSettings = {
  alarmSound: availableSounds.find(s => s.id === 'htc_basic') ?? firstAvailableSound,
  countdownSound: availableSounds.find(s => s.id === 'htc_basic') ?? firstAvailableSound,
  theme: 'light',
};



const SETTINGS_STORAGE_KEY = 'appSettings';

export const useSettingsLogic = () => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (storedSettings) {
                const parsedSettings: Partial<AppSettings> = JSON.parse(storedSettings);

                // Safely get SoundAssets from parsed data, falling back to defaults
                // Ensure the `?.id` doesn't make the whole parsed object undefined.
const validAlarmSound =
    parsedSettings.alarmSound?.id
        ? availableSounds.find(s => s.id === parsedSettings.alarmSound!.id) ?? defaultSettings.alarmSound
        : defaultSettings.alarmSound;

const validCountdownSound =
    parsedSettings.countdownSound?.id
        ? availableSounds.find(s => s.id === parsedSettings.countdownSound!.id) ?? defaultSettings.countdownSound
        : defaultSettings.countdownSound;

                setSettings({
                    ...defaultSettings,
                    ...parsedSettings,
                    alarmSound: validAlarmSound,
                    countdownSound: validCountdownSound,
                    theme: parsedSettings.theme || defaultSettings.theme,
                });
            } else {
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
            setSettings(defaultSettings);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error("Failed to save settings:", error);
            }
        }
    }, [settings, isLoaded]);

    const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    return { settings, updateSettings, isLoaded, availableSounds };
};

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    availableSounds: SoundAsset[];
    isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const contextValue = useSettingsLogic();
    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};