import { useState, useEffect } from 'react';

export default function useNumberCounter(number: number) {
  const [count, setCount] = useState(0);
  const increment = Math.ceil(number / 100); // increment by 1% of the number

  useEffect(() => {
    if (count < number) {
      const counter = setInterval(() => {
        setCount((prevCount) => Math.min(prevCount + increment, number));
      }, 3);

      return () => clearInterval(counter);
    }
  }, [count, increment, number]);

  return count;
}
