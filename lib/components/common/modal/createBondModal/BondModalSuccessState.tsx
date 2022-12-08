/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PrimaryBtn from '../../button/PrimaryBtn';
import Separator from '../../Separator';

const bondSuccessData = {
  deposit: 8.5,
  incoming: 12.54561,
};

export default function BondModalSuccessState({ bond }: any) {
  return (
    <>
      <div className='initial-bond-container'>
        <div className='icon-wrapper'>
          {bond.icon.map((icon: string, index: number) => (
            <img key={index} src={icon} alt='' />
          ))}
        </div>
        <div className='highlighted-area-wrapper'>
          <p>Deposit Secured</p>
          <h1>{bondSuccessData.deposit}%</h1>
        </div>
        <p className='label description'>
          Visit Mozaic anytime to claim your vested position. The bond will be fully vested in 7
          days.
        </p>
        <div className='bond-summary-wrapper'>
          <div className='list-item'>
            <p className='description'>Your Incoming BOND</p>
            <h4>{`${bondSuccessData.incoming} ${bond.name} Bond`}</h4>
          </div>
          <Separator />
          <div className='list-item'>
            <p className='description'>Vesting Term</p>
            <h4>{bond.vestingTime} Days</h4>
          </div>
        </div>
        <PrimaryBtn text='View on AVASCAN' onClick={() => {}} />
      </div>
      <style jsx>{`
        .initial-bond-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-wrapper img {
          height: 80px;
          width: 80px;
          margin: 0 -16px;
          border: 6px solid var(--cardBgPrimary);
          border-radius: 50%;
        }
        .highlighted-area-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--outlinePrimary);
          border-radius: 10px;
          color: var(--textLabel);
          padding: 16px;
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
