// utils/sounds/useAudioPlayer.ts
import { useRef } from 'react';

export function useAudioPlayer() {
    const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

    const play = (src: string) => {
        if (!audioRef.current[src]) {
            const audio = new Audio(src);
            audio.loop = true;
            audioRef.current[src] = audio;
        }
        audioRef.current[src]?.play();
    };

    const stop = (src: string) => {
        const audio = audioRef.current[src];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const isPlaying = (src: string) => {
        const audio = audioRef.current[src];
        return audio && !audio.paused;
    };

    return { play, stop, isPlaying };
}
