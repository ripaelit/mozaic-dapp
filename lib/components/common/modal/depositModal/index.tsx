import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useMemo, useState } from 'react';
import { ModalBtnType, ChainDataType, TabItem } from '../../../../types/common';
import { AssetElement } from '../../../../types/product';
import Separator from '../../Separator';
import Tab from '../../tab/Tab';
import ConnectWalletModal from '../ConnectWalletModal';
import Modal from '../Modal';
import MultiAssets from './MultiAssetsDeposit';
import SingleAsset from './SingleAssetDeposit';
import { chains } from '../../../../data/static/wallet';
import switchChain from '../../../../hooks/useSwitchChain';
import { getERC20Contract, getSecondaryVaultContract } from '../../../../store/contractStore';
import BN from 'bn.js';

const assetTypes: TabItem[] = [
  { id: 0, name: 'Single Asset', value: 'single' },
  { id: 1, name: 'Multi Assets', value: 'multi' },
];

const description = `Add liquidity in underlying pool tokens. First, approve required token to power index smart contract and then click supply.`;

// TODO: on deposit success, dispatch onDepositSuccess to animate the deposit button
export default function DepositModal({
  onDepositSuccess,
  setOpenDepositModal,
  vault,
}: {
  onDepositSuccess: () => void;
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
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('debug for single asset deposit data', singleAssetDepositData.address);
  }, [singleAssetDepositData]);

  useEffect(() => {
    // console.log('multi assets', multiAssetsDepositData);
  }, [multiAssetsDepositData]);

  const chainData: ChainDataType | undefined = useMemo(() => {
    const targetChain = chains.find((chain) => chain.name.includes(singleAssetDepositData.name));
    return targetChain;
  }, [singleAssetDepositData]);

  // chains[singleAssetDepositData.name] --> chainData

  return (
    <>
      <Modal
        setModalVisibility={setOpenDepositModal}
        title='Deposit'
        modalBtn={
          !web3reactContext.account
            ? {
                // Unless your wallet is connected to Mozaic
                text: 'Connect Wallet',
                type: isLoading? ModalBtnType.disabled: ModalBtnType.default,
                onClick: () => {
                  setLoading(true);
                  setShowConnectWalletModal(true);
                  setLoading(false);
                },
              }
            : {
                text: 'Deposit',
                type: isLoading? ModalBtnType.disabled: ModalBtnType.default,
                onClick: async () => {
                  try {
                    setLoading(true);
                    // Unless there is the selected network in my wallet, add and switch into it
                    const networkData = chainData
                      ? {
                          ...chainData,
                          chainID: '0x' + (chainData.chainID || 0).toString(16),
                        }
                      : chains[0];
                    await switchChain(networkData);
                    const chainName = networkData.name;
                    const depositVault = vault.find((theVault:any) => (theVault.name == chainName)) as AssetElement;
                    const vaultContract = getSecondaryVaultContract(depositVault.address, web3reactContext.library);
                    const tokenContract = getERC20Contract(singleAssetDepositData.asset.address, web3reactContext.library);
                    const depositAmount = new BN(singleAssetDepositData.totalDepositAmount+'0'.repeat(singleAssetDepositData.asset.decimals));
                    const allowanceAmount = new BN(await tokenContract!.methods
                      .allowance(
                        web3reactContext.account,
                        depositVault.address
                      ).call());
                    if (allowanceAmount.lt(depositAmount)) {
                      // approve
                      console.log("not enough allowance");
                      await tokenContract!.methods
                        .approve(
                          depositVault.address,
                          depositAmount
                        )
                        .send({from: web3reactContext.account});
                    } 
                    // deposit
                    await vaultContract!.methods
                      .addDepositRequest(
                        depositAmount,
                        singleAssetDepositData.asset.address,
                        new BN(''+networkData.lzChainID)
                      )
                      .send({from: web3reactContext.account});
                   
                    setLoading(false);
                    onDepositSuccess();
                  }
                  catch (err) {
                    // TODO-abdullah: error flow.
                    console.log(err);
                    setLoading(false);
                    // onDepositFailure();
                  }
                  console.log("Finished blockchain call");
                },
              }
        }>
        <div className='deposit-modal-wrapper'>
          <Tab
            currentTab={depositType}
            setCurrentTab={()=>{}}
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
