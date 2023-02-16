import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function ChartLoader() {
  return (
    <>
      <div className='chart-loader-container'>
        <Bars
          height='60'
          width='60'
          color='#ffffff20'
          ariaLabel='bars-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
        <p className='loading-text'>Loading chart data...</p>
      </div>
      <style jsx>{`
        .chart-loader-container {
          height: 350px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 20px;
          overflow-y: hidden;
        }
      `}</style>
    </>
  );
}
