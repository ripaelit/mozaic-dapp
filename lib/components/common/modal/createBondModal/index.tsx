import React, { useState } from 'react';
import Modal from '../Modal';
import BondModalInitialState from './BondModalInitialState';
import BondModalSuccessState from './BondModalSuccessState';

export default function CreateBondModal({
  bond,
  setShowModal,
}: {
  bond: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [bondState, setBondState] = useState<string>('initial');

  return (
    <>
      <Modal showBtn={false} title={bond.name + ' Bond'} setModalVisibility={setShowModal}>
        <>
          {bondState === 'initial' ? (
            <BondModalInitialState bond={bond} setBondState={setBondState} />
          ) : bondState === 'success' ? (
            <BondModalSuccessState bond={bond} />
          ) : null}
        </>
      </Modal>
      <style jsx>{``}</style>
    </>
  );
}
