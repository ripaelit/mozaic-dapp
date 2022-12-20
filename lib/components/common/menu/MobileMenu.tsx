import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { menuItems, navItems } from '../../../data/static/nav';

export default function MobileMenu({
  setSMenuVisibility,
  menuVisibility,
  setShowFeedbackModal,
  setSubject,
}: any) {
  const router: any = useRouter();
  // returns if the current path is active or not
  const isActive = (path: string) => {
    if (router.asPath === path) return 'active';
    return '';
  };

  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setShowMenu(menuVisibility);
  }, [menuVisibility]);

  // close modal function
  const closeMenu = () => {
    setShowMenu(false);
    setTimeout(() => {
      setSMenuVisibility(false);
    }, 500);
  };

  return (
    <>
      <div className={`mobile-menu-container ${showMenu && 'show-menu'}`}>
        <section className='nav-btn-wrapper'>
          {navItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <a className={`nav-btn ${isActive(item.path)}`}>{item.name}</a>
            </Link>
          ))}
        </section>
        <section className='nav-menu-item-wrapper'>
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
                key={item.id}
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
        </section>
      </div>
      <style jsx>{`
        .mobile-menu-container {
          position: fixed;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: var(--cardBgPrimaryT1);
          width: 100%;
          height: 100%;
          top: 0;
          right: -100%;
          z-index: -1;
          padding: 140px 24px 40px 24px;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }

        .show-menu {
          right: 0;
        }

        .nav-btn-wrapper {
          display: flex;
          flex-direction: column;
          gap: 36px;
          align-items: center;
        }

        .nav-btn {
          font-size: 24px;
        }

        .nav-btn::after {
          display: block;
          content: attr(title);
          font-weight: bold;
          overflow: hidden;
          visibility: hidden;
          height: 0;
        }

        .nav-btn.active {
          color: var(--primary);
          font-weight: bold;
        }

        .nav-menu-item-wrapper {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: center;
        }

        .menu-item-wrapper {
          cursor: pointer;
          border: 1px solid #ffffff10;
          width: 46%;
          height: 70px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background-color: var(--cardBgPrimary);
          border-radius: 16px;
          transition: all 0.2s ease;
        }

        .menu-item-wrapper:hover {
          border-color: var(--primary);
        }

        @media (max-width: 550px) {
          .menu-item-wrapper {
            width: 100%;
            height: 60px;
          }
        }

        @media (max-width: 400px) {
          .mobile-menu-container {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
