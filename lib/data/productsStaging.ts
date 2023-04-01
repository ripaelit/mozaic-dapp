import { ProductDetailDataType, ProductType } from '../types/product';
import { chartData1, chartData2, chartData3, chartData4 } from './dummy/randomChartData';

export const products: ProductType[] | any = {
  status: 'something',
  message: 'message',
  data: [
    {
      id: 0,
      name: 'StableCoin',
      icon: '/assets/icons/products/ico.stablecoin.svg',
      color: '#2EBAC6',
      vault: [
        {
          id: 0,
          name: 'USDC',
          icon: '/assets/icons/assets/ico.usdc.svg',
        },
        {
          id: 1,
          name: 'USDT',
          icon: '/assets/icons/assets/ico.usdt.svg',
        },
        {
          id: 2,
          name: 'BUSD',
          icon: '/assets/icons/assets/ico.busd.svg',
        },
      ],
      apy: 11.6,
      tokenName: 'USDC',
      currentDeposit: 3946.31,
      maxCap: 15500,
      position: undefined,
    },
  ],
};

export const productDetails: ProductDetailDataType[] = [
  {
    id: 0,
    name: 'StableCoin',
    icon: '/assets/icons/products/ico.stablecoin.svg',
    color: '#2EBAC6',
    balance: 2558,
    chart: [
      {
        id: 0,
        name: 'Vault APY',
        data: chartData1,
      },
      {
        id: 1,
        name: 'Price',
        data: chartData2,
      },
    ],
    // test net vault
    vault: [
      {
        id: 0,
        name: 'BSC Testnet',
        tokenName: 'mLP',
        icon: '/assets/icons/wallet/networks/ico.bsc.svg',
        address: '0xe04eE32d062298647881C5A45e0844f621f35d1b',
        decimals: 0,
        conversionRateUSD: 1,
        conversionRate: 1,
        assets: [
          {
            id: 0,
            name: 'BUSD',
            icon: '/assets/icons/assets/ico.busd.svg',
            address: '0x1010Bb1b9Dff29e6233E7947e045e0ba58f6E92e',
            decimals: 18,
            conversionRateUSD: 1,
            conversionRate: 1,
          },
          {
            id: 1,
            name: 'USDT',
            icon: '/assets/icons/assets/ico.usdt.svg',
            address: '0xF49E250aEB5abDf660d643583AdFd0be41464EfD',
            decimals: 18,
            conversionRateUSD: 1,
            conversionRate: 1,
          },
        ],
      },
      {
        id: 1,
        name: 'Fantom Testnet',
        tokenName: 'mLP',
        icon: '/assets/icons/wallet/networks/ico.ftm.svg',
        address: '0x97dC48B8AFf1cF083Be5EC78d39d663c43181956',
        decimals: 0,
        conversionRateUSD: 1,
        conversionRate: 1,
        assets: [
          {
            id: 0,
            name: 'USDC',
            icon: '/assets/icons/assets/ico.usdc.svg',
            address: '0x076488D244A73DA4Fa843f5A8Cd91F655CA81a1e',
            decimals: 6,
            conversionRateUSD: 1,
            conversionRate: 1,
          },
        ],
      },
    ],
    mozaicLp: [
      {
        id: 0,
        name: 'BSC Testnet',
        address: '0x4DA9Dbc080c29252DF70E17a5c49968d95bd754c',
        decimals: 6,
        conversionRate: 1,
        conversionRateUSD: 1,
      },
      {
        id: 1,
        name: 'Fantom Testnet',
        address: '0xeD27B0451d749EC32ebEcbbc71E06Aa77fBF4c23',
        decimals: 6,
        conversionRate: 1,
        conversionRateUSD: 1,
      },
    ],
    mainnet: 'BSC Testnet',
    summary: [
      {
        id: 0,
        name: 'Assets under management',
        icon: '/assets/icons/products/productInDepth/ico.managedassets.svg',
        value: 70000000,
        prefix: '$',
      },
      {
        id: 1,
        name: 'Average monthly return',
        icon: '/assets/icons/products/productInDepth/ico.avaragemonthlyreturn.svg',
        value: 23,
        suffix: '%',
      },
      {
        id: 2,
        name: 'Last months average APY',
        icon: '/assets/icons/products/productInDepth/ico.lastmonthsapy.svg',
        value: 14,
        suffix: '%',
      },
      {
        id: 3,
        name: 'Predicted APY',
        icon: '/assets/icons/products/productInDepth/ico.predictedapy.svg',
        value: 18,
        suffix: '%',
      },
    ],
    details: {
      tokenDetails: [
        {
          id: 0,
          name: 'USDC',
          icon: '/assets/icons/assets/ico.usdc.svg',
          allocation: 22,
          apy: 0,
          strategy: 0,
        },
        {
          id: 1,
          name: 'USDT',
          icon: '/assets/icons/assets/ico.usdt.svg',
          allocation: 41,
          apy: -21.4,
          strategy: 1,
        },
        {
          id: 2,
          name: 'BUSD',
          icon: '/assets/icons/assets/ico.busd.svg',
          allocation: 9,
          apy: 12.1,
          strategy: 2,
        },
      ],
      metricsDetails: [
        {
          id: 0,
          name: 'Return Month-to-Date',
          value: -5.5,
          icon: '/assets/icons/products/productInDepth/metrics/ico.returnmonth.svg',
        },
        {
          id: 1,
          name: 'Return Quarter-To-Date',
          value: 6.6,
          icon: '/assets/icons/products/productInDepth/metrics/ico.returnquarter.svg',
        },
        {
          id: 2,
          name: 'Return Year-To-Date',
          value: 8.4,
          icon: '/assets/icons/products/productInDepth/metrics/ico.returnyear.svg',
        },
        {
          id: 3,
          name: 'Return Inception-To-Date',
          value: 15.5,
          icon: '/assets/icons/products/productInDepth/metrics/ico.returninception.svg',
        },
        {
          id: 4,
          name: 'Average Month',
          value: -8.9,
          icon: '/assets/icons/products/productInDepth/metrics/ico.avaragemonth.svg',
        },
        {
          id: 5,
          name: 'Best Month',
          value: 14.6,
          icon: '/assets/icons/products/productInDepth/metrics/ico.bestmonth.svg',
        },
        {
          id: 6,
          name: 'Worst Month',
          value: -37.8,
          icon: '/assets/icons/products/productInDepth/metrics/ico.worstmonth.svg',
        },
        {
          id: 7,
          name: 'Positive Months',
          value: [5],
          icon: '/assets/icons/products/productInDepth/metrics/ico.positivemonth.svg',
        },
        {
          id: 8,
          name: 'Length of Track Record',
          value: [1, 5],
          icon: '/assets/icons/products/productInDepth/metrics/ico.lengthtrack.svg',
        },
      ],
      strategyDetails: [
        {
          id: 0,
          name: 'USDT',
          data: chartData1,
        },
        {
          id: 1,
          name: 'USDC',
          data: chartData2,
        },
        {
          id: 2,
          name: 'BUSD',
          data: chartData3,
        },
      ],
    },
  },
];

export const userTrxDetailsDummyData = [
  {
    id: 0,
    value: 10230.3,
    initialDeposit: 2311.51,
    mLPbalance: 123,
    profitUSD: 34.2,
    profitPercentage: 42.3,
  },
  {
    id: 1,
    value: 100,
    initialDeposit: 100,
    mLPbalance: 0,
    profitUSD: 0,
    profitPercentage: 0,
  },
];
