/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ProductType } from '../../types/product';
import Slider from '../common/Slider';

// product card component
export default function ProductCard({ product }: { product: ProductType }) {
  const id = product.id;

  return (
    <>
      <Link
        href={{
          pathname: `/products/${product.name.replace(' ', '-')}`,
          query: { id: product.id },
        }}>
        <div className='product-card-container'>
          <div className='gradient-overlay'></div>
          <div className='product-icon-wrapper'>
            <img className='product-icon' src={product.icon} alt='' />
          </div>
          <ProductTitle product={product} />
          <ProductAPY product={product} />
          <Deposit product={product} />
          <Position product={product} />
        </div>
      </Link>
      <style jsx>{`
        .product-card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          max-width: 360px;
          width: 100%;
          min-width: 320px;
          margin-top: 60px;
          padding: 20px;
          padding-top: 48px;
          border-radius: 15px;
          background-color: var(--cardBgPrimary);
          gap: 30px;
          cursor: pointer;
          border: 2px solid var(--cardBgPrimary);
          transition: all 0.2s ease;
        }

        .product-card-container:hover {
          box-shadow: 0px 34px 100px -16px ${product.color + 80};
          z-index: 1;
          transform: scale(1.0125);
        }

        .product-card-container:active {
          box-shadow: 0px 14px 20px -16px ${product.color + 30};
          z-index: 1;
          transform: scale(1);
          border: 2px solid ${product.color};
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

        .product-card-container:active > .product-icon-wrapper {
          background-color: ${product.color};
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
          background: linear-gradient(
            181.64deg,
            ${product.color} 1.4%,
            ${product.color + '00'} 98.6%
          );
          border-radius: 15px 15px 0px 0px;
        }
      `}</style>
    </>
  );
}

// title of the product card
const ProductTitle = ({ product }: any) => {
  return (
    <>
      <div className='title-wrapper'>
        <div className='title'>
          <h2>{product.name}</h2>
          <div className='title-icon-wrapper'>
            <img src='/assets/icons/products/ico.scale.svg' alt='' />
          </div>
        </div>
        <div className='vault-wrapper'>
          {product.vault.map((token: any) => (
            <img className='token' src={token.icon} key={token.id} alt='' />
          ))}
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
          border: 1px solid ${product.color};
          background-color: ${product.color + 30};
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
const ProductAPY = ({ product }: { product: ProductType }) => {
  return (
    <>
      <div className='apy-container'>
        <h2>{product.apy}%</h2>
        <p className='label'>Current Projected Yield (APY)</p>
      </div>
      <style jsx>{`
        .apy-container {
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
const Deposit = ({ product }: { product: ProductType }) => {
  return (
    <>
      <div className='current-dep-container'>
        {/* current deposit */}
        <div className='label-wrapper'>
          <p className='label'>Current Deposits:</p>
          <h4>
            {product.currentDeposit} {product.tokenName}
          </h4>
        </div>
        <Slider max={product.maxCap} current={product.currentDeposit} />
        {/* max capacity */}
        <div className='label-wrapper'>
          <p className='label'>Max Capacity:</p>
          <h4>
            {product.maxCap / 1000 + 'k'} {product.tokenName}
          </h4>
        </div>
        {/* price change */}
        <div className='label-wrapper'>
          <p className='label'>24h Price Change:</p>
          <div className='price-change'>
            {product.priceChange !== 0 && (
              <img
                src={
                  product.priceChange! > 0
                    ? '/assets/icons/ico.up.svg'
                    : '/assets/icons/ico.down.svg'
                }
                alt=''
              />
            )}
            <h4 className='price-change-counter'>{product.priceChange}%</h4>
          </div>
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
          color: ${product.priceChange! > 0
            ? 'var(--alertPositive)'
            : product.priceChange! < 0
            ? 'var(--alertNegative)'
            : 'var(--textPrimary)'};
        }
      `}</style>
    </>
  );
};

// product card position section
const Position = ({ product }: { product: ProductType }) => {
  return (
    <>
      <div className='position-container'>
        <p className='label'>Your position</p>
        <div className='position-info-wrapper'>
          <h4>{product.position ? product.position : '---'}</h4>
          <p>{product.tokenName}</p>
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
