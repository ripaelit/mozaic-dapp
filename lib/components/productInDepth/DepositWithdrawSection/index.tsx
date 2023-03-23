import React, { useEffect, useState } from 'react';
import PrimaryCard from '../../common/card/PrimaryCard';
import ProductSummaryLoader from '../../loader/productPageLoader/ProductSummaryLoader';
import WithdrawModal from '../../common/modal/withdrawModal';
import DepositModal from '../../common/modal/depositModal';
import TransactionBtn from '../../common/button/TransactionBtn';
import FarmingOptimizingBar from './FarmingOptimizingBar';
import { chains } from '../../../data/static/wallet';
import Web3 from 'web3';
import { getPrimaryVaultContract, getSecondaryVaultContract } from '../../../store/contractStore';
import { AssetElement } from '../../../types/product';

const tooltipData = {
  deposit:
    'Your funds are currently being deposited into the vault. We batch deposits every hour to save on gas fees. Your money will begin farming within the hour, please check back soon!',
  farming: 'Archimedes (AI) is actively farming for you!',
  optimizing:
    'Archimedes (AI) is currently optimizing your funds. It is searching and rebalancing to find you the best yield! \n\nYour funds will begin farming again when optimization is complete. This process may take up to 15 minutes.',
  withdraw:
    'Your funds are currently being withdrawn into your wallet. We batch withdrawals every hour to save on gas fees. Your money will be returned to you within the hour, please check back soon!',
};

export default function DepositWithdrawSection({
  loading,
  vault,
}: {
  loading: boolean;
  vault: AssetElement[];
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
    }, 10000);
  };

  const onWithdrawalSuccess = () => {
    setOpenWithdrawModal(false);
    setWithdrawState('pending');
    setTimeout(() => {
      setWithdrawState('idle');
    }, 10000);
  };

  const updateBalancingState = async () => {
    console.log("updateMozaicStatus");

    
    const primaryVault = vault.find(obj => obj.id == 0) as AssetElement;
    if (!primaryVault) {
      console.log(`updateBalancingState: Could not find primary vault`);
      return;
    }
    
    const chain = chains.find((obj => obj.name == primaryVault.name));
    if (!chain) {
        console.log(`Could not find chain for name ${primaryVault.name}`);
        return;
    }
    const web3Provider = new Web3.providers.HttpProvider(chain.rpcUrls);
    const web3 = new Web3(web3Provider);
    const vaultContract = getPrimaryVaultContract(primaryVault.address, web3);
    if (!vaultContract) {
        console.log("Could not instantiate Vault");
    }
    const protocolStatus = await vaultContract.methods.protocolStatus().call();
    console.log(`ProtocolStatus: ${protocolStatus}`);

    let newBalancingState = 'optimizing';
    if (protocolStatus == 0) {
      newBalancingState = 'farming';
    }
    setBalancingState(newBalancingState);
  }

  useEffect(() => {
    updateBalancingState();
    console.log("DepositWithdrawSection.useEffect called");
  });

  // dummy optimization/farming state

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
