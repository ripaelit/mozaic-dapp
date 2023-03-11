import { useState, useEffect } from 'react';

function useColorTransition(color1: string, color2: string, duration: number) {
  const [currentColor, setCurrentColor] = useState(color1);

  useEffect(() => {
    let startTime: number;
    let requestId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextColor = interpolateColor(color1, color2, progress);
      setCurrentColor(nextColor);
      if (progress < 1) {
        requestId = requestAnimationFrame(animate);
      }
    };

    requestId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [color1, color2, duration]);

  return currentColor;
}

function interpolateColor(color1: any, color2: any, progress: number) {
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (value: { toString: (arg0: number) => any }) => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  const start = hexToRgb(color1);
  const end = hexToRgb(color2);

  const r = Math.round(start.r + (end.r - start.r) * progress);
  const g = Math.round(start.g + (end.g - start.g) * progress);
  const b = Math.round(start.b + (end.b - start.b) * progress);

  return rgbToHex(r, g, b);
}

export default useColorTransition;
