import React, { useEffect, useState } from 'react';
import InputCheckBtn from '../../button/InputCheckBtn';
import InputBox from '../../input/InputBox';
import InputWithLabel from '../../input/InputWithLabel';
import SlippageEditor from '../../input/SlippageEditor';

export default function MultiAssets({
  vault,
  multiAssetsDepositData,
  setMultiAssetsDepositData,
}: any) {
  const [assetDepositData, setAssetDepositData] = useState(multiAssetsDepositData);

  // set maximum balance for deposit data
  const setMaxBalance = (maxBalance: string, index: number) => {
    const tempAssetDepositData = assetDepositData;
    tempAssetDepositData.assets[index] = {
      ...tempAssetDepositData.assets[index],
      amount: parseFloat(maxBalance),
    };

    setAssetDepositData({
      ...tempAssetDepositData,
    });
  };

  // set slippage amount
  const setSlippage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetDepositData({
      ...assetDepositData,
      slippage: parseFloat(e.target.value),
    });
  };

  // set Approval status
  const setApproval = (value: number, index: number) => {
    const tempAssetDepositData = assetDepositData;
    tempAssetDepositData.assets[index] = {
      ...tempAssetDepositData.assets[index],
      approval: tempAssetDepositData.assets[index].approval === value ? 0 : value,
    };

    setAssetDepositData({
      ...tempAssetDepositData,
    });
  };

  // on input grab the input data
  // on asset change generate the deposit data based on the conversion rate

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempAssetDepositData = assetDepositData;
    let sum = 0;

    tempAssetDepositData.assets[index] = {
      ...tempAssetDepositData.assets[index],
      amount: parseFloat(e.target.value),
    };

    for (let i = 0; i < tempAssetDepositData.assets.length; i++) {
      const assetData = tempAssetDepositData.assets[i];
      const asset = vault[i];
      sum =
        sum +
        parseFloat(assetData.amount ? assetData.amount : 0) *
          parseFloat(asset.conversionRate ? asset.conversionRate : 0);
    }

    tempAssetDepositData.totalDepositAmount = sum;

    setAssetDepositData({ ...tempAssetDepositData });
  };

  // on input change generate the complete output data object
  useEffect(() => {
    setMultiAssetsDepositData(assetDepositData);
  }, [assetDepositData]);
  return (
    <>
      {vault.map((asset: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <InputBox
              inputValue={assetDepositData.assets[index].amount}
              index={index}
              onChange={onInput}
              placeholder={`Enter ${asset.name} amount`}
              rightElement={
                <>
                  <InputCheckBtn
                    text='Approve'
                    index={index}
                    value={1}
                    onClick={setApproval}
                    active={assetDepositData.assets[index].approval === 1}
                  />
                  <InputCheckBtn
                    text='Infinity Approve'
                    index={index}
                    value={Infinity}
                    onClick={setApproval}
                    active={assetDepositData.assets[index].approval === Infinity}
                  />
                  <InputCheckBtn
                    type='max'
                    index={index}
                    onMax={setMaxBalance}
                    currentAsset={asset}
                    currentDepositData={assetDepositData.assets[index]}
                  />
                  <div className='asset-display'>
                    <img src={asset.icon} alt='' />
                    {/* <p>{asset.name}</p> */}
                  </div>
                </>
              }
            />
          </React.Fragment>
        );
      })}
      <InputWithLabel
        readOnly={true}
        label='mCORE Amount'
        labelRightElement={
          <SlippageEditor onChange={setSlippage} value={assetDepositData.slippage} />
        }
        rightElement={<p>mCore</p>}
        inputValue={assetDepositData.totalDepositAmount}
      />
      <style jsx>{`
        .asset-display {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: var(--textLabel);
          padding: 4px;
          background-color: var(--inputBtnBgPrimary);
        }
      `}</style>
    </>
  );
}
