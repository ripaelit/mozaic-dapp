import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { menuItems } from '../../../data/static/nav';

export default function DesktopMenu({ showMenu, setShowMenu }: any) {
  return (
    <>
      <div className='arrow'></div>
      <div className='menu-container'>
        {/* <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}> */}
        {menuItems.map((item) => (
          <div onClick={() => setShowMenu(false)} key={item.id} className='menu-item-wrapper'>
            <img src={item.icon} alt='' />
            <p>{item.name}</p>
          </div>
        ))}
        {/* </OutsideClickHandler> */}
      </div>
      <style jsx>{`
        .arrow {
          width: 20px;
          height: 20px;
          border-radius: 8px 0 0 0;
          position: absolute;
          top: 54px;
          right: 12px;
          transform: rotate(45deg);
          background-color: var(--cardBgPrimary);
        }
        .menu-container {
          position: absolute;
          top: 64px;
          right: -10px;
          display: flex;
          flex-direction: column;
          width: 280px;
          padding: 8px;
          box-shadow: 0px 40px 64px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05),
            0px 32px 48px -8px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          background-color: var(--cardBgPrimary);
        }

        .menu-item-wrapper {
          width: 100%;
          padding: 10px 16px;
          display: flex;
          flex-direction: row;
          gap: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .menu-item-wrapper:hover {
          background-color: #ffffff20;
        }

        .menu-item-wrapper:active {
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
