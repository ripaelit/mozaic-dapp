import React from 'react';

export default function InputLabel({
  label,
  labelRightElement,
}: {
  label: string;
  labelRightElement?: JSX.Element;
}) {
  return (
    <>
      <div className='label-wrapper'>
        <p className='label'>{label}</p>
        <div className='label-right-element'>{labelRightElement}</div>
      </div>
      <style jsx>{`
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
