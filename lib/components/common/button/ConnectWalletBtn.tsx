import React, { useEffect, useState } from 'react';

export default function ConnectWalletBtn({
  setShowConnectWalletModal,
  showConnectWalletModal,
}: {
  setShowConnectWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConnectWalletModal: boolean;
}) {
  const walletIcons = [
    {
      state: 'not-connected',
      wallet: '',
      icon: '/assets/icons/menu/button/ico.addWallet.svg',
    },
    {
      state: 'connected',
      wallet: 'metamask',
      icon: '/assets/icons/menu/button/ico.wallet.metamask.svg',
    },
    {
      state: 'not-connected',
      wallet: 'wallet-connect',
      icon: '/assets/icons/menu/button/ico.wallet.walletconnect.svg',
    },
  ];

  const [currentWallet, setCurrentWallet] = useState(walletIcons[0].icon);
  const [walletStateText, setWalletStateText] = useState('Connect Wallet');

  useEffect(() => {
    showConnectWalletModal
      ? setWalletStateText('Connecting...')
      : setWalletStateText('Connect Wallet');
  }, [showConnectWalletModal]);

  return (
    <>
      <div
        className='wallet-btn-container solid'
        onClick={() => {
          setShowConnectWalletModal(true);
        }}>
        <img className='wallet-btn-icon' src={currentWallet} alt='' />
        <p className='btn-text'>{walletStateText}</p>
      </div>
      <style jsx>{`
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
