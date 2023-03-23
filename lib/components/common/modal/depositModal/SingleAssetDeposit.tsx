import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownChain from '../../input/dropdown/DropdownChain';
import DropdownToken from '../../input/dropdown/DropdownToken';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';
import BN from 'bn.js';
import { getERC20Contract, getWeb3 } from '../../../../store/contractStore';
import { useWeb3React } from '@web3-react/core';

export default function SingleAsset({
  vault,
  singleAssetDepositData,
  setSingleAssetDepositData,
}: any) {
  const [selectedChain, setSelectedChain] = useState(vault[0]);
  const [selectedToken, setSelectedToken] = useState(vault[0].assets[0]);
  const [assetDepositData, setAssetDepositData] = useState(singleAssetDepositData);
  const web3reactContext = useWeb3React();

  // console.log("debug for vault:", vault);
  // set maximum balance for deposit data
  const setMaxBalance = async (maxBalance: string) => {
    // not use maxBalance from lower hierarchy
    if (!web3reactContext.account) {
      setAssetDepositData({
        ...assetDepositData,
        asset: {
          ...assetDepositData.asset,
          amount: 0,
        },
      });
      return;
    }
    const tokenContract = getERC20Contract(selectedToken!.address, getWeb3(selectedChain.name));
    let _maxBalance = new BN(await tokenContract!.methods.balanceOf(web3reactContext.account).call()).div(new BN('10').pow(new BN(selectedToken!.decimals)));
    setAssetDepositData({
      ...assetDepositData,
      asset: {
        ...assetDepositData.asset,
        amount: _maxBalance.toNumber(),
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
    } catch (error) {
      // console.log(selectedToken);
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
      name: selectedChain.name,
    });
    setSelectedToken(selectedChain.assets[0]);
    // console.log(assetDepositData);
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
            <DropdownChain
              chains={vault}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
            <DropdownToken
              tokens={vault[selectedChain.id].assets}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
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
        rightElement={<p>{selectedChain.tokenName}</p>}
        // rightElement={<p>{vault[0].name}</p>}
        inputValue={assetDepositData.totalDepositAmount}
      />
    </>
  );
}
