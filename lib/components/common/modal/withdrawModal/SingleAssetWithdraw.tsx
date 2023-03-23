import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownToken from '../../input/dropdown/DropdownToken';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';
import DropdownChain from '../../input/dropdown/DropdownChain';
import { AssetElement } from '../../../../types/product';

export default function SingleAsset({
  vault,
  singleAssetWithdrawData,
  setSingleAssetWithdrawData,
}: any) {
  const [selectedChain, setSelectedChain] = useState(vault[0]);
  const [selectedToken, setSelectedToken] = useState(vault[0].assets[0]);
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
        amount: assetWithdrawData.totalWithdrawAmount / selectedToken.conversionRate,
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
        id: selectedToken.id,
        name: selectedToken.name,
        address: selectedToken.address,
        decimals: selectedToken.decimals,
        amount: assetWithdrawData.totalWithdrawAmount / selectedToken.conversionRate,
      },
    });
  }, [selectedToken]);

  useEffect(() => {
    setAssetWithdrawData({
      ...assetWithdrawData,
      asset: {
        ...assetWithdrawData.asset,
        id: selectedToken.id,
        name: selectedToken.name,
        address: selectedToken.address,
        decimals: selectedToken.decimals,
      },
      totalDepositAmount: assetWithdrawData.asset.amount * selectedToken.conversionRate,
      name: selectedChain.name,
    });
    setSelectedToken(selectedChain.assets[0]);
    // console.log(assetDepositData);
  }, [selectedChain]);

  // on input change generate the complete output data object
  useEffect(() => {
    setSingleAssetWithdrawData(assetWithdrawData);
  }, [assetWithdrawData]);

  return (
    <>
      <InputWithLabel
        placeholder={`Enter ${selectedChain.tokenName} amount`}
        label={`Enter ${selectedChain.tokenName} amount`}
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
            <DropdownChain
              chains={vault}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
            <p>{selectedChain.tokenName}</p>
          </>
        }
        inputValue={assetWithdrawData.totalWithdrawAmount}
        onChange={onInput}
      />
      <InputWithLabel
        readOnly={true}
        label={`${selectedToken.name} withdrawal amount`}
        inputValue={assetWithdrawData.asset.amount}
        rightElement={
          <>
            <DropdownToken
              tokens={((vault as AssetElement[]).find(obj=> obj.name == selectedChain.name)?.assets || []) as any} // redo typing
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
          </>
        }
      />
    </>
  );
}
