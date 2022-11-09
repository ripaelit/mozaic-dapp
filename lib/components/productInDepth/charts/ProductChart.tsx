import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { generateChart } from '../../../data/dummy/randomChartData';
import { sortByTimelineTabItems } from '../../../data/static/productInDepth';
import PrimaryCard from '../../common/card/PrimaryCard';
import FilterTab from '../../common/tab/FilterTab';
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
});

const series = [{ name: 'Yo Bro', id: 0, data: generateChart(1500, 4) }];

export default function ProductChart({ style }: { style?: string }) {
  const [timeline, setTimeline] = useState(sortByTimelineTabItems[0]);
  return (
    <>
      <div className='product-chart-container'>
        <PrimaryCard title={{ visible: false }} style={` padding: 24px;`}>
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
        </PrimaryCard>
      </div>
      <style jsx>{`
        .product-chart-container {
          width: 100%;
          ${style ? style : ''}
        }
      `}</style>
    </>
  );
}
