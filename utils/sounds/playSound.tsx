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

interface AudioPlayer {
  play: (src: string) => Promise<void>;
  pause: (src: string) => void;
  stop: (src: string) => void;
  isPlaying: (src: string) => boolean;
}

const AudioContext = createContext<AudioPlayer | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode; autoplaySrc?: string }> = ({ children, autoplaySrc }) => {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playingSources, setPlayingSources] = useState<Set<string>>(new Set());

  const getOrCreateAudioElement = useCallback((src: string): HTMLAudioElement => {
    if (!audioRefs.current.has(src)) {
      const audioElement = new Audio(src);
      audioElement.loop = false;
      audioElement.onended = () => {
        setPlayingSources(prev => {
          const next = new Set(prev);
          next.delete(src);
          return next;
        });
      };
      audioRefs.current.set(src, audioElement);
    }
    return audioRefs.current.get(src)!;
  }, []);

  const play = useCallback((src: string): Promise<void> => {
    const audio = getOrCreateAudioElement(src);
    audio.currentTime = 0;
    return audio.play()
      .then(() => {
        setPlayingSources(prev => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      })
      .catch(error => {
        console.error("Error playing audio:", src, error);
        throw error;
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
    return playingSources.has(src);
  }, [playingSources]);

  useEffect(() => {
    if (autoplaySrc) {
      play(autoplaySrc).catch((e) => {
        console.warn('Autoplay failed for:', autoplaySrc, e);
      });
    }

    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.onended = null;
        audio.removeAttribute('src');
        audio.load();
      });
      audioRefs.current.clear();
    };
  }, [autoplaySrc, play]);

  const value: AudioPlayer = { play, pause, stop, isPlaying };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};


export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }
  return context;
};