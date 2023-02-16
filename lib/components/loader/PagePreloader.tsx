import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function PagePreloader() {
  return (
    <>
      <div className='page-loader-container'>
        <Bars
          height='60'
          width='60'
          color='#ffffff20'
          ariaLabel='bars-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
        <p className='loading-text'>Loading, please wait...</p>
      </div>
      <style jsx>{`
        .page-loader-container {
          height: 60vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 30px;
          padding-bottom: 96px;
          overflow-y: hidden;
        }
      `}</style>
    </>
  );
}
