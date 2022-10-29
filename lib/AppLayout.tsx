import React from 'react';
import Nav from './components/common/nav/index';

export default function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <main className='container'>
        <Nav />
        <div className='app-container'>{children}</div>
      </main>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-width: 100vw;
          justify-content: center;
          align-items: center;
          min-height: 100%;
          padding: 0 30px;
        }

        .app-container {
          width: 100%;
          max-width: 1280px;
          height: 100%;
        }
      `}</style>
    </>
  );
}
