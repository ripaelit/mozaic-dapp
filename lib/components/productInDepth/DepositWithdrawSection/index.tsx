import React, { useEffect, useState } from 'react';
import PrimaryCard from '../../common/card/PrimaryCard';
import ProductSummaryLoader from '../../loader/productPageLoader/ProductSummaryLoader';
import WithdrawModal from '../../common/modal/withdrawModal';
import DepositModal from '../../common/modal/depositModal';
import TransactionBtn from '../../common/button/TransactionBtn';
import InfoTooltip from '../../common/button/InfoTooltip';
import useBackgroundTransition from '../../../hooks/useBackgroundTransition';
import FarmingOptimizingBar from './FarmingOptimizingBar';

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

  const [depositState, setDepositState] = useState('idle');
  const [withdrawState, setWithdrawState] = useState('idle');
  const [balancingState, setBalancingState] = useState('farming');

  const onDepositSuccess = () => {
    setOpenDepositModal(false);
    setDepositState('pending');
    setTimeout(() => {
      setDepositState('idle');
    }, 5000);
  };

  const onWithdrawalSuccess = () => {
    setOpenWithdrawModal(false);
    setWithdrawState('pending');
    setTimeout(() => {
      setWithdrawState('idle');
    }, 5000);
  };

  // dummy optimization/farming state

  useEffect(() => {
    if (balancingState === 'optimizing') {
      setTimeout(() => {
        setBalancingState('farming');
      }, 15000);
    }

    if (balancingState === 'farming') {
      setTimeout(() => {
        setBalancingState('optimizing');
      }, 15000);
    }
  }, [balancingState]);

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
                state={balancingState}
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
