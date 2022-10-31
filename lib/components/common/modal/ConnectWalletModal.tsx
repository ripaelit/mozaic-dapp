import React from 'react';
import Modal from './Modal';

export default function ConnectWalletModal({ setShowModal }: { setShowModal: Function }) {
  return (
    <>
      <Modal title='Connect Wallet' setModalVisibility={setShowModal}>
        <p>modal body</p>
      </Modal>
    </>
  );
}
