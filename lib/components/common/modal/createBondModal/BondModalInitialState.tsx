/* eslint-disable react/no-unescaped-entities */
import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import PrimaryBtn from '../../button/PrimaryBtn';
import Separator from '../../Separator';
import ConnectWalletModal from '../ConnectWalletModal';

const bondDetails = {
  balance: 1.5,
  earning: 2,
  max: 2.5,
  contract: '',
};

export default function BondModalInitialState({
  bond,
  setBondState,
}: {
  bond: any;
  setBondState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const web3reactContext = useWeb3React();
  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);

  const onBondApproval = () => {
    setBondState('success');
  };
  return (
    <>
      <div className='initial-bond-container'>
        {/* Price section */}
        <div className='price-wrapper'>
          <div className='bond-price-wrapper'>
            <p>Bond Price</p>
            <h1>${bond.price}</h1>
          </div>
          <div className='market-price-wrapper'>
            <p>Market Price</p>
            <h1>${bond.marketPrice}</h1>
          </div>
        </div>

        {/* Bond details */}
        <div className='highlighted-area-wrapper'>
          <div className='col col-1'>
            <div className='icon-wrapper'>
              {bond.icon.map((icon: string, index: number) => (
                <img key={index} src={icon} alt='' />
              ))}
            </div>
            <p>You Give</p>
          </div>
          <div className='col col-2'>
            <div className='icon-wrapper'>
              <img src='/assets/icons/ico.clock.svg' alt='' />
            </div>
            <p>Vested for {bond.vestingTime} days</p>
          </div>
          <div className='col col-3'>
            <div className='icon-wrapper'>
              <img src='/assets/icons/assets/ico.moz.svg' alt='' />
            </div>
            <p>You'll get</p>
          </div>
        </div>

        {/* Approve bond contract */}
        {!web3reactContext.account ? (
          <>
            <PrimaryBtn
              type='warning'
              text='Connect Wallet'
              onClick={() => {
                setShowConnectWalletModal(true);
              }}
            />
            {showConnectWalletModal && (
              <ConnectWalletModal setShowModal={setShowConnectWalletModal} />
            )}
          </>
        ) : (
          <PrimaryBtn text='Approve Bond Contract' onClick={onBondApproval} />
        )}

        {/* Information */}
        <p className='label description'>
          Important: The approved contract is only needed when bonding for the first time.
          Subsequent bonding only requires you to perform the BOND request.
        </p>

        <div className='bond-summary-wrapper'>
          <div className='list-item'>
            <p className='description'>Your balance</p>
            <h4>{`${bondDetails.balance} ${bond.name} Bond`}</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>You'll get</p>
            <h4>{bondDetails.earning} MOZ</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>MAX</p>
            <h4>{bondDetails.max} MOZ</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>ROI</p>
            <h4>{bond.roi}%</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>Vesting Term</p>
            <h4>{bond.vestingTime} Days</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>Your balance</p>
            <h4>View</h4>
          </div>
        </div>
      </div>
      <style jsx>{`
        .initial-bond-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .price-wrapper {
          display: flex;
          gap: 12px;
        }
        .price-wrapper p {
          color: var(--textLabel);
        }

        .bond-price-wrapper,
        .market-price-wrapper {
          display: flex;
          flex-direction: column;
          flex: 1;
          border: 1px solid var(--outlinePrimary);
          padding: 16px;
          border-radius: 10px;
        }

        .bond-price-wrapper {
          align-items: flex-start;
        }
        .market-price-wrapper {
          align-items: flex-end;
        }
        .highlighted-area-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: var(--outlinePrimary);
          border-radius: 10px;
          color: var(--textLabel);
        }
        .col {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .col-1 {
          align-items: flex-start;
        }

        .col-1 img {
          margin: 0 -10px;
        }

        .col-1 > .icon-wrapper {
          padding-left: 10px;
        }
        .col-2 {
          align-items: center;
        }
        .col-3 {
          align-items: flex-end;
        }
        .icon-wrapper > img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--outlinePrimary);
        }

        .description {
          color: var(--textLabel);
        }

        .bond-summary-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
