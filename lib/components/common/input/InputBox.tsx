import React from 'react';

export default function InputBox({
  inputType = 'number',
  inputValue,
  onChange,
  rightElement,
  readOnly = false,
}: {
  inputValue: number;
  onChange?: Function;
  inputType?: string;
  rightElement?: JSX.Element;
  readOnly?: boolean;
}) {
  return (
    <>
      <div className='input-box-container'>
        <input
          type={inputType}
          min={0}
          readOnly={readOnly}
          value={inputValue}
          onChange={(e) => {
            onChange ? onChange(e) : null;
          }}
        />
        <div className='right-element-wrapper'>{rightElement}</div>
      </div>
      <style jsx>{`
        .input-box-container {
          width: 100%;
          height: 64px;
          padding: 12px;
          border: 1px solid var(--outlinePrimary);
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          transition: all 0.2s ease;
        }

        input {
          width: 100%;
          font-size: 1.4rem;
          background-color: transparent;
          color: var(--textPrimary);
          outline: none !important;
          border: none !important;
          ${readOnly ? 'cursor: default;' : ''}
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .input-box-container:focus-within {
          border-color: var(--primaryT1);
          background-color: var(--textPrimaryT2);
        }

        .right-element-wrapper {
          height: 100%;
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </>
  );
}
