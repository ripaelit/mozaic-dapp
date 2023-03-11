import React, { useEffect, useState } from 'react';
import DepositModal from '../modal/depositModal';
import WithdrawModal from '../modal/withdrawModal';
import InfoTooltip from './InfoTooltip';
import useBackgroundTransition from '../../../hooks/useBackgroundTransition';

export default function TransactionBtn({ buttonType, onClick, tooltip, state, colors }: any) {
  const [background, setBackground] = useState('black');
  const backgroundColor = useBackgroundTransition({
    state: state.state,
    totalTime: state.estimatedTime,
    remainingTime: state.remainingTime,
    idleColor: 'var(--bg)',
    startColor: colors.startColor,
    endColor: colors.endColor,
  });

  console.log(state);

  // Set the background to orange after 2 seconds
  setTimeout(() => {
    setBackground('orange');
  }, 2000);

  return (
    <>
      <div className='transaction-btn-container'>
        <div className='btn transaction-btn' onClick={() => onClick(true)}>
          {buttonType}
        </div>
        <div className='transaction-info'>
          <p>
            {state.state === 'idle'
              ? 'Idle'
              : state.state === 'pending'
              ? buttonType + 'ing...'
              : state.state === 'done'
              ? buttonType + (buttonType == 'Deposit' ? 'ed!' : 'n!')
              : 'an error occurred'}
          </p>
          <InfoTooltip text={tooltip} tooltipFor={buttonType} />
        </div>
      </div>

      <style jsx>{`
        .transaction-btn-container {
          width: 100%;
          max-width: 300px;
          height: 56px;
          padding: 8px;
          border-radius: 12px;
          background: ${backgroundColor};
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .transaction-btn {
          height: 100%;
          border-radius: 6px;
          display: flex;
          flex: 3;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #272b30;
          box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px rgba(0, 0, 0, 0.04),
            inset 0px 2px 0px rgba(255, 255, 255, 0.06);
          border-radius: 8px;
        }

        .transaction-info {
          height: 100%;
          display: flex;
          flex: 4;
          align-items: center;
          padding-left: 20px;
          justify-content: space-between;
          font-size: 0.875rem;
          color: ${state.state === 'idle' ? 'var(--textSecondary)' : 'var(--text)'};
        }

        @media screen and (max-width: 600px) {
          .transaction-btn-container {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
