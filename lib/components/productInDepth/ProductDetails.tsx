import React, { useState } from 'react';
import { TabItem } from '../../types/common';
import PrimaryCard from '../common/card/PrimaryCard';
import Tab from '../common/tab/Tab';
import MatrixDetails from './MatrixDetails';
import StrategyDetails from './StrategyDetails';
import TokenDetails from './TokenDetails';

export default function ProductDetails({ data }: any) {
  const tabs: TabItem[] = [
    {
      id: 0,
      name: 'Token',
    },
    {
      id: 1,
      name: 'Matrix',
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
          color: '#B5E4CA',
        }}
        style={`
            width: 100%;
        `}
        tab={<Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />}>
        {currentTab.name === 'Token' ? (
          <TokenDetails tokenData={data.details.tokenDetails} />
        ) : currentTab.name === 'Matrix' ? (
          <MatrixDetails matrixData={data.details.matrixDetails} />
        ) : currentTab.name === 'Strategy' ? (
          <StrategyDetails strategyData={data.details.strategyDetails} />
        ) : (
          <></>
        )}
      </PrimaryCard>
    </>
  );
}
