import { useCallback, useEffect, useState } from "react";

const interval =
  (delay = 0) =>
  (callback: CallableFunction) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const useSecondsInterval = interval(1000);

export const useTimer = (initialSeconds: number, initialRunning: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(initialSeconds);
  const [running, setRunning] = useState(initialRunning);

  const tick = useCallback(
    () => (running ? setElapsedTime((elapsedTime) => elapsedTime + 1) : undefined),
    [running]
  );

  useSecondsInterval(tick);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setElapsedTime(0);
  const stop = () => {
    pause();
    reset();
  };

  return { pause, reset, running, elapsedTime, start, stop };
};
