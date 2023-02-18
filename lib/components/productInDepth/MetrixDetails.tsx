import React from 'react';
import TableLoader from '../loader/TableLoader';

const metricsDetailsTableItem = [
  {
    id: 0,
    name: 'Asset Name',
    sortable: true,
    className: 'asset-name',
  },
  {
    id: 1,
    name: 'Performance',
    sortable: true,
    className: 'performance',
  },
];

export default function MetricsDetails({ metricsData, loading }: any) {
  return (
    <>
      <div className='metrics-details-container'>
        {!loading ? (
          <table>
            <colgroup>
              <col className='col-1' />
              <col className='col-2' />
            </colgroup>
            <thead className='table-header'>
              <tr>
                {metricsDetailsTableItem.map((item) => (
                  <th key={item.id} className={item.className}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metricsData.map((item: any) => (
                <tr key={item.id}>
                  <td className={'asset-name-body'}>
                    <img src={item.icon} alt='' /> <p>{item.name}</p>
                  </td>
                  <td className={'performance-body'}>
                    <div
                      className='performance-wrapper'
                      style={{
                        color:
                          typeof item.value === 'number' && item.value! > 0
                            ? 'var(--alertPositive)'
                            : item.value! < 0
                            ? 'var(--alertNegative)'
                            : 'var(--textPrimary)',
                        textAlign: 'right',
                      }}>
                      {typeof item.value === 'number' && (
                        <div className='performance-item'>
                          <p className='counter'>{item.value}%</p>
                          {item.value !== 0 && (
                            <img
                              src={
                                item.value! > 0
                                  ? '/assets/icons/ico.up.svg'
                                  : '/assets/icons/ico.down.svg'
                              }
                              alt=''
                            />
                          )}
                        </div>
                      )}
                      {typeof item.value === 'object' && (
                        <>
                          {item.value.length === 1 && <p>{item.value[0]} months</p>}
                          {item.value.length === 2 && (
                            <p>
                              {item.value[0]} to {item.value[1]} months
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <TableLoader />
        )}
      </div>
      <style jsx>{`
        .col-1 {
          width: 70%;
        }
        .col-2 {
          width: 30%;
        }
        .metrics-detail-container {
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

        .asset-name {
          text-align: left;
        }
        .performance,
        .performance-body {
          text-align: right;
        }

        .performance-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .performance-item {
          display: flex;
          align-items: center;
          height: min-content;
          flex-direction: row;
          justify-content: center;
          padding: 8px;
          background-color: var(--inputBtnBgPrimary);
          min-width: 30%;
          border-radius: 8px;
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
      `}</style>
    </>
  );
}
