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
