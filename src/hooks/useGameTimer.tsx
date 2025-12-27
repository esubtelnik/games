
import { useState, useEffect, useCallback } from "react";

interface UseGameTimerProps {
  initialSeconds?: number;
  initialIsPaused?: boolean;
}

export const useGameTimer = ({
  initialSeconds = 0,
  initialIsPaused = false,
}: UseGameTimerProps = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(initialIsPaused);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsPaused(false);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    seconds,
    isPaused,
    togglePause,
    resetTimer,
    setSeconds,
    setIsPaused,
    formattedTime: formatTime(seconds),
  };
};