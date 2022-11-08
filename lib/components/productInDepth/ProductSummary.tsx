import React from 'react';
import PrimaryCard from '../common/card/PrimaryCard';

const productSummaryData = [
  {
    id: 0,
    name: 'Assets under management',
    icon: '/assets/icons/products/productInDepth/ico.managedassets.svg',
    value: 75000,
    prefix: '$',
  },
  {
    id: 1,
    name: 'Average monthly return',
    icon: '/assets/icons/products/productInDepth/ico.avaragemonthlyreturn.svg',
    value: 23,
    suffix: '%',
  },
  {
    id: 2,
    name: 'Last months average APY',
    icon: '/assets/icons/products/productInDepth/ico.lastmonthsapy.svg',
    value: 6,
    suffix: '%',
  },
  {
    id: 3,
    name: 'Predicted APY',
    icon: '/assets/icons/products/productInDepth/ico.predictedapy.svg',
    value: 4,
    suffix: '%',
  },
];

export default function ProductSummary() {
  return (
    <>
      <PrimaryCard title={{ visible: false }}>
        <div className='product-summary-container'>
          {productSummaryData.map((item) => (
            <div key={item.id} className='product-summary-wrapper'>
              <img src={item.icon} alt='' />
              <div className='product-summary-text'>
                <h3>
                  {item.prefix ? item.prefix : ''}
                  {item.value}
                  {item.suffix ? item.suffix : ''}
                </h3>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </PrimaryCard>
      <style jsx>{`
        .product-summary-container {
          display: flex;
        }
        .product-summary-wrapper {
          display: flex;
          flex: 1;
          align-items: center;
          gap: 16px;
        }
        img {
          width: 36px;
          height: 36px;
        }
        p {
          color: var(--textSecondary);
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
}
