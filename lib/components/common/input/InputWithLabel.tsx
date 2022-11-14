import React from 'react';
import InputBox from './InputBox';
import InputLabel from './InputLabel';

export default function InputWithLabel({
  inputType = 'number',
  inputValue,
  onChange,
  rightElement,
  labelRightElement,
  label = 'Label',
  readOnly,
  placeholder,
}: {
  inputValue: number;
  onChange?: Function;
  inputType?: string;
  rightElement?: JSX.Element;
  labelRightElement?: JSX.Element;
  label: string;
  readOnly?: boolean;
  placeholder?: string;
}) {
  return (
    <>
      <div className='input-box-with-label-container'>
        <InputLabel label={label} labelRightElement={labelRightElement} />
        <InputBox
          inputValue={inputValue}
          onChange={onChange}
          inputType={inputType}
          rightElement={rightElement}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      </div>
      <style jsx>{`
        .input-box-with-label-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .label {
          font-weight: bold;
        }
        .label-wrapper {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
