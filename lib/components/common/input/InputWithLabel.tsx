import React from 'react';
import InputBox from './InputBox';

export default function InputWithLabel({
  inputType = 'number',
  inputValue,
  onChange,
  rightElement,
  labelRightElement,
  label = 'Label',
  readOnly,
}: {
  inputValue: number;
  onChange?: Function;
  inputType?: string;
  rightElement?: JSX.Element;
  labelRightElement?: JSX.Element;
  label: string;
  readOnly?: boolean;
}) {
  return (
    <>
      <div className='input-box-with-label-container'>
        <div className='label-wrapper'>
          <p className='label'>{label}</p>
          <div className='label-right-element'>{labelRightElement}</div>
        </div>
        <InputBox
          inputValue={inputValue}
          onChange={onChange}
          inputType={inputType}
          rightElement={rightElement}
          readOnly={readOnly}
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
