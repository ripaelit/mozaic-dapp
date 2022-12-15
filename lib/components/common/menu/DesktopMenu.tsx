import Link from 'next/link';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { menuItems } from '../../../data/static/nav';
import FeedbackModal from '../modal/feedbackModal';
import MenuBox from './MenuBox';

export default function DesktopMenu({ setShowMenu, setShowFeedbackModal, setSubject }: any) {
  return (
    <>
      <MenuBox>
        <>
          {menuItems.map((item) =>
            item.link ? (
              <Link key={item.id} href={item.path!} target={item.newWindow ? '_blank' : '_self'}>
                <div onClick={() => setShowMenu(false)} className='menu-item-wrapper'>
                  <img src={item.icon} alt='' />
                  <p>{item.name}</p>
                </div>
              </Link>
            ) : (
              <div
                onClick={() => {
                  setSubject(item.name);
                  setShowFeedbackModal(true);
                  setShowMenu(false);
                }}
                className='menu-item-wrapper'>
                <img src={item.icon} alt='' />
                <p>{item.name}</p>
              </div>
            )
          )}
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
