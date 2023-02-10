import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownTokenIcon from '../../input/dropdown/DropdownTokenIcon';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';

export default function SingleAsset({
  vault,
  singleAssetWithdrawData,
  setSingleAssetWithdrawData,
}: any) {
  const [selectedAsset, setSelectedAsset] = useState(vault[0].assets[0]);
  const [assetWithdrawData, setAssetWithdrawData] = useState(singleAssetWithdrawData);

  // set maximum balance for withdraw data
  const setMaxBalance = (maxBalance: string) => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      totalWithdrawAmount: parseFloat(maxBalance),
    });
  };

  // set slippage amount
  const setSlippage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      slippage: parseFloat(e.target.value),
    });
  };

  // on input grab the input data
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      totalWithdrawAmount: parseFloat(e.target.value),
    });
  };

  // on input generate the withdraw data
  useEffect(() => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      asset: {
        ...assetWithdrawData.asset,
        amount: assetWithdrawData.totalWithdrawAmount / selectedAsset.conversionRate,
      },
    });
    // console.log(assetWithdrawData);
  }, [assetWithdrawData.totalWithdrawAmount]);

  // on asset change generate the withdraw data
  useEffect(() => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      asset: {
        ...assetWithdrawData.asset,
        id: selectedAsset.id,
        name: selectedAsset.name,
        address: selectedAsset.address,
        decimals: selectedAsset.decimals,
        amount: assetWithdrawData.totalWithdrawAmount / selectedAsset.conversionRate,
      },
    });
  }, [selectedAsset]);

  // on input change generate the complete output data object
  useEffect(() => {
    setSingleAssetWithdrawData(assetWithdrawData);
  }, [assetWithdrawData]);

  return (
    <>
      <InputWithLabel
        placeholder={`Enter ${vault.name} amount`}
        label={`Enter ${vault.name} amount`}
        labelRightElement={
          <SlippageEditor onChange={setSlippage} value={assetWithdrawData.slippage} />
        }
        rightElement={
          <>
            <InputCheckBtn
              type='max'
              onMax={setMaxBalance}
              currentAsset={vault}
              currentAmount={assetWithdrawData.totalWithdrawAmount}
            />
            <p>{vault.name}</p>
          </>
        }
        inputValue={assetWithdrawData.totalWithdrawAmount}
        onChange={onInput}
      />
      <InputWithLabel
        readOnly={true}
        label={`${selectedAsset.name} withdrawal amount`}
        inputValue={assetWithdrawData.asset.amount}
        rightElement={
          <>
            <DropdownTokenIcon
              tokens={vault[0].assets}
              selectedToken={selectedAsset}
              setSelectedToken={setSelectedAsset}
            />
          </>
        }
      />
    </>
  );
}
