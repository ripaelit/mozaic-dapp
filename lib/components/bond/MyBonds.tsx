import React from 'react';
import BondBtn from '../common/button/BondBtn';
import PrimaryCard from '../common/card/PrimaryCard';

const myBondTableItems = [
  {
    id: 0,
    name: 'Bond',
    sortable: true,
    className: 'bond',
  },
  {
    id: 1,
    name: 'Claimable',
    sortable: true,
    className: 'claimable',
  },
  {
    id: 2,
    name: 'Pending',
    sortable: true,
    className: 'pending',
  },
  {
    id: 3,
    name: 'Vesting Time',
    sortable: true,
    className: 'vestingtime',
  },
  {
    id: 4,
    name: '',
    sortable: true,
    className: 'claim',
  },
];

const myBondTableData = [
  {
    id: 0,
    name: 'USDC',
    icon: ['/assets/icons/assets/ico.usdc.svg'],
    claimable: 0.0,
    pending: 22.5,
    vestingTime: 7,
  },
  {
    id: 1,
    name: 'MOZ-AVAX LP',
    icon: ['/assets/icons/assets/ico.moz.svg', '/assets/icons/assets/ico.avax.svg'],
    claimable: 5.1,
    pending: 15.8,
    vestingTime: 7,
  },
];

export default function MyBonds() {
  return (
    <>
      <PrimaryCard
        title={{
          text: 'My Bonds',
          visible: true,
          indicatorVisible: false,
        }}>
        <div className='table-container'>
          <table>
            <colgroup>
              {myBondTableItems.map((item, index) => (
                <col key={item.id} className={'col-' + index} />
              ))}
            </colgroup>
            <thead className='table-header'>
              <tr>
                {myBondTableItems.map((item) => (
                  <th key={item.id} className={item.className}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myBondTableData.map((item) => (
                <tr key={item.id}>
                  <td className='bond-body-wrapper'>
                    <div className='bond-wrapper'>
                      <div className='icon-wrapper'>
                        {item.icon.map((icon, index) => (
                          <img className='icon' key={index} src={icon} alt='' />
                        ))}
                      </div>
                      <h4>{item.name}</h4>
                    </div>
                  </td>
                  <td className='claimable-body-wrapper'>
                    <div className='claimable-wrapper'>
                      <img className='icon' src={item.icon[0]} alt='' />
                      <p>{item.claimable}</p>
                    </div>
                  </td>
                  <td className='pending-body-wrapper'>
                    <p>{item.pending}</p>
                  </td>
                  <td className='vestingtime-body-wrapper'>
                    <p>{item.vestingTime} Days</p>
                  </td>
                  <td className='claim-body-wrapper'>
                    <BondBtn text='Claim' onClick={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PrimaryCard>
      <style jsx>{`
        .table-container {
          width: 100%;
          overflow: auto;
        }
        table {
          width: 100%;
          border-spacing: 0;
        }
        .col-1 {
          width: 25%;
        }
        .col-2,
        .col-3,
        .col-4 {
          width: 15%;
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
          text-align: left;
        }
        td {
          height: 65px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .bond-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .icon {
          width: 38px;
          height: 38px;
          margin: 0 -8px;
          border: 3px solid var(--cardBgPrimary);
          border-radius: 50%;
        }
        .icon-wrapper {
          display: flex;
        }
        .claimable-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .claim-body-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}
