// src/utils/audio/audioAssets.ts

// Список доступных звуков. Указываем их пути, чтобы они были доступны из public
export const availableSounds = [
    { id: 'htc_basic', name: 'HTC Basic', src: '/sounds/htc_basic.mp3' },
    { id: 'simple_alert', name: 'Simple Alert', src: '/sounds/simple_alert.mp3' },
    { id: 'morning_tune', name: 'Morning Tune', src: '/sounds/morning_tune.mp3' },
    // Добавьте сюда другие звуки, если они есть
];

// Определяем тип для объекта звука
export type SoundAsset = typeof availableSounds[0];