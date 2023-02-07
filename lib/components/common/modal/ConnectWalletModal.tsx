import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { wallets } from '../../../data/static/wallet';
import { injected, resetWalletConnector, walletconnect } from '../../../helpers/connectors';
import { DefaultBtnType, ModalBtnType, NetworkChainDataType } from '../../../types/common';
import Modal from './Modal';
import switchNetwork from '../../../hooks/useSwitchNetwork';
declare global {
  interface Window{
    ethereum?:any
  }
}

export default function ConnectWalletModal({
  setShowModal,
  chainData
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  chainData?: NetworkChainDataType
}) {
  const web3reactContext = useWeb3React();
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  // type of modal button
  const initialBtn: DefaultBtnType = {
    text: 'Select your wallet',
    type: ModalBtnType.disabled,
    onClick: undefined,
  };

  const [modalBtn, setModalBtn] = useState<DefaultBtnType>(initialBtn);
  const [networkData, setNetworkData] = useState<any>();

  //web3react metamask
    // console.log('debug chainData', chainData)
    const connectMetamask = async () => {
    try {
      // console.log('debug chainData', chainData)
      const _defaultNetworkData = chainData? {
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
      // console.log('debug _defaultNetworkData', _defaultNetworkData)
      switchNetwork(_defaultNetworkData)
      await web3reactContext.activate(injected).then(() => {
        setShowModal(false);
      });
    } catch (error) {
      // console.log({error});
    }
  };

  //web3react walletconnect
  const connectWalletConnect = async () => {
    try {
      resetWalletConnector(walletconnect);
      await web3reactContext.activate(walletconnect).then(() => {
        setShowModal(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onWalletSelect = (wallet: any): void => {
    if (wallet.id === selectedWallet?.id) {
      setSelectedWallet(null);
    } else {
      setSelectedWallet(wallet);
    }
  };

  useEffect(() => {
    selectedWallet
      ? setModalBtn({
          text: `Connect using ${selectedWallet.name}`,
          type: ModalBtnType.default,
          onClick:
            selectedWallet.name === wallets[0].name
              ? connectMetamask
              : selectedWallet.name === wallets[1].name
              ? connectWalletConnect
              : undefined,
        })
      : setModalBtn(initialBtn);
  }, [selectedWallet]);

  return (
    <>
      <Modal
        title='Connect Wallet'
        setModalVisibility={setShowModal}
        width='480px'
        modalBtn={modalBtn}>
        <div className='wallet-container'>
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`wallet-wrapper ${wallet.id === selectedWallet?.id ? 'selected' : ''}`}
              onClick={() => {
                onWalletSelect(wallet);
              }}>
              <img src={wallet.icon} alt='' />
              <p>{wallet.name}</p>
            </div>
          ))}
        </div>
      </Modal>
      <style jsx>{`
        .wallet-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .wallet-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border: 2px solid var(--outlinePrimary);
          border-radius: 12px;
          user-select: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .selected {
          border-color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
