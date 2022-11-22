export const chartOptions = (colors?: string[]) => {
  return {
    chart: {
      id: 'area-datetime',
      type: 'area',
      stacked: true,
      height: 350,

      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.5,
        blur: 4,

        color: ['var(--graphPrimary)', 'red'],
      },
      theme: 'dark',
    },
    stroke: {
      curve: 'smooth',
      colors: ['var(--graphPrimary)', 'red'],
      width: 2,
    },
    // grid options
    grid: {
      show: true,
      borderColor: 'var(--graphGrid)',
      strokeDashArray: [5, 2],
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
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
      // min: new Date('01 Mar 2021').getTime(),
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
        style: {
          colors: 'var(--textSecondary)',
        },
      },
      tickAmount: 5,
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy',
      },
    },
    theme: { mode: 'dark' },
    // chart area fills
    fill: {
      // array of colors for each asset
      colors: ['var(--graphPrimary)'],
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
    },
  };
};
