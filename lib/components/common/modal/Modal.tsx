import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PrimaryBtn from '../button/PrimaryBtn';

export default function Modal({
  title = 'Modal Title',
  children,
  onClick,
  setModalVisibility,
  btnText,
  showBtn = true,
}: {
  title: string;
  children: JSX.Element;
  onClick?: Function;
  setModalVisibility: Function;
  btnText?: string;
  showBtn?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setModalVisibility(false);
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
                <PrimaryBtn onClick={onClick} text={btnText} />
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <style jsx>{`
        .modal-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #00000080;
          z-index: 10;
          transition: all 0.5s ease;
        }

        .show-overlay {
          backdrop-filter: blur(5px);
        }

        .modal-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 600px;
          max-width: 600px;
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
      `}</style>
    </>
  );
}
