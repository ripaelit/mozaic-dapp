import React from 'react';

export default function WalletBtn() {
  return (
    <>
      <div className='wallet-btn-container'>
        <div className='ico-wrapper'></div>
        <p></p>
      </div>
      <style jsx>{`
        .wallet-btn-container {
          display: flex;
          flex-direction: row;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
