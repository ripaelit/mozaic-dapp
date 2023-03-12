import { useEffect, useRef, useState } from 'react';
import useBackgroundTransition from '../../../hooks/useBackgroundTransition';
import InfoTooltip from '../../common/button/InfoTooltip';

const FarmingOptimizingBar = ({
  state,
  tooltipFarming,
  tooltipOptimizing,
  colors,
}: {
  state: string;
  tooltipFarming: string;
  tooltipOptimizing: string;
  colors: any;
}) => {
  const [barClass, setBarClass] = useState<string>('idle');

  useEffect(() => {
    setBarClass('idle');
    setTimeout(() => {
      setBarClass(state);
    }, 500);

    console.log('state', state);
  }, [state]);

  return (
    <>
      <div className='farming-optimizing-bar'>
        <div className='overlay-wrapper'>
          <div className={`bg-overlay ${barClass}`}></div>
        </div>
        <div className='indicator-wrapper'>
          <div className='farming-wrapper'>
            <InfoTooltip text={tooltipFarming} tooltipFor='farming' />
            <p className={`bar-label ${state === 'farming' ? 'active' : 'inactive'}`}>Farming</p>
          </div>
          <div className='optimizing-wrapper'>
            <p className={`bar-label ${state === 'optimizing' ? 'active' : 'inactive'}`}>
              Optimizing
            </p>
            <InfoTooltip text={tooltipOptimizing} tooltipFor='optimizing' />
          </div>
        </div>
      </div>
      <style jsx>{`
        .farming-optimizing-bar {
          position: relative;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
          background: ;
          border-radius: 10px;
          height: 56px;
          font-size: 0.875rem;
          background: var(--bg);
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
          width: 50%;
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
          opacity: 0;
          left: 25%;
          transition: all 1s ease;
        }

        .farming {
          left: 25%;
          opacity: 1;
          animation: farming-animation 3s ease-in-out infinite;
          transition: all 1s ease;
        }

        .optimizing {
          left: 25%;
          opacity: 1;
          animation: optimizing-animation 3s ease-in-out infinite;
          transition: all 1s ease;
        }

        @keyframes farming-animation {
          0% {
            left: -20%;
            background-color: ${colors.startColor};
          }

          75% {
            left: 0%;
            background-color: ${colors.startColor};
          }
          100% {
            left: -20%;
            background-color: ${colors.startColor};
          }
        }

        @keyframes optimizing-animation {
          0% {
            left: 70%;
            background-color: ${colors.endColor};
          }

          75% {
            left: 50%;
            background-color: ${colors.endColor};
          }
          100% {
            left: 70%;
            background-color: ${colors.endColor};
          }
        }

        .indicator-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
        }

        .farming-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }

        .optimizing-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .bar-label {
          transition: all 1s ease-in-out;
        }

        .inactive {
          opacity: 0.3;
        }

        .active {
          opacity: 1;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default FarmingOptimizingBar;
