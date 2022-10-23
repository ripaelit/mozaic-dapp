import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  interface Dimensions {
    width: any;
    height: any;
  }

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

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}
