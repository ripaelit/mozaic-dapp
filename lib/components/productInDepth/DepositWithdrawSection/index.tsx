import React, { useEffect, useState } from 'react';
import PrimaryCard from '../../common/card/PrimaryCard';
import ProductSummaryLoader from '../../loader/productPageLoader/ProductSummaryLoader';
import WithdrawModal from '../../common/modal/withdrawModal';
import DepositModal from '../../common/modal/depositModal';
import TransactionBtn from '../../common/button/TransactionBtn';
import FarmingOptimizingBar from './FarmingOptimizingBar';
import { getPrimaryVaultContract, getSecondaryVaultContract, getWeb3 } from '../../../store/contractStore';
import { AssetElement } from '../../../types/product';
import BN from 'bn.js';
import { useWeb3React } from '@web3-react/core';
import { chains } from '../../../data/static/wallet';

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

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [balancingState, setBalancingState] = useState('farming');

  const web3reactContext = useWeb3React();

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
    
    const vaultContract = getPrimaryVaultContract(primaryVault.address, getWeb3(primaryVault.name));
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

  const updateDepositAmount = async () => {
    if (!web3reactContext.account) {
      setDepositAmount(0);
      return;
    }
    let depositAmountSum = new BN('0');
    for (const vaultData of vault) {
      const vaultContract = getSecondaryVaultContract(vaultData.address, getWeb3(vaultData.name));
      const chainData = chains.find(obj => obj.name == vaultData.name);
      for (const assetData of vaultData.assets || []) {
        depositAmountSum = depositAmountSum.add(new BN(await vaultContract!.methods.getDepositAmount(false, web3reactContext.account, assetData.address, chainData?.lzChainID).call()));
        depositAmountSum = depositAmountSum.add(new BN(await vaultContract!.methods.getDepositAmount(true, web3reactContext.account, assetData.address, chainData?.lzChainID).call()));
      }
    }
    // TODO: move Mozaic Decimal 6 to static data source.
    let floatDepositAmountSum = depositAmountSum.div(new BN('10').pow(new BN('6'))).toNumber();
    setDepositAmount(floatDepositAmountSum);
  }

  const updateWithdrawAmount = async () => {
    if (!web3reactContext.account) {
      setWithdrawAmount(0);
      return;
    }
    let withdrawAmountSum = new BN('0');
    for (const vaultData of vault) {
      const vaultContract = getSecondaryVaultContract(vaultData.address, getWeb3(vaultData.name));
      const chainData = chains.find(obj => obj.name == vaultData.name);
      for (const assetData of vaultData.assets || []) {
        withdrawAmountSum = withdrawAmountSum.add(new BN(await vaultContract!.methods.getWithdrawAmount(false, web3reactContext.account, chainData?.lzChainID, assetData.address).call()));
        withdrawAmountSum = withdrawAmountSum.add(new BN(await vaultContract!.methods.getWithdrawAmount(true, web3reactContext.account, chainData?.lzChainID, assetData.address).call()));
      }
    }
    // TODO: move mLP Decimal 6 to static data source.
    let floatWithdrawAmountSum = withdrawAmountSum.div(new BN('10').pow(new BN('6'))).toNumber();
    setWithdrawAmount(floatWithdrawAmountSum);
  }

  useEffect(() => {
    updateBalancingState();
    console.log("DepositWithdrawSection.useEffect called");
    updateDepositAmount();
    updateWithdrawAmount();
  });

  // dummy optimization/farming state

  return (
    <>
      <PrimaryCard title={{ visible: false }}>
        <div className='deposit-withdraw-container'>
          {!loading ? (
            <>
              <TransactionBtn
                state={depositAmount > 0 ? 'pending': 'idle'}
                onClick={setOpenDepositModal}
                buttonType='Deposit'
                tooltip={tooltipData.deposit}
                amount={depositAmount}
                prefix='$'
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
                state={withdrawAmount > 0 ? 'pending': 'idle'}
                onClick={setOpenWithdrawModal}
                buttonType='Withdraw'
                tooltip={tooltipData.withdraw}
                colors={{
                  startColor: '#66543E',
                  endColor: '#F7931A',
                }}
                amount={withdrawAmount}
                postfix=' mLP'
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
