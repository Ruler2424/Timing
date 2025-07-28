'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer } from '../utils/sounds/playSound';
import useSound from 'use-sound';

interface CountdownTimerProps {
  countdownSoundSrc?: string;
  endMusicSrc?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  countdownSoundSrc = '/sounds/htc_basic.mp3'
}) => {
  const [initialTimeInput, setInitialTimeInput] = useState({ hours: 0, minutes: 5, seconds: 0 });
  const [initialTime, setInitialTime] = useState(0); // Начальное время в секундах
  const [timeLeft, setTimeLeft] = useState(0); // Оставшееся время в секундах
  const [isActive, setIsActive] = useState(false); // Флаг активности таймера
  const [isFinished, setIsFinished] = useState(false); // Флаг завершения отсчета
  const intervalRef = useRef<number | null>(null); // Ссылка на интервал для очистки

  const { play, stop, isPlaying } = useAudioPlayer();

  const [endMusicPlay, { stop: stopEndMusic, isPlaying: isEndMusicPlaying }] = useSound(countdownSoundSrc, {
    volume: 0.5,
    loop: false,
  });

  // Эффект для установки initialTime и timeLeft при изменении ввода времени
  useEffect(() => {
    const totalSeconds =
      initialTimeInput.hours * 3600 + initialTimeInput.minutes * 60 + initialTimeInput.seconds;
    setInitialTime(totalSeconds);
    // Если таймер не активен (или только что был сброшен/остановлен), обновить timeLeft
    // иначе, не обновляем timeLeft, чтобы сохранить текущее состояние при изменении ввода, если таймер был на паузе.
    if (!isActive && !isFinished) {
      setTimeLeft(totalSeconds);
    }
  }, [initialTimeInput, isActive, isFinished]);

  // Эффект для логики таймера (setInterval)
  useEffect(() => {
    if (!isActive) {
      // Если таймер не активен, очищаем интервал
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (timeLeft > 0) {
      // Если время есть, запускаем интервал
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Время вышло
      setIsActive(false); // Останавливаем таймер
      setIsFinished(true); // Устанавливаем флаг завершения
      if (intervalRef.current) clearInterval(intervalRef.current); // Очищаем интервал

      // Проигрываем звуки
      play(countdownSoundSrc).catch((e) => {
        console.error('Error playing countdown sound:', e);
      });
      endMusicPlay();
    }

    // Функция очистки при размонтировании или изменении зависимостей
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, play, countdownSoundSrc, endMusicPlay]);

  // Обработчик для кнопки Start/Pause/Resume
  const handleStartStop = useCallback(() => {
    // Если таймер закончен и музыка играет, эта кнопка не должна быть видимой
    // или должна выполнять другую функцию (например, остановку музыки).
    // Текущая логика UI уже разделяет это, поэтому здесь просто фокусируемся на таймере.

    if (timeLeft === 0 && !isActive && !isFinished) {
      // Если время 0, таймер неактивен, и он не завершен (т.е. на стартовой позиции)
      // Мы собираемся его запустить, поэтому устанавливаем timeLeft на initialTime.
      setTimeLeft(initialTime);
      setIsActive(true);
    } else if (isFinished) {
      // Если таймер уже завершен, кнопка Start/Pause/Resume не должна его перезапускать
      // без предварительного сброса. Эта ветка, по идее, не должна быть достигнута,
      // если UI правильно отображает кнопки "STOP MUSIC" или "RESET".
      console.warn("Attempted to start/pause a finished timer without reset.");
      return;
    } else {
      // Переключаем isActive для паузы/возобновления
      setIsActive((prev) => !prev);
    }
  }, [timeLeft, isActive, isFinished, initialTime]);


  // Обработчик для кнопки Reset
  const handleReset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(initialTime); // Сброс к исходному времени
    if (isPlaying(countdownSoundSrc)) stop(countdownSoundSrc); // Остановить короткий звук
    stopEndMusic(); // Остановить музыку окончания
  }, [initialTime, isPlaying, stop, stopEndMusic, countdownSoundSrc]);

  // Обработчик для кнопки Stop Music (показывается только после завершения)
  const handleStopMusic = useCallback(() => {
    stopEndMusic();
    setIsFinished(false); // Сбрасываем флаг завершения, так как музыка остановлена
  }, [stopEndMusic]);

  // Обработчик изменения ввода времени
  const handleTimeInputChange = useCallback(
    (unit: 'hours' | 'minutes' | 'seconds', e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      const maxValue = unit === 'hours' ? 23 : 59;

      if (!isNaN(value) && value >= 0) {
        setInitialTimeInput((prev) => ({
          ...prev,
          [unit]: Math.min(value, maxValue),
        }));
      } else if (e.target.value === '') {
        setInitialTimeInput((prev) => ({
          ...prev,
          [unit]: 0,
        }));
      }
    },
    []
  );

  // Форматирование времени для отображения
  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, []);

  // Состояние отображения: Idle (простой), Running, Paused, Finished
  const isIdle = !isActive && timeLeft === initialTime && !isFinished;
  const isPaused = !isActive && timeLeft !== initialTime && !isFinished;


  return (
    <div
      className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${
        isActive
          ? timeLeft > 0 && timeLeft <= initialTime / 2
            ? 'bg-red-500' // Меньше половины времени осталось
            : 'bg-green-500' // Больше половины времени осталось
          : 'bg-slate-700' // Неактивен
      }`}
    >
      <h3 className="font-semibold">Countdown</h3>
      <div className="text-center">
        <p className="mb-3 text-l font-bold uppercase tracking-widest">
          {isFinished
            ? 'Finished'
            : isActive
            ? 'Running'
            : isPaused
            ? 'Paused'
            : 'Stopped'} {/* Stopped = Idle state */}
        </p>
        <p className="font-digital text-5xl tracking-wider">{formatTime(timeLeft)}</p>
      </div>

      {isIdle ? ( // Поля ввода времени видны только в состоянии "Stopped" (Idle)
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <label className="block mb-0">Hours</label>
            <input
              type="number"
              value={initialTimeInput.hours}
              onChange={(e) => handleTimeInputChange('hours', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="23"
              disabled={isActive}
            />
          </div>
          <div>
            <label className="block mb-0">Minutes</label>
            <input
              type="number"
              value={initialTimeInput.minutes}
              onChange={(e) => handleTimeInputChange('minutes', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="59"
              disabled={isActive}
            />
          </div>
          <div>
            <label className="block mb-0">Seconds</label>
            <input
              type="number"
              value={initialTimeInput.seconds}
              onChange={(e) => handleTimeInputChange('seconds', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="59"
              disabled={isActive}
            />
          </div>
        </div>
      ) : (
        <div className="h-14"></div> // Заглушка для сохранения высоты
      )}

      <div className="flex gap-4">
        {isIdle ? ( // Кнопка START в состоянии "Stopped"
          <button
            onClick={handleStartStop}
            className="w-full bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            disabled={initialTime === 0} // Отключаем START если время 0
          >
            START
          </button>
        ) : isFinished && isEndMusicPlaying ? ( // Кнопка STOP MUSIC если завершено и музыка играет
          <button
            onClick={handleStopMusic}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            STOP MUSIC
          </button>
        ) : ( // Кнопки Pause/Resume и RESET в активном/паузе/завершенном (но без музыки) состоянии
          <>
            <button
              onClick={handleStartStop}
              className="w-1/2 bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={handleReset}
              className="w-1/2 bg-white/30 hover:bg-white/40 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;