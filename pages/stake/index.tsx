import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../lib/components/common/PageTitle';
import DetailsSection from '../../lib/components/stake/DetailsSection';
import LockSection from '../../lib/components/stake/LockSection';
import OverviewSection from '../../lib/components/stake/OverviewSection';
import { TabItem } from '../../lib/types/common';
import { calcStakingDate } from '../../lib/utils/calcStakingDate';

const title = { description: 'Automatic and intelligent multi-chain yield farming.', href: '#' };
const overviewData = [
  {
    id: 0,
    icon: '/assets/icons/assets/ico.moz.svg',
    duration: 1,
    name: 'veMOZ',
    amount: 0.33,
  },
  {
    id: 1,
    icon: '/assets/icons/assets/ico.moz.svg',
    duration: 2,
    name: 'veMOZ',
    amount: 0.66,
  },
  {
    id: 2,
    icon: '/assets/icons/assets/ico.moz.svg',
    duration: 3,
    name: 'veMOZ',
    amount: 0.99,
  },
];

const range: TabItem[] = [
  { id: 0, name: '1 week', shortName: '1W', value: 1, range: '1w' },
  { id: 1, name: '1 month', shortName: '1M', value: 4, range: '1m' },
  { id: 2, name: '3 Months', shortName: '3M', value: 13, range: '3m' },
  { id: 3, name: '6 Months', shortName: '6M', value: 26, range: '6m' },
  { id: 4, name: '1 Year', shortName: '1Y', value: 52, range: '1y' },
  { id: 5, name: '3 Years', shortName: '3Y', value: 156, range: '3y' },
];

const detailsData = {
  veMozBalance: 0,
  lockedMoz: 1521916216,
  totalVeMoz: 25351216551,
  averageLockTime: 3.64,
  tvl: 18156116136651,
};

const stakeAsset = {
  id: 3,
  name: 'AVAX',
  icon: '/assets/icons/assets/ico.avax.svg',
  address: '',
  decimals: 0,
  conversionRateUSD: 1,
  conversionRate: 3,
};

export default function Stake() {
  const [amount, setAmount] = useState(parseFloat(''));
  const [week, setWeek] = useState(1);
  const [selectedRange, setSelectedRange] = useState<TabItem | null>(null);
  const [unlockTime, setUnlockTime] = useState<any>(null);

  // on create lock this function will get called
  const onLock = () => {};

  // set maximum balance
  const setMaxBalance = (maxBalance: string) => {
    setAmount(parseFloat(maxBalance));
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  // on slider change
  const onSliderChange = (value: number) => {
    setWeek(value);
    const { unlockDate } = calcStakingDate(week);
    setUnlockTime(unlockDate);
  };

  // useEffect(() => {
  //   const { weeks, days, unlockDate } = calcStakingDate(week);
  //   setUnlockTime(unlockDate);
  // }, []);

  // on slider change calculate staking time
  useEffect(() => {
    const matchedRange = range.filter((item) => {
      if (item.value === week) {
        return item;
      }
    });

    if (matchedRange[0]) {
      setSelectedRange(matchedRange[0]);
      setWeek(matchedRange[0].value);
    } else {
      setSelectedRange(null);
    }
  }, [week]);

  // on range change calculate staking time
  useEffect(() => {
    if (selectedRange) {
      const { weeks, days, unlockDate } = calcStakingDate(selectedRange.range);
      setWeek(weeks);
      setUnlockTime(unlockDate);
    }
  }, [selectedRange]);

  return (
    <>
      <Head>
        <title>Mozaic - Stake</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <main className='stake-container'>
        <PageTitle
          title='Stake'
          rightElement={
            <p className='description'>
              {title.description}
              <a className='learn-more' href={title.href}>
                Learn more <img src='/assets/icons/ico.next.svg' />
              </a>
            </p>
          }
        />
        <div className='stake-items-wrapper'>
          <section className='col left'>
            <OverviewSection data={overviewData} />
            <DetailsSection data={detailsData} />
          </section>
          <section className='col right'>
            <LockSection
              amount={amount}
              setMaxBalance={setMaxBalance}
              stakeAsset={stakeAsset}
              onInput={onInput}
              time={week}
              onSliderChange={onSliderChange}
              range={range}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              onLock={onLock}
              unlockTime={unlockTime}
            />
          </section>
        </div>
      </main>
      <style jsx>{`
        .stake-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100%;
          gap: 32px;
          padding-bottom: 64px;
        }
        .description {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          gap: 10px;
          color: var(--textSecondary);
        }

        .learn-more {
          font-size: 0.875rem;
          color: var(--textPrimary);
          display: flex;
          gap: 4px;
          flex-direction: row;
          align-items: center;
          transition: all 0.2s ease;
        }

        .learn-more:hover {
          text-decoration: underline;
        }

        .stake-items-wrapper {
          display: flex;
          flex-direction: row;
          gap: 32px;
          width: 100%;
          flex-wrap: wrap;
        }

        .col {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
      `}</style>
    </>
  );
}
