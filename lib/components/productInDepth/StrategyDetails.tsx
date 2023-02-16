import React, { useState } from 'react';
import { generateChart } from '../../data/dummy/randomChartData';
import { sortByTimelineTabItems } from '../../data/static/productInDepth';
import FilterTab from '../common/tab/FilterTab';
import Chart from './charts/Chart';
import ChartLoader from '../loader/productPageLoader/ChartLoader';

export default function StrategyDetails({ style, strategyData, loading }: any) {
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
          {!loading ? <Chart timeline={timeline.value} series={strategyData} /> : <ChartLoader />}
        </div>
      </div>
      <style jsx>{`
        .strategy-details-container {
          width: 100%;
          ${style ? style : ''};
        }
        .product-chart-options-wrapper {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}
