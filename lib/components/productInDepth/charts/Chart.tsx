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
}: {
  timeline: string;
  series: ChartDataType[];
}) {
  const [chartOptions, setChartOptions] = useState(options);
  const [dataStream, setDataStream] = useState(series);

  const now = new Date();

  // filter chart data by timeline
  const filterBy = (timeline: string) => {
    switch (timeline) {
      case '1d':
        filterData(8.64e7, series);
        break;

      case '1w':
        filterData(6.048e8, series);

        break;
      case '1mo':
        filterData(2.628e9, series);

        break;
      case '3mo':
        filterData(7.884e9, series);

        break;
      case '6mo':
        filterData(1.577e10, series);

        break;
      case '1y':
        filterData(now.getTime() - now.setFullYear(now.getFullYear() - 1), series);

        break;
      case 'ytd':
        filterData(now.getTime() - new Date(now.getFullYear(), 0, 1).getTime(), series);

        break;
      case 'all':
        break;
      default:
    }
  };

  const filterData = (distance: number, dataStream: any) => {
    let data: any = [];
    const refTime = new Date().getTime() - distance;
    for (let i = 0; i < series.length; i++) {
      const filteredData = series[i].data.filter((time) => refTime < time[0]);
      data.push({ ...series[i], data: filteredData });
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
        <ReactApexChart options={chartOptions} series={dataStream} type='area' height={350} />
        <div className='bar-bg-wrapper'>
          <img src='/assets/icons/products/productInDepth/bg.bar.svg' alt='' />
        </div>
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

        .bar-bg-wrapper {
          position: absolute;
          display: flex;
          justify-content: center;
          overflow: hidden;
          height: 48px;
          width: 80%;
          object-fit: cover;
          bottom: 47px;
          z-index: 0;
          mix-blend-mode: screen;
          opacity: 0.3;
          left: 36px;
          pointer-events: none;
        }
        .bar-bg-wrapper > img {
        }
      `}</style>
    </>
  );
}
