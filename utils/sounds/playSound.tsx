
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

// Тип интерфейса плеера
interface AudioPlayer {
  play: (src: string) => Promise<void>;
  pause: (src: string) => void;
  stop: (src: string) => void;
  isPlaying: (src: string) => boolean;
}

// Контекст
const AudioContext = createContext<AudioPlayer | undefined>(undefined);

// ✅ Правильная инициализация провайдера
export const AudioProvider: React.FC<{ children: ReactNode; autoplaySrc?: string }> = ({ children, autoplaySrc }) => {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playingSources, setPlayingSources] = useState<Set<string>>(new Set());

  const getOrCreateAudioElement = useCallback((src: string): HTMLAudioElement => {
    if (!audioRefs.current.has(src)) {
      const audioElement = new Audio(src);
      audioElement.loop = false; // Usually, countdown sounds don't loop
      // --- IMPORTANT ADDITION START ---
      audioElement.onended = () => {
        setPlayingSources(prev => {
          const next = new Set(prev);
          next.delete(src); // Remove from playingSources when it finishes
          return next;
        });
      };
      // --- IMPORTANT ADDITION END ---
      audioRefs.current.set(src, audioElement);
    }
    return audioRefs.current.get(src)!;
  }, []);

  const play = useCallback((src: string): Promise<void> => {
    const audio = getOrCreateAudioElement(src);
    audio.currentTime = 0; // Always start from the beginning
    return audio.play()
      .then(() => {
        setPlayingSources(prev => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      })
      .catch(error => {
        // This catch block will tell you if autoplay failed!
        console.error("Error playing audio:", src, error);
        // You might want to inform the user here that audio playback was blocked.
        // For example: alert("Audio playback blocked by browser. Please interact with the page first.");
        throw error; // Re-throw if you want the caller to handle it further
      });
  }, [getOrCreateAudioElement]);

  const pause = useCallback((src: string) => {
    const audio = audioRefs.current.get(src);
    if (audio) {
      audio.pause();
      setPlayingSources(prev => {
        const next = new Set(prev);
        next.delete(src);
        return next;
      });
    }
  }, []);

  const stop = useCallback((src: string) => {
    const audio = audioRefs.current.get(src);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingSources(prev => {
        const next = new Set(prev);
        next.delete(src);
        return next;
      });
    }
  }, []);

  const isPlaying = useCallback((src: string) => {
    // This now relies on the onended listener for accuracy
    return playingSources.has(src);
  }, [playingSources]);

  useEffect(() => {
    if (autoplaySrc) {
      // This will very likely fail due to autoplay policies if no user interaction
      // has occurred yet. Consider removing autoplaySrc or making its usage explicit
      // (e.g., only play after a specific user click that enables background audio).
      play(autoplaySrc).catch((e) => {
        console.warn('Autoplay failed for:', autoplaySrc, e);
        // Inform user: "Please click anywhere to enable sounds."
      });
    }

    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.onended = null; // Clean up event listener
        audio.removeAttribute('src'); // Detach source
        audio.load(); // Reload to free resources
      });
      audioRefs.current.clear();
    };
  }, [autoplaySrc, play]); // Added play to dependencies for the linter, though it's memoized

  const value: AudioPlayer = { play, pause, stop, isPlaying };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};


// Хук
export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }
  return context;
};
