import React, { useState } from 'react';
import DepositWithdrawBtn from '../common/button/DepositWithdrawBtn';
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
              <div className='balance b-d'>
                <p>Balance</p>
                <h1>${product.balance}</h1>
              </div>
            </div>

            <div className='deposit-withdraw-btn-wrapper'>
              <div className='balance b-t'>
                <p>Balance</p>
                <h1>${product.balance}</h1>
              </div>
              <DepositWithdrawBtn />
            </div>
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

        .balance.b-t {
          display: none;
        }

        .deposit-withdraw-btn-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          width: 100%;
        }

        @media screen and (max-width: 850px) and (min-width: 600px) {
          .product-info-container {
            width: 100%;
          }

          .product-info-wrapper {
            flex-direction: row;
            justify-content: space-between;
          }
          .basic-info {
            gap: 10px;
            align-items: center;
            justify-content: center;
          }
          .product {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .balance {
            gap: 8px;
            flex-direction: row;
          }
          .balance > h1 {
            font-size: 1.8rem;
          }
          .product > img {
            width: 64px;
            height: 64px;
          }
          .balance.b-t {
            display: flex;
          }
          .balance.b-d {
            display: none;
          }
        }

        @media screen and (max-width: 825px) {
          .product-info-container {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
