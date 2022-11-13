import React from 'react';

export default function SlippageEditor({ value, onChange }: { value: number; onChange: Function }) {
  return (
    <>
      <div className='slippage-container'>
        <p>Slippage</p>
        <div className='slippage-editor'>
          <input
            className='slippage-input'
            maxLength={4}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <p>%</p>
          <img src='/assets/icons/ico.edit.svg' alt='' />
        </div>
      </div>
      <style jsx>{`
        .slippage-container {
          font-size: 0.75rem;
          color: var(--textLabel);
          display: flex;
          gap: 8px;
          height: 28px;
          align-items: center;
        }

        .slippage-editor {
          display: flex;
          justify-content: space-between;
          width: min-content;
          border: 1px solid var(--outlinePrimary);
          padding: 4px 8px;
          border-radius: 8px;
          gap: 8px;
        }

        .slippage-editor:focus-within {
          border-color: var(--primaryT1);
        }

        .slippage-input {
          display: flex;
          width: 100%;
          min-width: 20px;
          align-items: center;
          height: 100%;
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--primary);
          background: transparent !important;
        }

        .slippage-input {
          border: none;
          outline: none;
        }
      `}</style>
    </>
  );
}
