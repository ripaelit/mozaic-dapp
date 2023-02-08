import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useMemo, useState } from 'react';
import { ModalBtnType, NetworkChainDataType, TabItem } from '../../../../types/common';
import Separator from '../../Separator';
import Tab from '../../tab/Tab';
import ConnectWalletModal from '../ConnectWalletModal';
import Modal from '../Modal';
import MultiAssets from './MultiAssetsDeposit';
import SingleAsset from './SingleAssetDeposit';
import { networks } from '../../../../data/static/wallet';
import switchNetwork from '../../../../hooks/useSwitchNetwork';

const assetTypes: TabItem[] = [
  { id: 0, name: 'Single Asset', value: 'single' },
  { id: 1, name: 'Multi Assets', value: 'multi' },
];

const description = `Add liquidity in underlying pool tokens. First, approve required token to power index smart contract and then click supply.`;

export default function DepositModal({
  setOpenDepositModal,
  vault,
}: {
  setOpenDepositModal: React.Dispatch<React.SetStateAction<boolean>>;
  vault: any;
}) {
  const initialSingleAssetDepositData = {
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
    totalDepositAmount: '',
    name: '',
  };

  const initialMultiAssetsDepositData = {
    assets: vault[0].assets.map((asset: any) => ({
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
    totalDepositAmount: '',
  };

  const web3reactContext = useWeb3React();

  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);

  const [depositType, setDepositType] = useState(assetTypes[0]);
  const [singleAssetDepositData, setSingleAssetDepositData] = useState(
    initialSingleAssetDepositData
  );
  const [multiAssetsDepositData, setMultiAssetsDepositData] = useState(
    initialMultiAssetsDepositData
  );

  useEffect(() => {
    console.log('single asset', singleAssetDepositData);
  }, [singleAssetDepositData]);

  useEffect(() => {
    // console.log('multi assets', multiAssetsDepositData);
  }, [multiAssetsDepositData]);

  const chainData: NetworkChainDataType | undefined = useMemo(() => {
    const targetChain = networks.find((network) => network.name.includes(singleAssetDepositData.name))
    return targetChain
  }, [singleAssetDepositData])

  return (
    <>
      <Modal
        setModalVisibility={setOpenDepositModal}
        title='Deposit'
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
                text: 'Deposit',
                type: ModalBtnType.default,
                onClick: async () => {
                  // Unless there is a network in my wallet, add and switch into it
                  const networkData = chainData? {
                    ...chainData,
                    chainID: '0x' + (chainData.chainID || 0).toString(16)
                  } :  {
                    id: 0,
                    chainID: '0x5',
                    rpcUrls: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                    name: 'Goerli',
                    nativeCurrency: {
                      name: 'ETH',
                      decimals: 18,
                      symbol: 'ETH',
                    },
                    icon: '/assets/icons/wallet/networks/ico.eth.svg',
                  }
                  await switchNetwork(networkData);
                  // actions for deposit

                },
              }
        }>
        <div className='deposit-modal-wrapper'>
          <Tab
            currentTab={depositType}
            setCurrentTab={setDepositType}
            tabs={assetTypes}
            style={'height:64px;'}
          />
          <p className='description'>{description}</p>
          <Separator />
          <div className='deposit-modal-content-wrapper single-asset'>
            {depositType.value === 'single' && (
              <SingleAsset
                vault={vault}
                singleAssetDepositData={singleAssetDepositData}
                setSingleAssetDepositData={setSingleAssetDepositData}
              />
            )}
            {depositType.value === 'multi' && (
              <MultiAssets
                vault={vault}
                multiAssetsDepositData={multiAssetsDepositData}
                setMultiAssetsDepositData={setMultiAssetsDepositData}
              />
            )}
          </div>
          {showConnectWalletModal && (
            <ConnectWalletModal setShowModal={setShowConnectWalletModal} chainData={chainData} />
          )}
        </div>
      </Modal>
      <style jsx>{`
        .deposit-modal-wrapper,
        .deposit-modal-content-wrapper {
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
