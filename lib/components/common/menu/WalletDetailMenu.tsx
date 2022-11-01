import { useWeb3React } from '@web3-react/core';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import Separator from '../Separator';
import MenuBox from './MenuBox';

export default function WalletDetailMenu({ showMenu, setShowMenu }: any) {
  const web3reactContext = useWeb3React();
  const removeWallet = (): void => {
    try {
      web3reactContext.deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWalletRemoval = (): void => {
    removeWallet();
    setShowMenu(false);
    toast.warning(`Wallet disconnected!`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  function copy() {
    setShowMenu(false);
    toast.info(`Wallet address copied to clipboard.`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    navigator.clipboard.writeText(web3reactContext.account!);
  }
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowMenu(false);
        }}>
        <MenuBox>
          <div className='wallet-detail-menu-container'>
            <p className='label'>Connected Wallet:</p>
            <div className='wallet-details' onClick={copy}>
              <p className='wallet-address'>{web3reactContext.account}</p>
              <img className='copy' src='/assets/icons/wallet/ico.copy.svg' alt='' />
            </div>
            <Separator />
            <div className='disconnect-wallet-btn' onClick={handleWalletRemoval}>
              <p>Disconnect Wallet</p>
            </div>
          </div>
        </MenuBox>
      </OutsideClickHandler>
      <style jsx>{`
        .wallet-detail-menu-container {
          display: flex;
          flex-direction: column;
          padding: 8px;
          gap: 10px;
          user-select: none;
        }

        p {
          word-break: break-all;
          white-space: normal;
        }

        .wallet-details {
          display: flex;
          gap: 16px;
          cursor: pointer;
          justify-content: space-between;
          align-items: center;
        }

        .wallet-details:hover {
          color: var(--text);
        }

        .wallet-address {
          font-size: 12px;
          color: var(--primary);
        }

        .disconnect-wallet-btn {
          cursor: pointer;
          width: 100%;
          display: flex;
          color: var(--alertNegative);
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 50px;
          border: 1px solid var(--alertNegative);
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .disconnect-wallet-btn:hover {
          border-color: var(--alert);
          color: var(--alert);
        }

        .disconnect-wallet-btn:active {
          border-color: var(--textSecondary);
          color: var(--textSecondary);
        }
      `}</style>
    </>
  );
}
