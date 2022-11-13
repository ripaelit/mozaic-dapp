import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownWithIcon from '../../input/dropdown/DropdownWithIcon';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';

export default function SingleAsset({
  vault,
  singleAssetDepositData,
  setSingleAssetDepositData,
}: any) {
  const [selectedAsset, setSelectedAsset] = useState(vault[0]);
  const [assetDepositData, setAssetDepositData] = useState(singleAssetDepositData);

  // set maximum balance for deposit data
  const setMaxBalance = (maxBalance: string) => {
    setAssetDepositData({
      ...assetDepositData,
      asset: {
        ...assetDepositData.asset,
        amount: parseFloat(maxBalance),
      },
    });
  };

  // set slippage amount
  const setSlippage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetDepositData({
      ...assetDepositData,
      slippage: e.target.value,
    });
  };

  // on input grab the input data
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetDepositData({
      ...assetDepositData,
      asset: { ...assetDepositData.asset, amount: parseFloat(e.target.value) },
    });
  };

  // on input generate the deposit data
  useEffect(() => {
    setAssetDepositData({
      ...assetDepositData,
      totalDepositAmount: assetDepositData.asset.amount * selectedAsset.conversionRate,
    });
  }, [assetDepositData.asset.amount]);

  // on asset change generate the deposit data
  useEffect(() => {
    setAssetDepositData({
      ...assetDepositData,
      asset: {
        ...assetDepositData.asset,
        id: selectedAsset.id,
        name: selectedAsset.name,
        address: selectedAsset.address,
        decimals: selectedAsset.decimals,
      },
      totalDepositAmount: assetDepositData.asset.amount * selectedAsset.conversionRate,
    });
  }, [selectedAsset]);

  // on input change generate the complete output data object
  useEffect(() => {
    setSingleAssetDepositData(assetDepositData);
  }, [assetDepositData]);

  return (
    <>
      <InputWithLabel
        label='Enter Amount'
        inputValue={assetDepositData.asset.amount}
        onChange={onInput}
        placeholder={`Enter ${selectedAsset.name} amount`}
        rightElement={
          <>
            <InputCheckBtn
              type='max'
              onMax={setMaxBalance}
              currentAsset={selectedAsset}
              currentDepositData={assetDepositData.asset}
            />
            <DropdownWithIcon
              options={vault}
              selectedOption={selectedAsset}
              setSelectedOption={setSelectedAsset}
            />
          </>
        }
      />
      <InputWithLabel
        readOnly={true}
        label='mCORE Amount'
        labelRightElement={
          <SlippageEditor onChange={setSlippage} value={assetDepositData.slippage} />
        }
        rightElement={<p>mCore</p>}
        inputValue={assetDepositData.totalDepositAmount}
      />
    </>
  );
}
