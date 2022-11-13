import React from 'react';
import useBalance from '../../../hooks/useBalance';

// get max balance of the asset
export default function InputCheckBtn({
  type,
  text,
  active,
  onClick,
  onMax,
  currentAsset,
  currentDepositData,
  index,
  value,
}: {
  type?: string;
  text?: string;
  active?: boolean;
  onClick?: Function;
  onMax?: Function;
  currentAsset?: any;
  currentDepositData?: any;
  index?: number;
  value?: number;
}) {
  const [maxBalance] = useBalance(
    currentAsset && currentAsset.address,
    currentAsset && currentAsset.decimals
  );
  return (
    <>
      <div
        className={`check-btn-container ${
          type === 'max'
            ? maxBalance == currentDepositData.amount
              ? 'active'
              : ''
            : active
            ? 'active'
            : ''
        }`}
        onClick={
          type !== 'max'
            ? () => {
                onClick!(value, index);
              }
            : () => {
                onMax!(maxBalance, index);
              }
        }>
        {type === 'max' ? 'Max' : text}
      </div>
      <style jsx>{`
        .check-btn-container {
          padding: 0 10px;
          background-color: var(--inputBtnBgPrimary);
          cursor: pointer;
          color: var(--textSecondary);
          user-select: none;
          border-radius: 8px;
          font-size: 0.75rem;
          line-height: 0.9rem;
          text-align: center;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .active {
          color: var(--primary);
          font-weight: bold;
          background-color: var(--primaryT1);
        }
        @media screen and (max-width: 500px) {
          .check-btn-container {
            padding: 0 5px;
            font-size: 0.6rem;
          }
        }
      `}</style>
    </>
  );
}
