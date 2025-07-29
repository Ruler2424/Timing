// src/utils/audio/audioAssets.ts

// Список доступных звуков. Указываем их пути, чтобы они были доступны из public
export const availableSounds = [
    { id: 'htc_basic', name: 'HTC Basic', src: '/sounds/htc_basic.mp3' },
    { id: 'simple_alert', name: 'Simple Alert', src: '/sounds/simple_alert.mp3' },
    { id: 'morning_tune', name: 'Morning Tune', src: '/sounds/morning_tune.mp3' },
    { id: 'agenda_alert', name: 'Agenda Alert', src: '/sounds/agenda-alert.mp3' }, // Added this sound
];

// Определяем тип для объекта звука
export type SoundAsset = typeof availableSounds[0];