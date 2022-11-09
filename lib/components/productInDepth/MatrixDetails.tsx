import React from 'react';

const matrixData = [
  {
    id: 0,
    name: 'Return Month-to-date',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.returnmonth.svg',
  },
  {
    id: 1,
    name: 'Return Quarter-To-Date',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.returnquarter.svg',
  },
  {
    id: 2,
    name: 'Return Year-To-Date',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.returnyear.svg',
  },
  {
    id: 3,
    name: 'Return Inception-To-Date',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.returninception.svg',
  },
  {
    id: 4,
    name: 'Average Month',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.avaragemonth.svg',
  },
  {
    id: 5,
    name: 'Best Month',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.bestmonth.svg',
  },
  {
    id: 6,
    name: 'Worst Month',
    currentValue: 37.8,
    previousValue: 15,
    icon: '/assets/icons/products/productInDepth/matrix/ico.worstmonth.svg',
  },
  {
    id: 7,
    name: 'Positive Month',
    value: 37.8,
    icon: '/assets/icons/products/productInDepth/matrix/ico.positivemonth.svg',
  },
  {
    id: 8,
    name: 'Length of Track Record',
    value: 37.8,
    icon: '/assets/icons/products/productInDepth/matrix/ico.lengthtrack.svg',
  },
];

const matrixDetailsTableItem = [
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

export default function MatrixDetails() {
  return (
    <>
      <div className='matrix-details-container'>
        <table>
          <colgroup>
            <col className='col-1' />
            <col className='col-2' />
            <col className='col-3' />
            <col className='col-4' />
          </colgroup>
          <thead className='table-header'>
            <tr>
              {matrixDetailsTableItem.map((item) => (
                <th key={item.id} className={item.className}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrixData.map((item) => (
              <tr key={item.id}>
                <td className={'asset-name-body'}>
                  <img src={item.icon} alt='' /> <p>{item.name}</p>
                </td>
                <td className={'performance-body'}>{item.value ? item.value : ''}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .col-1 {
          width: 70%;
        }
        .col-2 {
          width: 30%;
        }
        .matrix-detail-container {
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
