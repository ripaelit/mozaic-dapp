import React from 'react';

export default function InputBox({
  inputType = 'number',
  inputValue,
  onChange,
  rightElement,
  readOnly = false,
  placeholder,
  index,
  datePicker,
  textarea,
}: {
  inputValue: any;
  onChange?: Function;
  inputType?: string;
  rightElement?: JSX.Element;
  readOnly?: boolean;
  placeholder?: string;
  index?: number;
  datePicker?: boolean;
  textarea?: boolean;
}) {
  return (
    <>
      <div className='input-box-container'>
        {!textarea ? (
          !datePicker ? (
            <input
              type={inputType}
              min={0}
              readOnly={readOnly}
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => {
                onChange ? onChange(e, index && index) : null;
              }}
            />
          ) : (
            <input
              type='date'
              readOnly={readOnly}
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => {
                onChange ? onChange(e) : null;
              }}
            />
          )
        ) : (
          <textarea
            className='textarea'
            readOnly={readOnly}
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => {
              onChange ? onChange(e, index && index) : null;
            }}></textarea>
        )}
        <div className='right-element-wrapper'>{rightElement}</div>
      </div>
      <style jsx>{`
        .input-box-container {
          width: 100%;
          height: 64px;
          ${textarea ? 'height: 160px;' : ''}
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

        ${!datePicker
          ? `input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;}`
          : ''}

        input[type="date"]::-webkit-calendar-picker-indicator {
          color: rgba(0, 0, 0, 0);
          opacity: 1;
          display: block;
          background: url('/assets/icons/ico.datepicker.svg') no-repeat;
          width: 20px;
          height: 20px;
          border-width: thin;
        }

        input::placeholder {
          font-size: 1rem;
          padding-left: 8px;
        }

        .input-box-container:focus-within {
          border-color: var(--primaryT1);
          background-color: var(--textPrimaryT2);
        }

        .textarea {
          width: 100%;
          background-color: transparent;
          color: var(--textPrimary);
          outline: none !important;
          border: none !important;
          font-family: inherit;
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
