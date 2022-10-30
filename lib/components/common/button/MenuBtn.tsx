import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import DesktopMenu from '../menu/DesktopMenu';

// nav hamburger menu
export default function MenuBtn() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      {' '}
      <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
        <div onClick={() => setShowMenu(!showMenu)} className='menu-btn-container'>
          <div className='hover-bg'></div>
          <img src='/assets/icons/menu/ico.menu.btn.svg' alt='' />
        </div>
        {showMenu && <DesktopMenu setShowMenu={setShowMenu} />}
      </OutsideClickHandler>
      <style jsx>{`
        .menu-btn-container {
          position: relative;
          width: 48px;
          height: 48px;
          transition: all 0.2s ease;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hover-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--textPrimary);
          border: 1px solid var(--textPrimary);
          border-radius: 10px;
          opacity: 0;
          transition: all 0.2s ease;
        }

        .menu-btn-container:hover > .hover-bg {
          opacity: 0.3;
        }

        .menu-btn-container:active > .hover-bg {
          opacity: 0.3;
          background-color: transparent;
        }
      `}</style>
    </>
  );
}
