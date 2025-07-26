// src/hooks/useSettings.ts
import { useState, useEffect, useCallback } from 'react';
import { SoundAsset, availableSounds } from '../../utils/sounds/audioAssets'; // Импортируем доступные звуки

// Тип для хранения всех настроек
export interface AppSettings {
    alarmSound: SoundAsset;
    countdownSound: SoundAsset;
    // Добавьте другие настройки сюда, например:
    // defaultCountdownTime: { hours: number, minutes: number, seconds: number };
}

// Значения настроек по умолчанию
const defaultSettings: AppSettings = {
    alarmSound: availableSounds.find(s => s.id === 'htc_basic') || availableSounds[0],
    countdownSound: availableSounds.find(s => s.id === 'htc_basic') || availableSounds[0],
    // defaultCountdownTime: { hours: 0, minutes: 5, seconds: 0 },
};

const SETTINGS_STORAGE_KEY = 'appSettings';

export const useSettings = () => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Загрузка настроек из localStorage при монтировании
    useEffect(() => {
        try {
            const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (storedSettings) {
                const parsedSettings: AppSettings = JSON.parse(storedSettings);
                // Проверяем, существуют ли загруженные звуки, и используем дефолтные, если нет
                const validAlarmSound = availableSounds.find(s => s.id === parsedSettings.alarmSound?.id) || defaultSettings.alarmSound;
                const validCountdownSound = availableSounds.find(s => s.id === parsedSettings.countdownSound?.id) || defaultSettings.countdownSound;
                
                setSettings({
                    ...parsedSettings,
                    alarmSound: validAlarmSound,
                    countdownSound: validCountdownSound,
                });
            } else {
                // Если ничего не сохранено, используем дефолтные
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
            setSettings(defaultSettings); // Сбрасываем на дефолтные в случае ошибки
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Сохранение настроек в localStorage при их изменении
    useEffect(() => {
        if (isLoaded) { // Сохраняем только после первой загрузки, чтобы не перезаписать дефолты пустыми
            try {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error("Failed to save settings:", error);
            }
        }
    }, [settings, isLoaded]);

    // Функция для обновления настроек
    const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings };
            // Дополнительная валидация, если нужно
            return updated;
        });
    }, []);

    return { settings, updateSettings, isLoaded, availableSounds };
};