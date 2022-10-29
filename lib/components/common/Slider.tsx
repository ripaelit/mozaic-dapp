import React from 'react';

export default function Slider({ max = 100, min = 0, current = 50 }) {
  return (
    <>
      <div className='slider-container'>
        <div className='progress'>
          <div className='handle'>
            <div className='inner'></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider-container {
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background-color: var(--outlinePrimary);
        }
        .progress {
          display: flex;
          align-items: center;
          position: relative;
          height: 100%;
          width: ${(100 * current) / max}%;
          background-color: var(--primary);
        }
        .handle {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 14px;
          width: 14px;
          border-radius: 10px;
          background-color: var(--primary);
          right: -7px;
        }
        .inner {
          width: 60%;
          height: 60%;
          background-color: var(--textPrimary);
          border-radius: 5px;
          box-shadow: 0 3px 4px rgba(0, 0, 0, 0.34);
        }
      `}</style>
    </>
  );
}
