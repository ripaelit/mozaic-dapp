import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { generateChart } from '../../../data/dummy/randomChartData';
import { sortByTimelineTabItems } from '../../../data/static/productInDepth';
import PrimaryCard from '../../common/card/PrimaryCard';
import DropdownText from '../../common/input/dropdown/DropdownText';
import FilterTab from '../../common/tab/FilterTab';
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
});

const series = [{ name: 'Test', id: 0, data: generateChart(1500, 4) }];
const options = [
  {
    id: 0,
    name: 'Vault APY',
    value: 'vault-apy',
  },
  {
    id: 1,
    name: 'Share Price',
    value: 'share-price',
  },
];

export default function ProductChart({ style }: { style?: string }) {
  const [timeline, setTimeline] = useState(sortByTimelineTabItems[0]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <>
      <div className='product-chart-container'>
        <PrimaryCard title={{ visible: false }} style={` padding: 24px;`}>
          <div className='product-chart-container'>
            <div className='product-chart-options-wrapper'>
              <DropdownText
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
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

        .product-chart-options-wrapper {
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }
        @media screen and (max-width: 530px) {
          .product-chart-options-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
