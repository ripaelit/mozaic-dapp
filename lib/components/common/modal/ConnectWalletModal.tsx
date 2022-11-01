import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { wallets } from '../../../data/static/nav';
import { injected, resetWalletConnector, walletconnect } from '../../../helpers/connectors';
import { DefaultBtnType, ModalBtnType } from '../../../types/common';
import Modal from './Modal';

export default function ConnectWalletModal({ setShowModal }: { setShowModal: Function }) {
  const web3reactContext = useWeb3React();
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  // type of modal button
  const initialBtn: DefaultBtnType = {
    text: 'Select your wallet',
    type: ModalBtnType.disabled,
    onClick: undefined,
  };

  const [modalBtn, setModalBtn] = useState<DefaultBtnType>(initialBtn);

  //web3react context
  const checkInfo = async () => {
    try {
      console.log('web3reactContext');
      console.log(web3reactContext);
    } catch (error) {
      console.log(error);
    }
  };

  //web3react metamask
  const connectMetamask = async () => {
    try {
      await web3reactContext.activate(injected).then(() => {
        setShowModal(false);
      });
      checkInfo();
    } catch (error) {
      console.log(error);
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

  const handleConnectWallet = (wallet: number): void => {
    if (wallet === 0) {
      connectMetamask();
    }
    if (wallet === 1) {
      connectWalletConnect();
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
