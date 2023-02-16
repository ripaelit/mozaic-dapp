import React from 'react';
import IconLoader from '../IconLoader';
import TextLoader from '../TextLoader';

export default function ProductSummaryLoader() {
  const SummaryLoader = () => {
    return (
      <>
        <div className='product-summary-loader-wrapper'>
          <IconLoader />
          <div className='product-summary-loader-text'>
            <TextLoader type={'p'} w={60} />
            <TextLoader type={'label'} w={100} />
          </div>
        </div>
        <style jsx>{`
          .product-summary-loader-wrapper {
            display: flex;
            flex: 1;
            min-width: 240px;
            align-items: center;
            gap: 16px;
          }
          .product-summary-loader-text {
            width: 80%;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
        `}</style>
      </>
    );
  };

  return (
    <>
      <div className='product-summary-loader-container'>
        <SummaryLoader />
        <SummaryLoader />
        <SummaryLoader />
        <SummaryLoader />
      </div>
      <style jsx>{`
        .product-summary-loader-container {
          display: flex;
          width: 100%;
          gap: 16px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
