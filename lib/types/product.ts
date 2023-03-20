export type asset = {
  id: any;
  name: string;
  icon: string;
};

export interface ProductType {
  id: any;
  name: string;
  icon: string;
  color: string;
  vault: asset[];
  apy: number;
  tokenName: string;
  maxCap: number;
  currentDeposit: number;
  priceChange?: number;
  position: number | undefined;
}

export interface ProductDetailDataType {
  id: number;
  name: string;
  icon: string;
  color: string;
  balance: number;
  chart: Chart[];
  vault: AssetElement[];
  mozaicLp: AssetElement[];
  mainnet: string;
  summary: Summary[];
  details: Details;
}

export interface Chart {
  id: number;
  name: string;
  data: Array<number[]>;
}

export interface Details {
  tokenDetails: TokenDetail[];
  metricsDetails: MetricsDetailElement[];
  strategyDetails: Chart[];
}

export interface MetricsDetailElement {
  id: number;
  name: string;
  value?: number[] | number;
  icon: string;
}

export interface TokenDetail {
  id: number;
  name: string;
  icon: string;
  allocation: number;
  apy: number;
  strategy: number;
}

export interface Summary {
  id: number;
  name: string;
  icon: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface AssetElement {
  id: number;
  name: string;
  address: string;
  decimals: number;
  conversionRateUSD: number;
  conversionRate: number;
  assets?: AssetElement[];
  icon?: string;
}

export interface ChartDataType {
  id: any;
  name: string;
  data: number[][];
}
