/* eslint-disable @next/next/no-img-element */
import React from 'react';
import IconLoader from './IconLoader';
import TextLoader from './TextLoader';

// product card component
export default function ProductCardLoader() {
  return (
    <>
      <div className='product-card-loader-container'>
        <div className='gradient-overlay'></div>
        <div className='product-icon-wrapper'>
          <IconLoader d='72px' />
        </div>
        <ProductTitle />
        <ProductAPY />
        <Deposit />
        <Position />
      </div>
      <style jsx>{`
        .product-card-loader-container {
          position: relative;
          display: flex;
          flex-direction: column;
          max-width: 360px;
          width: 100%;
          margin-top: 60px;
          padding: 20px;
          padding-top: 48px;
          border-radius: 15px;
          background-color: var(--cardBgPrimary);
          gap: 30px;
          cursor: pointer;
          border: 2px solid var(--cardBgPrimary);
          transition: all 0.2s ease;
          animation: opacity 2s ease infinite;
        }

        @keyframes opacity {
          0% {
            opacity: 0.25;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.25;
          }
        }

        .product-card-loader-container:hover {
          box-shadow: 0px 34px 100px -16px var(--textSecondary);
          z-index: 1;
          transform: scale(1.0125);
        }

        .product-card-loader-container:active {
          box-shadow: 0px 14px 20px -16px var(--textSecondary);
          z-index: 1;
          transform: scale(1);
          border: 2px solid var(--textSecondary);
        }

        .product-icon-wrapper {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82px;
          height: 82px;
          border-radius: 40px;
          background-color: var(--bg);
          top: -40px;
          transition: all 0.2s ease;
        }

        .product-card-loader-container:active > .product-icon-wrapper {
          background-color: var(--textSecondary);
        }

        .product-icon {
          width: 72px;
          height: 72px;
        }
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 130px;
          opacity: 0.3;
          background: linear-gradient(181.64deg, var(--textSecondary) 1.4%, #ffffff00 98.6%);
          border-radius: 15px 15px 0px 0px;
        }
      `}</style>
    </>
  );
}

// title of the product card
const ProductTitle = () => {
  return (
    <>
      <div className='title-wrapper'>
        <div className='title'>
          <TextLoader type='h2' w={45} />
          <div className='title-icon-wrapper'>
            <IconLoader />
          </div>
        </div>
        <div className='vault-wrapper'>
          <IconLoader />
          <IconLoader />
          <IconLoader />
          <IconLoader />
        </div>
      </div>
      <style jsx>{`
        .title-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .title-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background-color: #ffffff10;
        }

        .vault-wrapper {
          display: flex;
          flex-direction: row;
          gap: 12px;
        }

        .token {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

// product card apy section
const ProductAPY = () => {
  return (
    <>
      <div className='apy-container'>
        <TextLoader type='h2' w={45} />
        <TextLoader type='p' w={80} />
      </div>
      <style jsx>{`
        .apy-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          width: 100%;
          border: 2px solid var(--outlinePrimary);
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

// product card deposit section
const Deposit = () => {
  return (
    <>
      <div className='current-dep-container'>
        {/* current deposit */}
        <div className='label-wrapper'>
          <TextLoader type='label' w={50} />
          <TextLoader type='p' w={30} />
        </div>
        <TextLoader type='h2' w={100} />

        {/* max capacity */}
        <div className='label-wrapper'>
          <TextLoader type='label' w={36} />
          <TextLoader type='p' w={25} />
        </div>
        {/* price change */}
        <div className='label-wrapper'>
          <TextLoader type='label' w={50} />
          <div className='price-change'></div>
          <TextLoader type='p' w={30} />
        </div>
      </div>
      <style jsx>{`
        .current-dep-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .label-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price-change {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .price-change-counter {
          color: var(--textSecondary);
        }
      `}</style>
    </>
  );
};

// product card position section
const Position = () => {
  return (
    <>
      <div className='position-container'>
        <TextLoader type='label' w={28} />

        <div className='position-info-wrapper'>
          <TextLoader type='p' w={42} />

          <TextLoader type='p' w={20} />
        </div>
      </div>
      <style jsx>{`
        .position-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1px solid var(--outlinePrimary);
          padding-bottom: 12px;
        }
        .position-info-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  );
};
