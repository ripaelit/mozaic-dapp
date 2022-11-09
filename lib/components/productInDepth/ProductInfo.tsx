import React, { useState } from 'react';
import DepositeWithdrawBtn from '../common/button/DepositeWithdrawBtn';
import PrimaryCard from '../common/card/PrimaryCard';

export default function ProductInfo({ product }: any) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className='product-info-container'>
        <div className='gradient-overlay'></div>
        <PrimaryCard title={{ visible: false }} style={`height: 100%; padding: 24px;`}>
          <div className='product-info-wrapper'>
            <div className='basic-info'>
              <div className='product'>
                <img src={product.icon} alt='' />
                <h2>{product.name}</h2>
              </div>
              <div className='balance'>
                <p>Balance</p>
                <h1>${product.balance}</h1>
              </div>
            </div>
            <DepositeWithdrawBtn />
          </div>
        </PrimaryCard>
      </div>
      <style jsx>{`
        .product-info-container {
          width: 300px;
          position: relative;
        }
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 50%;
          opacity: 0.3;
          background: linear-gradient(
            181.64deg,
            ${product.color} 1.4%,
            ${product.color + '00'} 98.6%
          );
          border-radius: 10px 10px 0px 0px;
        }
        .product-info-wrapper {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .basic-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          height: 100%;
        }
        .balance,
        .product {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .product > img {
          width: 92px;
          height: 92px;
        }
        .balance > p {
          color: var(--textSecondary);
        }
      `}</style>
    </>
  );
}
