import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { DefaultBtnType, ModalBtnType } from '../../../types/common';
import PrimaryBtn from '../button/PrimaryBtn';

export default function Modal({
  title = 'Modal Title',
  width = '600px',
  children,
  setModalVisibility,
  showBtn = true,
  modalBtn = {
    text: 'Modal Button',
    type: ModalBtnType.default,
    onClick: () => {
      console.log('modal button pressed');
    },
  },
}: {
  title: string;
  width?: string;
  children: JSX.Element;
  setModalVisibility: Function;
  showBtn?: boolean;
  modalBtn?: DefaultBtnType;
}) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);

  // close modal function
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalVisibility(false);
    }, 500);
  };

  return (
    <>
      <div className={`modal-bg-overlay ${showModal && 'show-overlay'}`}>
        <OutsideClickHandler onOutsideClick={closeModal}>
          <div className={`modal-container ${!showModal && 'hide-modal'}`}>
            <div className='modal-title-wrapper'>
              <h2>{title}</h2>
              <div className='close-btn-container' onClick={closeModal}>
                <img src='/assets/icons/ico.close.svg' alt='' />
              </div>
            </div>
            <div className='modal-body-wrapper'>{children}</div>
            {showBtn && (
              <div className='default-btn-wrapper'>
                <PrimaryBtn {...modalBtn} />
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <style jsx>{`
        .modal-bg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #00000080;
          z-index: 10;
          transition: backdrop-filter 0.5s ease;
        }

        .show-overlay {
          backdrop-filter: blur(5px);
        }

        .modal-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: ${width};
          width: 100vw;
          background-color: var(--cardBgPrimary);
          padding: 32px;
          border-radius: 20px;
          transition: all 0.5s ease;
        }

        .hide-modal {
          opacity: 0;
          margin-bottom: 300px;
        }

        .modal-title-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .close-btn-container {
          user-select: none;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 5px;
          border: 1px solid var(--textSecondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-btn-container:hover {
          background-color: #ffffff20;
        }

        .close-btn-container:active {
          border-color: var(--alert);
        }

        @media screen and (max-width: 430px) {
          .modal-container {
            padding: 32px 16px;
          }
        }
      `}</style>
    </>
  );
}
