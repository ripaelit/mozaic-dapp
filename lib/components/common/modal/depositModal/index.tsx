import React, { useEffect, useState } from 'react';
import { TabItem } from '../../../../types/common';
import DropdownWithIcon from '../../input/dropdown/DropdownWithIcon';
import InputBox from '../../input/InputBox';
import InputWithLabel from '../../input/InputWithLabel';
import Separator from '../../Separator';
import Tab from '../../tab/Tab';
import Modal from '../Modal';
import MultiAssets from './MultiAssetsDeposit';
import SingleAsset from './SingleAssetDeposit';

const assetTypes: TabItem[] = [
  { id: 0, name: 'Single Asset', value: 'single' },
  { id: 1, name: 'Multi Assets', value: 'multi' },
];

const vault = [
  {
    id: 0,
    name: 'USDC',
    icon: '/assets/icons/assets/ico.usdc.svg',
    address: '',
    decimals: 0,
    conversionRateUSD: 1,
    conversionRate: 1,
  },
  {
    id: 1,
    name: 'USDT',
    icon: '/assets/icons/assets/ico.usdt.svg',
    address: '',
    decimals: 0,
    conversionRateUSD: 1,
    conversionRate: 2,
  },
  {
    id: 2,
    name: 'BUSD',
    icon: '/assets/icons/assets/ico.busd.svg',
    address: '',
    decimals: 0,
    conversionRateUSD: 1,
    conversionRate: 3,
  },
];

const initialSingleAssetDepositData = {
  asset: {
    id: 0,
    name: '',
    address: '',
    decimals: 0,
    amount: NaN,
  },
  totalDepositAmount: 0,
};

const description = `Add liquidity in underlying pool tokens. First, approve required token to power index smart contract and then click supply.`;

export default function DepositModal({
  setOpenDepositModal,
}: {
  setOpenDepositModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [depositType, setDepositType] = useState(assetTypes[0]);
  const [singleAssetDepositData, setSingleAssetDepositData] = useState(
    initialSingleAssetDepositData
  );
  const [multiAssetDepositData, setMultiAssetDepositData] = useState();

  useEffect(() => {
    console.log('single asset', singleAssetDepositData);
  }, [singleAssetDepositData]);
  useEffect(() => {
    console.log('multi assets', multiAssetDepositData);
  }, [multiAssetDepositData]);

  return (
    <>
      <Modal setModalVisibility={setOpenDepositModal} title='Deposit'>
        <div className='deposit-modal-wrapper'>
          <Tab
            currentTab={depositType}
            setCurrentTab={setDepositType}
            tabs={assetTypes}
            style={'height:64px;'}
          />
          <p className='description'>{description}</p>
          <Separator />
          <div className='deposit-modal-content-wrapper single-asset'>
            {depositType.value === 'single' && (
              <SingleAsset
                vault={vault}
                singleAssetDepositData={singleAssetDepositData}
                setSingleAssetDepositData={setSingleAssetDepositData}
              />
            )}
            {/* {depositType.value === 'multi' && (
              <MultiAssets
                vault={vault}
                multiAssetDepositData={multiAssetDepositData}
                setMultiAssetDepositData={setMultiAssetDepositData}
              />
            )} */}
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .deposit-modal-wrapper,
        .deposit-modal-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .description {
          font-size: 0.875rem;
          color: var(--textSecondary);
          line-height: 1.5rem;
        }
      `}</style>
    </>
  );
}
