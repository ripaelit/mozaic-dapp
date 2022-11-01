import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import React, { useEffect, useState } from 'react';
import WalletDetailMenu from '../menu/WalletDetailMenu';

export default function ConnectWalletBtn({
  setShowConnectWalletModal,
  showConnectWalletModal,
}: {
  setShowConnectWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConnectWalletModal: boolean;
}) {
  const web3reactContext = useWeb3React();

  const walletIcons = [
    {
      state: 'not-connected',
      connector: '',
      icon: '/assets/icons/menu/button/ico.addWallet.svg',
    },
    {
      state: 'connected',
      connector: 'metamask',
      icon: '/assets/icons/wallet/ico.wallet.metamask.svg',
    },
    {
      state: 'not-connected',
      connector: 'wallet-connect',
      icon: '/assets/icons/wallet/ico.wallet.walletconnect.svg',
    },
  ];

  const [currentWallet, setCurrentWallet] = useState(walletIcons[0].icon);
  const [walletStateText, setWalletStateText] = useState('Connect Wallet');
  const [showWalletDetailMenu, setShowWalletDetailMenu] = useState(false);

  useEffect(() => {
    !web3reactContext.account
      ? showConnectWalletModal
        ? setWalletStateText('Connecting...')
        : setWalletStateText('Connect Wallet')
      : setWalletStateText(
          '...' +
            web3reactContext.account.substring(
              web3reactContext.account.length,
              web3reactContext.account.length - 5
            )
        );
    console.log(JSON.stringify(web3reactContext.connector));
  }, [showConnectWalletModal, web3reactContext.account]);

  const onWalletBtnClick = () => {
    !web3reactContext.account
      ? setShowConnectWalletModal(true)
      : setShowWalletDetailMenu(!showWalletDetailMenu);
  };

  return (
    <>
      <div className='wallet-container'>
        <div className='wallet-btn-container solid' onClick={onWalletBtnClick}>
          <img className='wallet-btn-icon' src={currentWallet} alt='' />
          <p className='btn-text'>{walletStateText}</p>
        </div>
        {showWalletDetailMenu && (
          <WalletDetailMenu showMenu={showWalletDetailMenu} setShowMenu={setShowWalletDetailMenu} />
        )}
      </div>
      <style jsx>{`
        .wallet-container {
          position: relative;
        }
        .wallet-btn-container {
          display: flex;
          flex-direction: row;
          cursor: pointer;
          gap: 8px;
          height: 48px;
          max-width: 190px;
          align-items: center;
          border-radius: 12px;
          font-weight: 500;
          font-size: 0.95rem;
          line-height: 1rem;
          padding: 0 16px;
          transition: all 0.2s ease;
        }

        .solid {
          background-color: var(--textPrimary);
          color: var(--bg);
          border: 1px solid var(--textPrimary);
        }

        .solid:hover {
          background-color: transparent;
          color: var(--textPrimary);
        }

        .solid:active {
          background-color: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
        }

        .solid > .wallet-btn-icon {
          transition: all 0.2s ease;
        }

        .solid:hover > .wallet-btn-icon {
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(325deg) brightness(102%)
            contrast(101%);
        }

        .wallet-btn-icon {
          height: 16px;
          width: 16px;
          object-fit: contain;
        }

        @media (max-width: 420px) {
          .btn-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
