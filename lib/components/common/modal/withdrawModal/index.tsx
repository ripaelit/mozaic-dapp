import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { ModalBtnType, TabItem } from '../../../../types/common';
import Separator from '../../Separator';
import Tab from '../../tab/Tab';
import ConnectWalletModal from '../ConnectWalletModal';
import Modal from '../Modal';
import MultiAssets from './MultiAssetsWithdraw';
import SingleAsset from './SingleAssetWithdraw';

const assetTypes: TabItem[] = [
  { id: 0, name: 'Single Asset', value: 'single' },
  { id: 1, name: 'Multi Assets', value: 'multi' },
];

const vault = {
  id: 0,
  name: 'mCORE',
  address: '',
  decimals: 0,
  conversionRateUSD: 1,
  conversionRate: 1,
  assets: [
    {
      id: 0,
      name: 'USDC',
      icon: '/assets/icons/assets/ico.usdc.svg',
      address: '',
      decimals: 0,
      conversionRateUSD: 1,
      conversionRate: 1,
    },
    {
      id: 1,
      name: 'USDT',
      icon: '/assets/icons/assets/ico.usdt.svg',
      address: '',
      decimals: 0,
      conversionRateUSD: 1,
      conversionRate: 2,
    },
    {
      id: 2,
      name: 'BUSD',
      icon: '/assets/icons/assets/ico.busd.svg',
      address: '',
      decimals: 0,
      conversionRateUSD: 1,
      conversionRate: 3,
    },
  ],
};

const description = `Remove liquidity in one transaction. Your mCORE will automatically swap to one of the underlying pool tokens.`;

export default function WithdrawModal({
  setOpenWithdrawModal,
}: {
  setOpenWithdrawModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialSingleAssetWithdrawData = {
    asset: {
      id: 0,
      name: '',
      address: '',
      decimals: 0,
      amount: '',
    },
    slippage: 0.6,
    address: '',
    decimals: 0,
    totalWithdrawAmount: '',
  };

  const initialMultiAssetsWithdrawData = {
    assets: vault.assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      address: asset.address,
      decimals: asset.decimals,
      amount: '',
      approval: 0,
    })),
    slippage: 0.6,
    address: '',
    decimals: 0,
    totalWithdrawAmount: '',
  };

  const web3reactContext = useWeb3React();

  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);

  const [withdrawType, setWithdrawType] = useState(assetTypes[0]);
  const [singleAssetWithdrawData, setSingleAssetWithdrawData] = useState(
    initialSingleAssetWithdrawData
  );
  const [multiAssetsWithdrawData, setMultiAssetsWithdrawData] = useState(
    initialMultiAssetsWithdrawData
  );

  const withdrawFunds = () => {
    if (withdrawType.value === 'single') {
      console.log('single asset', singleAssetWithdrawData);
    }
    if (withdrawType.value === 'multi') {
      console.log('multi assets', multiAssetsWithdrawData);
    }
  };

  return (
    <>
      <Modal
        setModalVisibility={setOpenWithdrawModal}
        title='Withdraw'
        modalBtn={
          !web3reactContext.account
            ? {
                text: 'Connect Wallet',
                type: ModalBtnType.warning,
                onClick: () => {
                  setShowConnectWalletModal(true);
                },
              }
            : {
                text: 'Withdraw',
                type: ModalBtnType.default,
                onClick: withdrawFunds,
              }
        }>
        <div className='withdraw-modal-wrapper'>
          <Tab
            currentTab={withdrawType}
            setCurrentTab={setWithdrawType}
            tabs={assetTypes}
            style={'height:64px;'}
          />
          <p className='description'>{description}</p>
          <Separator />
          <div className='withdraw-modal-content-wrapper single-asset'>
            {withdrawType.value === 'single' && (
              <SingleAsset
                vault={vault}
                singleAssetWithdrawData={singleAssetWithdrawData}
                setSingleAssetWithdrawData={setSingleAssetWithdrawData}
              />
            )}
            {withdrawType.value === 'multi' && (
              <MultiAssets
                vault={vault}
                multiAssetsWithdrawData={multiAssetsWithdrawData}
                setMultiAssetsWithdrawData={setMultiAssetsWithdrawData}
              />
            )}
          </div>
          {showConnectWalletModal && (
            <ConnectWalletModal setShowModal={setShowConnectWalletModal} />
          )}
        </div>
      </Modal>
      <style jsx>{`
        .withdraw-modal-wrapper,
        .withdraw-modal-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .description {
          font-size: 0.875rem;
          color: var(--textSecondary);
          line-height: 1.5rem;
        }
      `}</style>
    </>
  );
}
