
import { useState, useEffect } from 'react';

export const useCurrentTime = (refreshInterval: number = 1000) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, refreshInterval);

    return () => clearInterval(timerId);
  }, [refreshInterval]);

  return date;
};
