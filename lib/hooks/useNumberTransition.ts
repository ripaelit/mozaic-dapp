import { useState, useEffect } from 'react';

function useNumberTransition(start: number, end: number, duration: number) {
  const [currentNumber, setCurrentNumber] = useState<string | number>(start);

  useEffect(() => {
    let startTime: number;
    let requestId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextNumber = interpolateNumber(start, end, progress);
      setCurrentNumber(nextNumber);
      if (progress < 1) {
        requestId = requestAnimationFrame(animate);
      }
    };

    requestId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [start, end, duration]);

  return currentNumber;
}

function interpolateNumber(start: number, end: number, progress: number) {
  const range = end - start;
  const value = start + range * progress;
  const rounded = Math.round(value);
  const padded = String(rounded).padStart(2, '0');
  return padded;
}

export default useNumberTransition;
