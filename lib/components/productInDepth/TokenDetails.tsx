import React from 'react';
import { strategies, tokenDetailsTableItems } from '../../data/static/productInDepth';
import ProgressBar from '../common/progressBar/ProgressBar';

export default function TokenDetails({ tokenData }: any) {
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

          <tbody>
            {tokenData.map((asset: any) => (
              <tr key={asset.id}>
                <td className={'asset-name-body'}>
                  <img src={asset.icon} alt='' /> <p>{asset.name}</p>
                </td>
                <td className={'allocation-body'}>
                  <div className='allocation-body-wrapper'>
                    <p>{asset.allocation}%</p>
                    <ProgressBar value={asset.allocation} />
                  </div>
                </td>
                <td className={'apy-body'}>{asset.apy}%</td>
                <td className={'strategy-body'}>
                  {strategies.map((strategy) => (
                    <React.Fragment key={strategy.id}>
                      {strategy.id === asset.strategy && (
                        <div className={`strategy-item-wrapper `}>
                          <div className={`strategy-item ${strategy.className}`}>
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
          width: 30%;
        }
        .col-3 {
          width: 20%;
        }
        .col-4 {
          width: 20%;
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
        }

        tbody::before {
          line-height: 1.5em;
          display: block;
          content: '-';
          color: transparent;
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
        .allocation-body-wrapper {
          display: flex;
          align-items: center;
          gap: 32px;
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
          width: 96px;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
        }

        .strategy-item.none {
          background: #ef5db51a;
        }
        .strategy-item.lending {
          background: #5d5fef1a;
        }
        .strategy-item.staking {
          background: #e8ef5d1a;
        }

        @media (max-width: 600px) {
          .strategy-item {
            width: min-content;
            padding: 8px;
          }
          .strategy-item > p {
            display: none;
          }
          .allocation-body-wrapper {
            gap: 16px;
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
