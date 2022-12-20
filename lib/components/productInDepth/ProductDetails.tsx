import React, { useState } from 'react';
import { TabItem } from '../../types/common';
import PrimaryCard from '../common/card/PrimaryCard';
import Tab from '../common/tab/Tab';
import StrategyDetails from './StrategyDetails';
import TokenDetails from './TokenDetails';
import MetricsDetails from './MetrixDetails';

export default function ProductDetails({ data }: any) {
  const tabs: TabItem[] = [
    {
      id: 0,
      name: 'Token',
    },
    {
      id: 1,
      name: 'Metrics',
    },
    {
      id: 2,
      name: 'Strategy',
    },
  ];

  const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0]);

  return (
    <>
      <PrimaryCard
        title={{
          text: 'Details',
          visible: true,
          indicatorVisible: true,
          color: '#CABDFF',
        }}
        style={`
            width: 100%;
        `}
        tab={<Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />}>
        {currentTab.name === 'Token' ? (
          <TokenDetails tokenData={data.details.tokenDetails} />
        ) : currentTab.name === 'Metrics' ? (
          <MetricsDetails metricsData={data.details.metricsDetails} />
        ) : currentTab.name === 'Strategy' ? (
          <StrategyDetails strategyData={data.details.strategyDetails} />
        ) : (
          <></>
        )}
      </PrimaryCard>
    </>
  );
}
