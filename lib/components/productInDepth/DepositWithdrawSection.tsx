import React, { useState } from 'react';
import PrimaryCard from '../common/card/PrimaryCard';
import ProductSummaryLoader from '../loader/productPageLoader/ProductSummaryLoader';
import WithdrawModal from '../common/modal/withdrawModal';
import DepositModal from '../common/modal/depositModal';
import TransactionBtn from '../common/button/TransactionBtn';
import InfoTooltip from '../common/button/InfoTooltip';
import useBackgroundTransition from '../../hooks/useBackgroundTransition';

const tooltipData = {
  deposit: 'Deposit your assets into the vault to earn yield',
  farming: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  optimizing:
    'Archimedes (AI) is currently optimizing your funds. It is searching and rebalancing to find you the best yield! Your funds will begin farming again when optimization is complete. This process may take up to 15 minutes.',
  withdraw: 'Withdraw your assets from the vault to get your principal back',
};

export default function DepositWithdrawSection({
  loading,
  vault,
}: {
  loading: boolean;
  vault: any;
}) {
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  const initialDepositState = {
    state: 'idle',
    estimatedTime: 0,
    remainingTime: 0,
  };

  const initialWithdrawState = {
    state: 'idle',
    estimatedTime: 0,
    remainingTime: 0,
  };

  const initialFarmingState = {
    state: 'idle',
    estimatedTime: 0,
    remainingTime: 0,
  };

  const depositStateReset = () => {
    setDepositState({
      state: 'idle',
      estimatedTime: 0,
      remainingTime: 0,
    });
  };

  const farmingStateReset = () => {
    setFarmingState({
      state: 'idle',
      estimatedTime: 0,
      remainingTime: 0,
    });
  };

  const [depositState, setDepositState] = useState(initialDepositState);
  const [withdrawState, setWithdrawState] = useState(initialWithdrawState);
  const [farmingState, setFarmingState] = useState(initialFarmingState);

  const onDepositSuccess = () => {
    setOpenDepositModal(false);
    setDepositState({
      state: 'pending',
      estimatedTime: 10,
      remainingTime: 10,
    });
    setTimeout(() => {
      setDepositState({
        state: 'done',
        estimatedTime: 1,
        remainingTime: 1,
      });
    }, 5000);
    setTimeout(() => {
      depositStateReset();
      farmingStateReset();
      setFarmingState({
        state: 'pending',
        estimatedTime: 15,
        remainingTime: 15,
      });
    }, 15000);
  };

  const onWithdrawalSuccess = () => {
    setOpenWithdrawModal(false);
    setWithdrawState({
      state: 'pending',
      estimatedTime: 10,
      remainingTime: 10,
    });
    setTimeout(() => {
      setWithdrawState({
        state: 'done',
        estimatedTime: 1,
        remainingTime: 1,
      });
    }, 5000);
  };

  return (
    <>
      <PrimaryCard title={{ visible: false }}>
        <div className='deposit-withdraw-container'>
          {!loading ? (
            <>
              <TransactionBtn
                state={depositState}
                onClick={setOpenDepositModal}
                buttonType='Deposit'
                tooltip={tooltipData.deposit}
                colors={{
                  startColor: '#988B48',
                  endColor: '#FFB800',
                }}
              />
              <FarmingOptimizingBar
                state={farmingState}
                tooltipFarming={tooltipData.farming}
                tooltipOptimizing={tooltipData.optimizing}
                colors={{
                  startColor: '#155F38',
                  endColor: '#154866',
                }}
              />
              <TransactionBtn
                state={withdrawState}
                onClick={setOpenWithdrawModal}
                buttonType='Withdraw'
                tooltip={tooltipData.withdraw}
                colors={{
                  startColor: '#66543E',
                  endColor: '#F7931A',
                }}
              />
            </>
          ) : (
            <ProductSummaryLoader />
          )}
        </div>
      </PrimaryCard>
      {openDepositModal && (
        <DepositModal
          vault={vault}
          setOpenDepositModal={setOpenDepositModal}
          onDepositSuccess={onDepositSuccess}
        />
      )}
      {openWithdrawModal && (
        <WithdrawModal
          vault={vault}
          setOpenWithdrawModal={setOpenWithdrawModal}
          onWithdrawalSuccess={onWithdrawalSuccess}
        />
      )}
      <style jsx>{`
        .deposit-withdraw-container {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}

const FarmingOptimizingBar = ({
  state,
  tooltipFarming,
  tooltipOptimizing,
  colors,
}: {
  state: any;
  tooltipFarming: string;
  tooltipOptimizing: string;
  colors: any;
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const backgroundColor = useBackgroundTransition({
    state: state.state,
    totalTime: state.estimatedTime,
    remainingTime: state.remainingTime,
    idleColor: 'var(--bg)',
    startColor: colors.startColor,
    endColor: colors.endColor,
  });

  return (
    <>
      <div className='farming-optimizing-bar'>
        <div className='farming-wrapper'>
          <InfoTooltip text={tooltipFarming} tooltipFor='farming' />
          <p className=''>Farming</p>
        </div>
        <div className='optimizing-wrapper'>
          <p className=''>Optimizing</p>
          <InfoTooltip text={tooltipFarming} tooltipFor='farming' />
        </div>
      </div>
      <style jsx>{`
        .farming-optimizing-bar {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
          background: ;
          padding: 10px;
          border-radius: 10px;
          font-size: 0.875rem;
          background: ${backgroundColor};
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
      `}</style>
    </>
  );
};
