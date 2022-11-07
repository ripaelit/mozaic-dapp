import React from 'react';
import Separator from '../common/Separator';

const tokenData = [
  {
    id: 0,
    name: 'USDC',
    icon: '/assets/icons/assets/ico.usdc.svg',
    allocation: 54,
    apy: 0.0,
    strategy: 0,
  },
  {
    id: 1,
    name: 'USDT',
    icon: '/assets/icons/assets/ico.usdt.svg',
    allocation: 54,
    apy: -21.4,
    strategy: 1,
  },
  {
    id: 2,
    name: 'BUSD',
    icon: '/assets/icons/assets/ico.busd.svg',
    allocation: 54,
    apy: 12.1,
    strategy: 2,
  },
];

const strategies = [
  {
    id: 0,
    name: 'None',
    icon: '/assets/icons/products/productInDepth/ico.none.svg',
    className: 'none',
  },
  {
    id: 1,
    name: 'Lending',
    icon: '/assets/icons/products/productInDepth/ico.lending.svg',
    className: 'lending',
  },
  {
    id: 2,
    name: 'Staking',
    icon: '/assets/icons/products/productInDepth/ico.staking.svg',
    className: 'staking',
  },
];

const tokenDetailsTableItems = [
  {
    id: 0,
    name: 'Asset Name',
    sortable: true,
    className: 'asset-name',
  },
  {
    id: 1,
    name: 'Allocation',
    sortable: true,
    className: 'allocation',
  },
  {
    id: 2,
    name: 'APY',
    sortable: true,
    className: 'apy',
  },
  {
    id: 3,
    name: 'Strategy',
    sortable: false,
    className: 'strategy',
  },
];

export default function TokenDetails() {
  return (
    <>
      <div className='token-details-container'>
        <table>
          <colgroup>
            <col className='col-1' />
            <col className='col-2' />
            <col className='col-3' />
            <col className='col-4' />
          </colgroup>
          <thead className='table-header'>
            <tr>
              {tokenDetailsTableItems.map((item) => (
                <th key={item.id} className={item.className}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>

          <div className='test'></div>
          <tbody>
            {tokenData.map((asset) => (
              <tr key={asset.id}>
                <td className={'asset-name-body'}>
                  <img src={asset.icon} alt='' /> <p>{asset.name}</p>
                </td>
                <td className={'allocation-body'}>
                  <p>{asset.allocation}%</p>
                </td>
                <td className={'apy-body'}>{asset.apy}%</td>
                <td className={'strategy-body'}>
                  {strategies.map((strategy) => (
                    <React.Fragment key={strategy.id}>
                      {strategy.id === asset.strategy && (
                        <div className={`strategy-item-wrapper ${strategy.className}`}>
                          <div className='strategy-item'>
                            <img src={strategy.icon} alt='' />
                            <p>{strategy.name}</p>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .col-1 {
          width: 30%;
        }
        .col-2 {
          width: 40%;
        }
        .col-3 {
          width: 20%;
        }
        .col-4 {
          width: 10%;
        }
        .token-detail-container {
          width: 100%;
        }
        table {
          width: 100%;
          border-spacing: 0;
        }
        .table-header {
          font-size: 0.875rem;
          height: 80px;
          margin-bottom: 16px;
        }
        th {
          font-weight: 300;
          color: var(--textSecondary);
          border-bottom: 1px solid var(--textSecondary);
          padding-left: 10px;
          padding-right: 10px;
        }
        .asset-name,
        .allocation {
          text-align: left;
        }
        .apy,
        .strategy,
        .strategy-body,
        .apy-body {
          text-align: right;
        }
        td {
          height: 65px;
          padding-left: 10px;
          padding-right: 10px;
        }

        .asset-name-body {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .strategy-item-wrapper {
          display: flex;
          font-size: 0.75rem;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
        }
        .strategy-item {
          display: flex;
          background-color: red;
          width: 96px;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
        }
        @media (max-width: 600px) {
          .strategy-item {
            width: auto;
          }
          .strategy-item > p {
            display: none;
          }
        }
        @media (max-width: 450px) {
          .asset-name-body > p {
            display: none;
          }
        }
        @media screen and (max-width: 375px) {
          th {
            padding: 0 4px 0 4px;
          }
          td {
            padding: 0 4px 0 4px;
          }
        }
      `}</style>
    </>
  );
}
