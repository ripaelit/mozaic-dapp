import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import InputBox from '../../input/InputBox';
import InputLabel from '../../input/InputLabel';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';

export default function MultiAssets({
  vault,
  multiAssetsWithdrawData,
  setMultiAssetsWithdrawData,
}: any) {
  const [assetWithdrawData, setAssetWithdrawData] = useState(multiAssetsWithdrawData);

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
    const tempAssetWithdrawData = assetWithdrawData;

    const sharedAmount = parseFloat(e.target.value) / tempAssetWithdrawData.assets.length;

    for (let i = 0; i < tempAssetWithdrawData.assets.length; i++) {
      const asset = vault.assets[i];
      tempAssetWithdrawData.assets[i].amount = sharedAmount / asset.conversionRate;
    }

    setAssetWithdrawData({
      ...assetWithdrawData,
      totalWithdrawAmount: parseFloat(e.target.value),
    });
  };

  // on input change generate the complete output data object
  useEffect(() => {
    setMultiAssetsWithdrawData(assetWithdrawData);
  }, [assetWithdrawData]);
  return (
    <>
      <InputWithLabel
        placeholder={`Enter ${vault.name} amount`}
        label={`Enter ${vault.name} amount`}
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
      <InputLabel
        label={'Withdrawal Amounts'}
        labelRightElement={
          <SlippageEditor onChange={setSlippage} value={assetWithdrawData.slippage} />
        }
      />

      {vault.assets.map((asset: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <InputBox
              readOnly={true}
              inputValue={assetWithdrawData.assets[index].amount}
              index={index}
              placeholder={`${asset.name} amount`}
              rightElement={
                <>
                  <div className='asset-display'>
                    <img src={asset.icon} alt='' />
                    <p>{asset.name}</p>
                  </div>
                </>
              }
            />
          </React.Fragment>
        );
      })}

      <style jsx>{`
        .asset-display {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: var(--textLabel);
          padding: 8px;
          background-color: var(--inputBtnBgPrimary);
        }
      `}</style>
    </>
  );
}
