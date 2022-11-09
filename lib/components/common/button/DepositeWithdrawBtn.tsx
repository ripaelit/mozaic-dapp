import React from 'react';

export default function DepositeWithdrawBtn() {
  return (
    <>
      <div className='transaction-btn-container'>
        <div className='btn deposit-btn'>Deposit</div>
        <div className='btn withdraw-btn'>Withdraw</div>
      </div>
      <style jsx>{`
        .transaction-btn-container {
          width: 100%;
          max-width: 350px;
          height: 70px;
          padding: 8px;
          background-color: var(--bg);
          border-radius: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .btn {
          height: 100%;
          border-radius: 6px;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .deposit-btn {
          background: #272b30;
          box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px rgba(0, 0, 0, 0.04),
            inset 0px 2px 0px rgba(255, 255, 255, 0.06);
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}
