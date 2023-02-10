import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownChainIcon from '../../input/dropdown/DropdownChainIcon';
import DropdownTokenIcon from '../../input/dropdown/DropdownTokenIcon';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';

export default function SingleAsset({
  vault,
  singleAssetDepositData,
  setSingleAssetDepositData,
}: any) {
  const [selectedChain, setSelectedChain] = useState(vault[0]);
  const [selectedToken, setSelectedToken] = useState(vault[0].assets[0]);
  const [assetDepositData, setAssetDepositData] = useState(singleAssetDepositData);

  console.log("debug for vault:", vault);
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
      totalDepositAmount: assetDepositData.asset.amount * selectedToken.conversionRate,
    });
  }, [assetDepositData.asset.amount]);

  // on asset change generate the deposit data
  useEffect(() => {
    try {
      setAssetDepositData({
        ...assetDepositData,
        asset: {
          ...assetDepositData.asset,
          id: selectedToken.id,
          name: selectedToken.name,
          address: selectedToken.address,
          decimals: selectedToken.decimals,
        },
        totalDepositAmount: assetDepositData.asset.amount * selectedToken.conversionRate,
      });
    } catch(error){
      console.log(selectedToken);
    }
  }, [selectedToken]);

  // // on asset change generate the deposit data
  useEffect(() => {
    setAssetDepositData({
      ...assetDepositData,
      asset: {
        ...assetDepositData.asset,
        id: selectedToken.id,
        name: selectedToken.name,
        address: selectedToken.address,
        decimals: selectedToken.decimals,
      },
      totalDepositAmount: assetDepositData.asset.amount * selectedToken.conversionRate,
      name: selectedChain.name
    });
    console.log(assetDepositData);
  }, [selectedChain]);

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
        placeholder={`Enter ${selectedToken.name} amount`}
        rightElement={
          <>
            <InputCheckBtn
              type='max'
              onMax={setMaxBalance}
              currentAsset={selectedToken}
              currentAmount={assetDepositData.asset.amount}
            />
            <DropdownChainIcon
              options={vault}
              selectedOption={selectedChain}
              setSelectedOption={setSelectedChain}
            />
            <DropdownTokenIcon
              options={vault[selectedChain.id].assets}
              selectedOption={selectedToken}
              setSelectedOption={setSelectedToken}
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
        rightElement={<p>{'INMOZ'}</p>}
        // rightElement={<p>{vault[0].name}</p>}
        inputValue={assetDepositData.totalDepositAmount}
      />
    </>
  );
}
