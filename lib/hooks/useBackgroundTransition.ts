import { useState, useEffect } from 'react';
import useColorTransition from './useColorTransition';

const useBackgroundTransition = ({
  state,
  totalTime,
  remainingTime,
  idleColor,
  startColor,
  endColor,
}: {
  state: string;
  totalTime: number;
  remainingTime: number;
  idleColor: string;
  startColor: string;
  endColor: string;
}) => {
  const currentProgress = 100 - (remainingTime / totalTime) * 100;
  const gradientColor = useColorTransition(startColor, endColor, remainingTime * 1000);
  const [progress, setProgress] = useState(currentProgress);
  const step = (100 - currentProgress) / (remainingTime * 2) / 10;

  useEffect(() => {
    if (state === 'idle') {
      setProgress(0);
    } else {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + step;
          if (newProgress >= 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [remainingTime, totalTime, state]);

  const getBackgroundColor = () => {
    const gradientColors =
      state === 'idle'
        ? `${idleColor}`
        : `linear-gradient(90deg, ${idleColor} ${
            progress - 50
          }% ,${gradientColor} ${progress}%, ${idleColor} ${progress + 30}%);`;
    return gradientColors;
  };

  return getBackgroundColor();
};

export default useBackgroundTransition;
