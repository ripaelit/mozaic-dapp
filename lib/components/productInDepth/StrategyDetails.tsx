import React, { useState } from 'react';
import { generateChart } from '../../data/dummy/randomChartData';
import { sortByTimelineTabItems } from '../../data/static/productInDepth';
import FilterTab from '../common/tab/FilterTab';
import Chart from './charts/Chart';

const series = [
  { name: 'USDC', id: 0, data: generateChart(1500, 4) },
  { name: 'USDT', id: 1, data: generateChart(1500, 4) },
  { name: 'BUSD', id: 1, data: generateChart(1500, 4) },
];

export default function StrategyDetails({ style }: any) {
  const [timeline, setTimeline] = useState(sortByTimelineTabItems[0]);

  return (
    <>
      <div className='strategy-details-container'>
        <div className='product-chart-container'>
          <div className='product-chart-options-wrapper'>
            <FilterTab
              tabs={sortByTimelineTabItems}
              currentTab={timeline}
              setCurrentTab={setTimeline}
            />
          </div>
          <Chart timeline={timeline.value} series={series} />
        </div>
      </div>
      <style jsx>{`
        .strategy-details-container {
          width: 100%;
          ${style ? style : ''}
        }
      `}</style>
    </>
  );
}
