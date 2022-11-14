import React, { useState } from 'react';
import DepositModal from '../modal/depositModal';
import WithdrawModal from '../modal/withdrawModal';

export default function DepositWithdrawBtn() {
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  return (
    <>
      <div className='transaction-btn-container'>
        <div
          className='btn deposit-btn'
          onClick={() => {
            setOpenDepositModal(true);
          }}>
          Deposit
        </div>
        <div
          className='btn withdraw-btn'
          onClick={() => {
            setOpenWithdrawModal(true);
          }}>
          Withdraw
        </div>
      </div>
      {openDepositModal && <DepositModal setOpenDepositModal={setOpenDepositModal} />}
      {openWithdrawModal && <WithdrawModal setOpenWithdrawModal={setOpenWithdrawModal} />}
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
        @media screen and (max-width: 600px) {
          .transaction-btn-container {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
