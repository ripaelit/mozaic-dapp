import React, { useState } from 'react';
import BondBtn from '../common/button/BondBtn';
import PrimaryCard from '../common/card/PrimaryCard';
import CreateBondModal from '../common/modal/createBondModal';

const availableBondTableItems = [
  {
    id: 0,
    name: 'Bond',
    sortable: true,
    className: 'bond',
  },
  {
    id: 1,
    name: 'Price',
    sortable: true,
    className: 'price',
  },
  {
    id: 2,
    name: 'ROI',
    sortable: true,
    className: 'roi',
  },
  {
    id: 3,
    name: 'TBV',
    sortable: true,
    className: 'tbv',
  },
  {
    id: 4,
    name: '',
    sortable: true,
    className: 'create-bond',
  },
];

const availableBondTableData = [
  {
    id: 0,
    name: 'USDC',
    icon: ['/assets/icons/assets/ico.usdc.svg'],
    price: 8.6,
    marketPrice: 140,
    roi: 0.25,
    tbv: 18228.58,
    vestingTime: 7,
  },
  {
    id: 1,
    name: 'MOZ-AVAX LP',
    icon: ['/assets/icons/assets/ico.moz.svg', '/assets/icons/assets/ico.avax.svg'],
    price: 16.1,
    marketPrice: 160,
    roi: -18.4,
    tbv: 84668458.74,
    vestingTime: 7,
  },
];

export default function AvailableBonds() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBond, setSelectedBond] = useState<any>();

  return (
    <>
      {showModal && <CreateBondModal bond={selectedBond} setShowModal={setShowModal} />}
      <PrimaryCard
        title={{
          text: 'Available Bonds',
          visible: true,
          indicatorVisible: false,
        }}>
        <table>
          <colgroup>
            {availableBondTableItems.map((item, index) => (
              <col key={item.id} className={'col-' + index} />
            ))}
          </colgroup>
          <thead className='table-header'>
            <tr>
              {availableBondTableItems.map((item) => (
                <th key={item.id} className={item.className}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availableBondTableData.map((item) => (
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
                <td className='price-body-wrapper'>
                  <div className='price-wrapper'>
                    <div className='asset-price-wrapper'>
                      <img className='icon' src={item.icon[0]} alt='' />
                      <p>{item.price}</p>
                    </div>
                    <div className='market-price-wrapper'>
                      <p>${item.marketPrice} MARKET</p>
                    </div>
                  </div>
                </td>
                <td className='roi-body-wrapper'>
                  <p className={item.roi < 0 ? 'negative' : ''}>{item.roi}%</p>
                </td>
                <td className='tbv-body-wrapper'>
                  <p>${item.tbv.toLocaleString()}</p>
                </td>
                <td className='createbond-body-wrapper'>
                  <BondBtn
                    text='Bond'
                    onClick={() => {
                      setSelectedBond(item);
                      setShowModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PrimaryCard>
      <style jsx>{`
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
        .price-wrapper,
        .asset-price-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 100%;
        }
        .market-price-wrapper {
          font-size: 0.675rem;
          font-weight: bold;
          color: #30e0a1;
          background-color: #30e0a11a;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .negative {
          color: var(--alertNegative);
        }
        .createbond-body-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}
