import React from 'react';

import InfoTooltip from './InfoTooltip';

export default function TransactionBtn({ buttonType, onClick, tooltip, state, colors, amount, prefix, postfix }: any) {
  return (
    <>
      <div className={`transaction-btn-container gradient-animation`}>
        <div className='overlay-wrapper'>
          <div className={`bg-overlay ${state}`}></div>
        </div>
        <div className='transition-btn-wrapper'>
          <div className='btn transaction-btn' onClick={() => onClick(true)}>
            {buttonType}
          </div>
          <div className='transaction-info'>
            <p className={`btn-label ${state === 'idle' ? 'inactive' : 'active'}`}>
              {amount > 0 ? `${buttonType}ing ${prefix || ''}${amount}${postfix || ''} ...` : '--'}
            </p>
            <InfoTooltip text={tooltip} tooltipFor={buttonType} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .transaction-btn-container {
          position: relative;
          width: 100%;
          max-width: 300px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: var(--bg);
        }

        .overlay-wrapper {
          position: absolute;
          background-color: var(--bg);
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }

        .bg-overlay {
          position: absolute;
          height: 100%;
          width: 100%;
          -webkit-mask-image: linear-gradient(
            to left,
            transparent 0%,
            black 40%,
            black 60%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to left,
            transparent 0%,
            black 40%,
            black 60%,
            transparent 100%
          );
        }

        .idle {
          background-color: ${colors.startColor};
          opacity: 0;
          left: -100%;
          transition: opacity 1s ease, left 1s ease 1s;
        }

        .pending {
          background-color: ${colors.endColor};
          opacity: 1;
          left: 50%;
          transition: all 5s ease;
        }

        .transition-btn-wrapper {
          position: absolute;
          padding: 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
          height: 100%;
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

        .btn-label {
          transition: all 0.3s ease-in-out;
        }

        .inactive {
          opacity: 0.5;
        }

        .active {
          opacity: 1;
          font-weight: 600;
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

// @keyframes transition-animation {
//   0% {
//     left: -100%;
//     opacity: 1;
//     background-color: ${colors.startColor};
//   }

//   75% {
//     left: 50%;
//     opacity: 1;
//     background-color: ${colors.endColor};
//   }
//   100% {
//     left: 50%;
//     opacity: 0;
//     background-color: var(--bg);
//   }
// }
