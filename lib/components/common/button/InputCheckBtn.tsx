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
}: {
  type?: string;
  text?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMax?: Function;
  currentAsset: any;
  currentDepositData?: any;
  index?: number;
}) {
  const [maxBalance] = useBalance(currentAsset.address, currentAsset.decimals);
  return (
    <>
      <div
        className={`max-btn-container ${
          type === 'max' ? (maxBalance == currentDepositData.amount ? 'active' : '') : active
        }`}
        onClick={
          type !== 'max'
            ? onClick
            : () => {
                onMax!(maxBalance, index);
              }
        }>
        {type === 'max' ? 'Max' : text}
      </div>
      <style jsx>{`
        .max-btn-container {
          padding: 10px;
          background-color: var(--inputBtnBgPrimary);
          cursor: pointer;
          color: var(--textSecondary);
          user-select: none;
          border-radius: 8px;
        }
        .active {
          color: var(--primary);
          background-color: var(--primaryT1;
        }
      `}</style>
    </>
  );
}
