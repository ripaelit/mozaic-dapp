import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import DropdownToken from '../../input/dropdown/DropdownToken';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';
import DropdownChain from '../../input/dropdown/DropdownChain';
import { AssetElement } from '../../../../types/product';
import { productDetails } from '../../../../data/productsStaging';
import BN from 'bn.js';
import { getERC20Contract, getWeb3 } from '../../../../store/contractStore';
import { useWeb3React } from '@web3-react/core';

export default function SingleAsset({
  vault,
  singleAssetWithdrawData,
  setSingleAssetWithdrawData,
}: any) {
  const [selectedChain, setSelectedChain] = useState(vault[0]);
  const [selectedToken, setSelectedToken] = useState(vault[0].assets[0]);
  const [assetWithdrawData, setAssetWithdrawData] = useState(singleAssetWithdrawData);
  const web3reactContext = useWeb3React();

  // set maximum balance for withdraw data
  const setMaxBalance = async (maxBalance: string) => {
    // not use maxBalance from lower hierarchy
    if (!web3reactContext.account) {
      setAssetWithdrawData({
        ...assetWithdrawData,
        totalWithdrawAmount: 0,
      });
      return;
    }
    // TODO: use context to get current product
    const mozLpData = productDetails[0].mozaicLp.find(obj => obj.name == selectedChain.name);
    if (!mozLpData) {
      console.log(`Could not find MozaicLP contract on chain - ${selectedChain.name}`);
      return;
    }
    const mozLpContract = getERC20Contract(mozLpData!.address, getWeb3(selectedChain.name));
    let _maxBalance = new BN(await mozLpContract!.methods.balanceOf(web3reactContext.account).call());
    setAssetWithdrawData({
      ...assetWithdrawData,
      totalWithdrawAmount: _maxBalance.toNumber()/new BN('10').pow(new BN(mozLpData!.decimals)).toNumber(),
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
