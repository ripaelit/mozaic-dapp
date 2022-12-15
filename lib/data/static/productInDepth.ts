export const knowledgeBaseData = [
  {
    id: 0,
    title: 'Fee Structure',
    description:
      'The vault fee consists of a 1% withdrawal fee and a 10% performance fee. The performance fee is charged based on the assets managed by the vault. If the strategy is profitable, the performance fee is charged on the premium when withdrawing; however, if the strategy is unprofitable, there are no fees charged.',
  },
  {
    id: 1,
    title: 'Vault Strategy',
    description:
      'The vault gives users exposure to a specific category of tokens. Every hour the vault calculates if it should re-balance the portfolio according to our modelling system and then rotates the tokens to the highest rewarding protocol to farm with.',
  },
];

export const productChartOption = [];

// token Details

export const tokenDetailsTableItems = [
  {
    id: 0,
    name: 'Asset Name',
    sortable: true,
    className: 'asset-name',
  },
  {
    id: 1,
    name: 'Allocation',
    sortable: true,
    className: 'allocation',
  },
  {
    id: 2,
    name: 'APY',
    sortable: true,
    className: 'apy',
  },
  {
    id: 3,
    name: 'Strategy',
    sortable: false,
    className: 'strategy',
  },
];

export const strategies = [
  {
    id: 0,
    name: 'None',
    icon: '/assets/icons/products/productInDepth/ico.none.svg',
    className: 'none',
  },
  {
    id: 1,
    name: 'Lending',
    icon: '/assets/icons/products/productInDepth/ico.lending.svg',
    className: 'lending',
  },
  {
    id: 2,
    name: 'Staking',
    icon: '/assets/icons/products/productInDepth/ico.staking.svg',
    className: 'staking',
  },
];

//
export const sortByTimelineTabItems = [
  {
    id: 0,
    name: '1D',
    value: '1d',
  },
  {
    id: 1,
    name: '1W',
    value: '1w',
  },
  {
    id: 2,
    name: '1M',
    value: '1mo',
  },
  {
    id: 3,
    name: '3M',
    value: '3mo',
  },
  {
    id: 4,
    name: '6M',
    value: '6mo',
  },
  {
    id: 5,
    name: 'YTD',
    value: 'ytd',
  },
];
