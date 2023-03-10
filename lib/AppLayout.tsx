import React from 'react';
import Nav from './components/common/nav/index';

export default function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <img className='overlay-top' src='/assets/images/bg.overlay.png' alt='' />
      <img className='overlay-bottom' src='/assets/images/bg.overlay.png' alt='' />
      <main className='container'>
        <Nav />

        <div className='app-container'>{children}</div>
      </main>
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100%;
        }

        .app-container {
          width: 100%;
          max-width: 1280px;
          height: 100%;
          padding: 0 30px;
          transition: all 0.2s ease;
        }

        .overlay-top {
          position: absolute;
          top: 0;
          right: 0;
          max-width: 100vw;
          transform: rotate(90deg);
        }

        .overlay-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          max-width: 100vw;
          transform: rotate(-90deg);
        }

        @media screen and (max-width: 425px) {
          .app-container {
            padding: 0 16px;
          }
        }
      `}</style>
    </>
  );
}
