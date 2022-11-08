import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { sortByTimelineTabItems } from '../../../data/static/productInDepth';
import PrimaryCard from '../../common/card/PrimaryCard';
import FilterTab from '../../common/tab/FilterTab';
// import Chart from './Chart';
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
});

export default function ProductChart() {
  const [timeline, setTimeline] = useState(sortByTimelineTabItems[0]);
  return (
    <>
      <PrimaryCard title={{ visible: false }}>
        <div className='product-chart-container'>
          <div className='product-chart-options-wrapper'>
            <FilterTab
              tabs={sortByTimelineTabItems}
              currentTab={timeline}
              setCurrentTab={setTimeline}
            />
          </div>
          <Chart timeline={timeline.value} />
        </div>
      </PrimaryCard>
    </>
  );
}
