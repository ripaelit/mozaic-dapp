import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { navItems } from '../../../data/static/nav';
import ConnectWalletBtn from '../button/ConnectWalletBtn';
import MenuBtn from '../button/MenuBtn';
import ConnectWalletModal from '../modal/ConnectWalletModal';

export default function Nav() {
  const router: any = useRouter();
  // returns if the current path is active or not
  const isActive = (path: string) => {
    if (router.asPath === path) return 'active';
    return '';
  };

  const [showConnectWalletModal, setShowConnectWalletModal] = useState<boolean>(false);

  return (
    <>
      <div className='nav-container'>
        <div className='nav-content-wrapper'>
          {/* logo section */}
          <section className='col logo-wrapper'>
            <Link href='/'>
              <a>
                {/* desktop view logo */}
                <img className='desktop-logo logo' src='/assets/logo/logo.mozaic.svg' alt='' />
                {/* mobile view logo */}
                <img className='mobile-logo logo' src='/assets/logo/ico.logo.mozaic.svg' alt='' />
              </a>
            </Link>
          </section>
          {/* navigation button section */}
          <section className='col nav-btn-wrapper'>
            {navItems.map((item) => (
              <Link href={item.path} key={item.id}>
                <a className={`nav-btn ${isActive(item.path)}`}>{item.name}</a>
              </Link>
            ))}
          </section>
          {/* nav menu section */}
          <section className='col menu-wrapper'>
            <ConnectWalletBtn
              setShowConnectWalletModal={setShowConnectWalletModal}
              showConnectWalletModal={showConnectWalletModal}
            />
            <MenuBtn />
          </section>
        </div>
      </div>
      {showConnectWalletModal && <ConnectWalletModal setShowModal={setShowConnectWalletModal} />}

      <style jsx>{`
        .nav-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 90px;
          background-color: var(--bg);
          position: sticky;
          top: 0;
          left: 0;
          padding: 0px 30px;
          z-index: 111111;
        }

        .nav-content-wrapper {
          display: flex;
          flex-direction: row;
          width: 1280px;
          gap: 30px;
        }
        .col {
          display: flex;
          flex: 2;
          align-items: center;
          transition: all 0.2s ease;
        }

        .logo {
          height: 32px;
          object-fit: contain;
        }
        .mobile-logo {
          display: none;
        }
        .nav-btn-wrapper {
          display: flex;
          flex-direction: row;
          gap: 50px;
          align-items: center;
          justify-content: center;
        }

        .nav-btn {
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

        .menu-wrapper {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        @media (max-width: 960px) {
          .logo-wrapper,
          .menu-wrapper {
            flex: 1;
          }
        }

        @media (max-width: 840px) {
          .desktop-logo {
            display: none;
          }
          .mobile-logo {
            display: inline-block;
          }
        }

        @media (max-width: 730px) {
          .desktop-logo {
            display: inline-block;
          }
          .mobile-logo {
            display: none;
          }
          .nav-btn-wrapper {
            display: none;
          }
          .menu-wrapper {
            flex: 4;
          }
        }
        @media (max-width: 500px) {
          .desktop-logo {
            display: none;
          }
          .mobile-logo {
            display: inline-block;
          }
        }
      `}</style>
    </>
  );
}
