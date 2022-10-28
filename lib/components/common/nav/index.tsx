import Link from 'next/link';
import React from 'react';
import { navItems } from '../../../data/static/nav';

export default function Nav() {
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
                <a>{item.name}</a>
              </Link>
            ))}
          </section>
          {/* nav menu section */}
          <section className='col menu-wrapper'></section>
        </div>
      </div>

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
        }

        .nav-content-wrapper {
          display: flex;
          flex-direction: row;
          width: 1280px;
        }
        .col {
          flex: 1;
          align-items: center;
        }
        .logo-wrapper {
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
        @media (max-width: 768px) {
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
