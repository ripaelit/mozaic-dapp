import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ChartDataType } from '../../../types/product';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: any = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    stacked: false,
    height: 350,
    toolbar: {
      show: false,
    },

    zoom: {
      autoScaleYaxis: true,
    },
    dropShadow: {
      enabled: true,
      opacity: 1,
      blur: 2,
      color: ['#FF9800', '#E91E63', '#ae93fA', '#66DA26', '#546E7A'],
      top: 0,
      left: 0,
    },
    theme: 'dark',
  },
  colors: ['#FF9800', '#E91E63', '#ae93fA', '#66DA26', '#546E7A'],

  stroke: {
    curve: 'smooth',
    width: 2,
  },
  // grid options
  grid: {
    show: true,
    borderColor: 'var(--graphGrid)',
    strokeDashArray: [5, 2],
    position: 'back',
    lines: {
      show: true,
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    // title: {
    //   text: 'hello',
    //   style: {
    //     color: 'red',
    //     fontSize: '12px',
    //     fontFamily: 'Helvetica, Arial, sans-serif',
    //     fontWeight: 600,
    //     cssClass: 'apexcharts-yaxis-title',
    //   },
    // },
    min: undefined,
    max: new Date().getTime(),
    tickAmount: 10,
    labels: {
      style: {
        colors: 'var(--textSecondary)',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      show: true,
      text: 'lalala',
      align: 'right',
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: 'white',
        fontSize: '12px',
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    labels: {
      offsetX: -16,
      offsetY: 0,
      style: {
        colors: 'var(--textSecondary)',
      },
    },
    tickAmount: 5,
  },
  tooltip: {
    theme: 'dark',
    shared: true,
    x: {
      format: 'dd MMM yyyy',
    },
  },
  theme: { mode: 'dark' },
  // chart area fills
  fill: {
    // array of colors for each asset
    colors: ['var(--graphPrimary)'],
    // colors: 'inherit',
    type: 'gradient',
    theme: 'dark',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0,
      opacityFrom: 0.1,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
    pattern: {
      style: 'verticalLines',
      width: 6,
      height: 6,
      strokeWidth: 2,
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    markers: {},
  },
};

export default function Chart({
  timeline = '1d',
  series,
  yLabel,
}: {
  timeline: string;
  series: ChartDataType[];
  yLabel?: string;
}) {
  const [chartOptions, setChartOptions] = useState(options);
  const [dataStream, setDataStream] = useState(series);

  const now = new Date();

  // filter chart data by timeline
  const filterBy = (timeline: string) => {
    switch (timeline) {
      case '1d':
        filterData(8.64e7, series, 25);

        break;

      case '1w':
        filterData(6.048e8, series, 25);

        break;
      case '1mo':
        filterData(2.628e9, series, 31);

        break;
      case '3mo':
        filterData(7.884e9, series, 31);

        break;
      case '6mo':
        filterData(1.577e10, series, 31);

        break;
      case '1y':
        filterData(now.getTime() - now.setFullYear(now.getFullYear() - 1), series, 31);

        break;
      case 'ytd':
        filterData(now.getTime() - new Date(now.getFullYear(), 0, 1).getTime(), series, 31);

        break;
      case 'all':
        break;
      default:
    }
  };

  function filterArray(arr: any, amount: any) {
    if (arr.length < amount) {
      // console.log('arr', arr.length, amount);
      return arr;
    } else {
    }
    // Initialize a new array to store the filtered results
    let filteredArr = [];

    // Determine the step size to take when selecting elements
    let step = Math.floor(arr.length / amount);

    // Iterate over the input array with the specified step size
    for (let i = 0; i < arr.length; i += step) {
      // Add the current element to the filtered array
      filteredArr.push(arr[i]);
    }

    // Return the filtered array
    // console.log('filter');

    return filteredArr;
  }

  // Filter chart data
  const filterData = (distance: number, dataStream: any, maxItems: number = 30) => {
    let data: any = [];
    const refTime = new Date().getTime() - distance;
    for (let i = 0; i < dataStream.length; i++) {
      const filteredData = dataStream[i].data.filter((time: any) => refTime < time[0]);
      data.push({ ...dataStream[i], data: filterArray(filteredData, maxItems) });
      // console.log(filteredData.length);
    }

    setDataStream(data);
  };

  useEffect(() => {
    filterBy(timeline);
  }, [timeline]);

  useEffect(() => {
    setDataStream(series);
    filterBy(timeline);
  }, [series]);

  return (
    <>
      <div className='chart-container'>
        {yLabel && (
          <div className='y-axis-label-wrapper'>
            <p className='y-label'>{yLabel}</p>
          </div>
        )}
        <ReactApexChart options={chartOptions} series={dataStream} type='area' height={350} />
      </div>
      <style jsx global>{`
        .apexcharts-svg {
          background: transparent !important;
        }
      `}</style>

      <style jsx>{`
        .chart-container {
          width: 100%;
          position: relative;
        }

        .y-axis-label-wrapper {
          height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .y-label {
          position: absolute;
          transform: rotate(90deg);
          font-size: 0.675rem;
          width: max-content;
          color: var(--textLabel);
          white-space: nowrap;
          text-align: center;
          transform-origin: top center;
        }
      `}</style>
    </>
  );
}
