import React from 'react';
import Nav from './components/common/nav/index';

export default function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Nav />
      <main className='app-container'>{children}</main>
      <style jsx>{``}</style>
    </>
  );
}
