type token = {
  id: any;
  name: string;
  icon: string;
};

export interface ProductType {
  id: any;
  name: string;
  icon: string;
  color: string;
  vault: token[];
  apy: number;
  tokenName: string;
  maxCap: number;
  currentDeposit: number;
  priceChange?: number;
  position: number | undefined;
}

export interface ProductDetailsType {}

let product = {
  product: {
    id: 1,
    name: 'Stable Coin',
    icon: '',
    balance: 2000,
  },
  chart: [
    {
      id: 1,
      name: 'Vault APY',
      data: [
        {
          id: 1,
          date: 151146516561,
          value: 1,
        },
      ],
    },
  ],
  summery: {
    assetsUnderManagement: 1,
    averageMonthlyReturn: 2,
    lastMonthAverageAPY: 3,
    predictedAPY: 4,
  },
  details: {
    tokens: [
      {
        id: 1,
        name: 'usdt',
        icon: '',
        allcoation: '',
        apy: 1,
        strategy: '',
      },
    ],
    metrics: {
      returnMonthToDate: 1,
      returnQuerterToDate: 2,
      returnYearToDate: 3,
      returnInceptionToDate: 4,
      averageMonth: 5,
      bestMonth: 6,
      worstMonth: 7,
      positiveMonth: 8,
      lenghtOfTrackRecord: 9,
    },
    strategy: [
      {
        id: 1,
        tokenName: '',
        icon: '',
        data: [
          {
            id: 1,
            date: new Date(),
            value: 25,
          },
        ],
      },
    ],
  },
};
