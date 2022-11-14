import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { networks, networkIdleStates } from '../../../data/static/wallet';
import { NetworkItemType } from '../../../types/common';
import WalletDetailMenu from '../menu/WalletDetailMenu';

export default function ConnectWalletBtn({
  setShowConnectWalletModal,
  showConnectWalletModal,
}: {
  setShowConnectWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConnectWalletModal: boolean;
}) {
  const web3reactContext = useWeb3React();

  // initial network
  const [currentNetwork, setCurrentNetwork] = useState<NetworkItemType>(networkIdleStates[0]);
  const [walletStateText, setWalletStateText] = useState('Connect Wallet');
  const [showWalletDetailMenu, setShowWalletDetailMenu] = useState(false);

  // change wallet button text based on current status
  useEffect(() => {
    if (!web3reactContext.account) {
      if (showConnectWalletModal) {
        setWalletStateText(networkIdleStates[1].name);
        setCurrentNetwork(networkIdleStates[1]);
      }
      if (!showConnectWalletModal) {
        setWalletStateText(networkIdleStates[0].name);
        setCurrentNetwork(networkIdleStates[0]);
      }
    } else {
      setWalletStateText(
        '...' +
          web3reactContext.account.substring(
            web3reactContext.account.length,
            web3reactContext.account.length - 5
          )
      );
    }
  }, [showConnectWalletModal, web3reactContext.account]);

  const onWalletBtnClick = () => {
    !web3reactContext.account
      ? setShowConnectWalletModal(true)
      : setShowWalletDetailMenu(!showWalletDetailMenu);
  };

  // dispatch notification on wallet connect
  useEffect(() => {
    // console.log(web3reactContext);

    web3reactContext.account &&
      toast.success(`Wallet ${web3reactContext.account} connected!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
  }, [web3reactContext.account]);

  // dispatch notification & change icon on mainNet change

  useEffect(() => {
    // console.log(web3reactContext.chainId);

    if (!web3reactContext.chainId) {
      setCurrentNetwork(networkIdleStates[0]);
      return;
    } else {
      networks.map((item) => {
        if (item.chainID === web3reactContext.chainId) {
          setCurrentNetwork(item);
          toast.info(`Connected to ${item.name} network`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          return;
        }
      });
    }
  }, [web3reactContext.chainId]);

  return (
    <>
      <div className='wallet-container'>
        <div
          className={`wallet-btn-container ${!web3reactContext.account ? 'solid' : 'outlined'}`}
          onClick={onWalletBtnClick}>
          <img className='network-icon' src={currentNetwork.icon} alt='' />
          <p className='btn-text'>{walletStateText}</p>
        </div>
        <div className='wallet-detail-menu-wrapper'>
          {showWalletDetailMenu && (
            <WalletDetailMenu
              showMenu={showWalletDetailMenu}
              setShowMenu={setShowWalletDetailMenu}
              currentNetwork={currentNetwork}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .wallet-container {
          height: 48px;
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
          border-radius: 30px;
          font-weight: 500;
          font-size: 0.95rem;
          line-height: 1rem;
          transition: all 0.2s ease;
        }

        .network-icon {
          height: 16px;
          width: 16px;
          object-fit: contain;
        }

        .solid {
          background-color: var(--textPrimary);
          color: var(--bg);
          border: 1px solid var(--textPrimary);
          padding: 0 16px;
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

        .solid > .network-icon {
          transition: all 0.2s ease;
        }

        .solid:hover > .network-icon {
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(325deg) brightness(102%)
            contrast(101%);
        }

        .outlined {
          background-color: transparent;
          color: var(--textLabel);
          border: 1px solid var(--textLabel);
          padding: 0 16px 0px 12px;
        }

        .outlined > .network-icon {
          transition: all 0.2s ease;
          height: 24px;
          width: 24px;
        }

        .outlined:hover {
          background-color: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
        }

        .outlined:hover > .network-icon {
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(325deg) brightness(102%)
            contrast(101%);
        }

        .wallet-detail-menu-wrapper {
          width: 100%;
          position: absolute;
          bottom: 0;
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
