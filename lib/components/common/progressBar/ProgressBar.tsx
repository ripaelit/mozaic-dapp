import React, { useEffect, useState } from 'react';

export default function ProgressBar({
  value = 30,
  maxValue = 100,
}: {
  value: number;
  maxValue?: number;
}) {
  const [sliderPosition, setSliderPosition] = useState(0);

  const percentageCalculator = (value: number, maxValue: number) => {
    const result = (value / maxValue) * 100;
    return result;
  };

  useEffect(() => {
    setSliderPosition(percentageCalculator(value, maxValue));
  }, []);

  return (
    <>
      <div className='progressbar-container'>
        <div className='progressbar'></div>
      </div>
      <style jsx>{`
        .progressbar-container {
          width: 100%;
          height: 4px;
          border-radius: 4px;
          background-color: var(--textPrimaryT1);
        }
        .progressbar {
          width: ${sliderPosition}%;
          height: 4px;
          border-radius: 4px;
          background: var(--sliderGrad);
          transition: all 0.5s ease;
        }
      `}</style>
    </>
  );
}
