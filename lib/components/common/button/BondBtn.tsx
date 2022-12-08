import React from 'react';

export default function BondBtn({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <>
      <div className='bond-btn-container' onClick={onClick}>
        {icon && <img src={icon} alt='' />}
        <p>{text}</p>
      </div>
      <style jsx>{`
        .bond-btn-container {
          display: flex;
          gap: 10px;
          background-color: transparent;
          color: var(--textPrimary);
          border: 1px solid var(--outlinePrimary);
          padding: 10px 20px;
          width: min-content;
          font-weight: 500;
          border-radius: 10px;
          user-select: none;
          cursor: pointer;
          transition: all 0.2s ease;
          height: min-content;
        }
        .bond-btn-container:hover {
          background-color: var(--primaryT1);
          border: 1px solid var(--primaryT1);
        }
        .bond-btn-container:active {
          background-color: var(--primary);
          color: var(--cardBgPrimary);
        }
      `}</style>
    </>
  );
}
