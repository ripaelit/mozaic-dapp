import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useMemo, useState } from 'react';
import { ChainDataType, ModalBtnType, TabItem } from '../../../../types/common';
import Separator from '../../Separator';
import Tab from '../../tab/Tab';
import ConnectWalletModal from '../ConnectWalletModal';
import Modal from '../Modal';
import MultiAssets from './MultiAssetsWithdraw';
import SingleAsset from './SingleAssetWithdraw';
import switchChain from '../../../../hooks/useSwitchChain';
import { chains } from '../../../../data/static/wallet';
import { getSecondaryVaultContract } from '../../../../store/contractStore';
import BN from 'bn.js';
import { AssetElement } from '../../../../types/product';

const assetTypes: TabItem[] = [
  { id: 0, name: 'Single Asset', value: 'single' },
  { id: 1, name: 'Multi Assets', value: 'multi' },
];

const description = `Remove liquidity in one transaction. Your mCORE will automatically swap to one of the underlying pool tokens.`;

// TODO: on withdraw success, dispatch onWithdrawalSuccess to animate the withdraw button
export default function WithdrawModal({
  setOpenWithdrawModal,
  vault,
  onWithdrawalSuccess,
}: {
  setOpenWithdrawModal: React.Dispatch<React.SetStateAction<boolean>>;
  vault: any;
  onWithdrawalSuccess: () => void;
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
    name: '',
  };

  const initialMultiAssetsWithdrawData = {
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

  useEffect(() => {
    // console.log('debug for single asset withdraw data', singleAssetWithdrawData.address);
  }, [singleAssetWithdrawData]);

  useEffect(() => {
    // console.log('multi assets', multiAssetsWithdrawData);
  }, [multiAssetsWithdrawData]);

  const chainData: ChainDataType | undefined = useMemo(() => {
    const targetChain = chains.find((chain) => chain.name.includes(singleAssetWithdrawData.name));
    return targetChain;
  }, [singleAssetWithdrawData]);

  const withdrawFunds = async () => {
    const networkData = chainData
      ? {
          ...chainData,
          chainID: '0x' + (chainData.chainID || 0).toString(16),
        }
      : chains[0];
    await switchChain(networkData);
    const chainName = networkData.name;
    const withdrawVault = vault.find((theVault: any) => theVault.name == chainName) as AssetElement;
    const vaultContract = getSecondaryVaultContract(
      withdrawVault.address,
      web3reactContext.library
    );
    const withdrawAmount = new BN(
      singleAssetWithdrawData.totalWithdrawAmount +
        '0'.repeat(singleAssetWithdrawData.asset.decimals)
    );
    try {
      await vaultContract!.methods
        .addWithdrawRequest(
          withdrawAmount,
          singleAssetWithdrawData.asset.address,
          new BN('' + networkData.lzChainID)
        )
        .send({ from: web3reactContext.account });
      //
      onWithdrawalSuccess();
    } catch (err) {
      // TODO-abdullah: error flow.
      console.log(err);
      // onWithdrawFailure();
    }
    console.log('Finished blockchain call');

    // if (withdrawType.value === 'single') {
    //   // console.log('single asset', singleAssetWithdrawData);

    // }
    // if (withdrawType.value === 'multi') {
    //   // console.log('multi assets', multiAssetsWithdrawData);
    // }
    // onWithdrawalSuccess();
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
