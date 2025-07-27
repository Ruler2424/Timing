// hooks/useSettings.ts
'use client'; // THIS MUST BE THE VERY FIRST LINE, EXACTLY AS WRITTEN

import { useState, useEffect, useCallback, createContext, useContext } from 'react'; // createContext and useContext also need to be here
import { SoundAsset, availableSounds } from '@/utils/sounds/audioAssets'; // Update import path

// Typename for storing all settings
export interface AppSettings {
    alarmSound: SoundAsset;
    countdownSound: SoundAsset;
    theme: string; // Add theme to settings
    // Add other settings here
}

// Default settings values
const defaultSettings: AppSettings = {
    alarmSound: availableSounds.find(s => s.id === 'htc_basic') || availableSounds[0],
    countdownSound: availableSounds.find(s => s.id === 'htc_basic') || availableSounds[0],
    theme: 'light', // Default theme
};

const SETTINGS_STORAGE_KEY = 'appSettings';

// This is the core logic hook. We'll create a context provider for it.
export const useSettingsLogic = () => { // Renamed to avoid confusion with context hook
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (storedSettings) {
                const parsedSettings: AppSettings = JSON.parse(storedSettings);
                // Check if loaded sounds exist and use defaults if not
                const validAlarmSound = availableSounds.find(s => s.id === parsedSettings.alarmSound?.id) || defaultSettings.alarmSound;
                const validCountdownSound = availableSounds.find(s => s.id === parsedSettings.countdownSound?.id) || defaultSettings.countdownSound;

                setSettings({
                    ...defaultSettings, // Start with defaults to ensure all keys are present
                    ...parsedSettings, // Then apply parsed settings
                    alarmSound: validAlarmSound,
                    countdownSound: validCountdownSound,
                    theme: parsedSettings.theme || defaultSettings.theme, // Ensure theme is set
                });
            } else {
                // If nothing saved, use defaults
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
            setSettings(defaultSettings); // Reset to defaults in case of error
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save settings to localStorage when they change
    useEffect(() => {
        if (isLoaded) { // Only save after initial load to avoid overwriting defaults with empty
            try {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error("Failed to save settings:", error);
            }
        }
    }, [settings, isLoaded]);

    // Function to update settings
    const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    return { settings, updateSettings, isLoaded, availableSounds };
};

// Interface for the context value
interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    availableSounds: SoundAsset[];
    isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const contextValue = useSettingsLogic(); // Use the actual hook logic
    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => { // This is the public hook to use in components
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};