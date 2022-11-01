import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { menuItems } from '../../../data/static/nav';
import MenuBox from './MenuBox';

export default function DesktopMenu({ showMenu, setShowMenu }: any) {
  return (
    <>
      <MenuBox>
        <>
          {menuItems.map((item) => (
            <div onClick={() => setShowMenu(false)} key={item.id} className='menu-item-wrapper'>
              <img src={item.icon} alt='' />
              <p>{item.name}</p>
            </div>
          ))}
        </>
      </MenuBox>
      <style jsx>{`
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
