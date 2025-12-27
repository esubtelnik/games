import { useState, useEffect, useCallback } from "react";

interface UseGameTimerProps {
  initialSeconds?: number;
  initialIsPaused?: boolean;
}

export const useGameTimer = ({
  initialSeconds = 0,
  initialIsPaused = true,
}: UseGameTimerProps = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(initialIsPaused);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && hasStarted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, hasStarted]);

  const startTimer = useCallback(() => {
    setHasStarted(true);
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (hasStarted) { 
      setIsPaused((prev) => !prev);
    }
  }, [hasStarted]);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsPaused(true);
    setHasStarted(false);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    seconds,
    isPaused,
    hasStarted,
    togglePause,
    resetTimer,
    startTimer,
    setSeconds,
    setIsPaused,
    formattedTime: formatTime(seconds),
  };
};