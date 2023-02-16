import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { generateChart } from '../../../data/dummy/randomChartData';
import { sortByTimelineTabItems } from '../../../data/static/productInDepth';
import PrimaryCard from '../../common/card/PrimaryCard';
import DropdownText from '../../common/input/dropdown/DropdownText';
import FilterTab from '../../common/tab/FilterTab';
import Chart from './Chart';
import ChartLoader from '../../loader/productPageLoader/ChartLoader';

export default function ProductChart({
  style,
  chartData,
  loading,
}: {
  style?: string;
  chartData: any;
  loading: boolean;
}) {
  const [timeline, setTimeline] = useState(sortByTimelineTabItems[0]);
  const [selectedOption, setSelectedOption] = useState(chartData[0]);

  return (
    <>
      <div className='product-chart-container'>
        <PrimaryCard title={{ visible: false }} style={` padding: 24px;`}>
          <div className='product-chart-container'>
            <div className='product-chart-options-wrapper'>
              <DropdownText
                options={chartData}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              <FilterTab
                tabs={sortByTimelineTabItems}
                currentTab={timeline}
                setCurrentTab={setTimeline}
              />
            </div>
            {!loading ? (
              <Chart
                yLabel={selectedOption.name}
                timeline={timeline.value}
                series={[selectedOption]}
              />
            ) : (
              <ChartLoader />
            )}
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
