// hook to get current window width & height
import { useState, useEffect } from 'react';

export default function GetWindowDimensions() {
  interface Dimensions {
    width: number | undefined;
    height: number | undefined;
  }

  // initial window dimensions
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // add listener when resize is triggered
      window.addEventListener('resize', handleResize);

      handleResize();

      // remove listener when resize is stopped
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}
