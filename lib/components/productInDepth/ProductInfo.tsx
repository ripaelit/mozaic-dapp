import React, { useEffect, useState } from 'react';
import DepositWithBtn from '../common/button/DepositBtn';
import PrimaryCard from '../common/card/PrimaryCard';
import useNumberCounter from '../../hooks/useNumberCounter';
import TextLoader from '../loader/TextLoader';
import IconLoader from '../loader/IconLoader';
import { getWeb3ReactContext, useWeb3React } from '@web3-react/core';
import { userTrxDetailsDummyData } from '../../data/dummy/ProductStaticDummyData';

const getDecimalVal = (val: number | string) => {
  let value;

  if (typeof val === 'number') {
    value = val.toFixed(2);
  } else {
    value = parseFloat(val).toFixed(2);
  }

  const intVal = parseFloat(value.split('.')[0]).toLocaleString();
  const decVal = value.split('.')[1];
  return { intVal, decVal };
};

export default function ProductInfo({ product, loading }: any) {
  const web3reactContext = useWeb3React();

  const [userTrxData, setUserTrxData] = useState<any>();

  useEffect(() => {
    // TODO: load user transaction details from contract when the wallet is connected

    if (web3reactContext.account) {
      setUserTrxData(userTrxDetailsDummyData[product.id]);
    } else {
      setUserTrxData(null);
    }
  }, [web3reactContext.account]);

  return (
    <>
      <div className='product-info-container'>
        <div className='gradient-overlay'></div>
        <PrimaryCard title={{ visible: false }} style={`height: 100%; padding: 24px;`}>
          <div className='product-info-wrapper'>
            <div className='basic-info'>
              <div className='product'>
                {!loading ? <img src={product.icon} alt='' /> : <IconLoader d={'92px'} />}
                {!loading ? <h2>{product.name}</h2> : <TextLoader type={'h2'} w={200} />}
              </div>
              <div className='value b-d'>
                <p>Current Value</p>
                {!loading ? (
                  !userTrxData?.value ? (
                    <h1>--</h1>
                  ) : (
                    <div className='current-value-wrapper'>
                      <h1>${getDecimalVal(userTrxData.value).intVal}</h1>
                      <h3>.{getDecimalVal(userTrxData.value).decVal}</h3>
                    </div>
                  )
                ) : (
                  <TextLoader type={'h1'} w={200} />
                )}
              </div>
              <TrxDetails data={userTrxData} loading={loading} />
            </div>
          </div>
        </PrimaryCard>
      </div>
      <style jsx>{`
        .product-info-container {
          width: 300px;
          position: relative;
        }
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 50%;
          opacity: 0.3;
          background: linear-gradient(
            181.64deg,
            ${!loading ? product.color : '#ffffff70'} 0%,
            ${(!loading ? product.color : '#ffffff') + '00'} 100%
          );
          border-radius: 10px 10px 0px 0px;
        }
        .product-info-wrapper {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          width: 100%;
        }
        .basic-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          height: 100%;
          width: 100%;
        }
        .value,
        .product {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .product > img {
          width: 92px;
          height: 92px;
        }

        .current-value-wrapper {
          display: flex;
          align-items: center;
        }

        .current-value-wrapper > h3 {
          padding-bottom: 8px;
        }

        .value > p {
          color: var(--textSecondary);
        }

        .value.b-t {
          display: none;
        }

        @media screen and (max-width: 850px) and (min-width: 600px) {
          .product-info-container {
            width: 100%;
          }

          .product-info-wrapper {
            flex-direction: row;
            justify-content: space-between;
          }
          .basic-info {
            gap: 10px;
            align-items: center;
            justify-content: center;
          }
          .product {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .balance {
            gap: 8px;
            flex-direction: row;
          }
          .balance > h1 {
            font-size: 1.8rem;
          }
          .product > img {
            width: 64px;
            height: 64px;
          }
          .balance.b-t {
            display: flex;
          }
          .balance.b-d {
            display: none;
          }
        }

        @media screen and (max-width: 825px) {
          .product-info-container {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

const TrxDetails = ({ data, loading }: any) => {
  const TrxDetailsItem = ({ percent, profit, usd, value, label }: any) => {
    return (
      <>
        <div className='trx-details-item'>
          <p className='label'>{profit ? (!percent ? 'Profit' : 'Profit %') : label}</p>
          {!loading ? (
            !data?.initialDeposit ? (
              <p className='value'>--</p>
            ) : (
              <h3 className='value'>
                {profit && (value > 0 ? '↗ ' : '↘ ')}
                {usd && '$'}
                {profit && !percent && '$'}
                {getDecimalVal(value).intVal}
                <span
                  className={`${usd ? 'superscript' : profit && !percent ? 'superscript' : ''}`}>
                  .{getDecimalVal(value).decVal}
                  {percent && <span className='superscript'>%</span>}
                </span>
              </h3>
            )
          ) : (
            <TextLoader type={'p'} w={50} />
          )}
        </div>

        <style jsx>{`
          .label {
            font-size: 0.75rem;
            text-align: center;
          }

          .superscript {
            font-size: 0.675rem;
            display: inline-block;
            vertical-align: top;
            padding-top: 2px;
          }

          .trx-details-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            width: 100%;
          }
          .value {
            font-weight: bold;
            ${profit && 'color: var(--alertPositive)'}
          }
        `}</style>
      </>
    );
  };

  return (
    <>
      <div className='trx-details-wrapper'>
        <div className='trx-details'>
          <TrxDetailsItem
            usd
            label='Inital Deposit'
            value={data?.initialDeposit ? data?.initialDeposit : null}
          />
          <TrxDetailsItem profit value={data?.profitUSD ? data?.profitUSD : null} />
        </div>
        <div className='trx-details'>
          <TrxDetailsItem
            label='mLP Balance'
            value={data?.initialDeposit ? data?.initialDeposit : null}
          />
          <TrxDetailsItem
            profit
            percent
            value={data?.profitPercentage ? data?.profitPercentage : null}
          />
        </div>
      </div>
      <style jsx>{`
        .trx-details-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          width: 100%;
        }

        .trx-details {
          display: flex;
          flex: 1;
        }

        @media screen and (max-width: 850px) and (min-width: 600px) {
          .trx-details-wrapper,
          .trx-details {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
};
