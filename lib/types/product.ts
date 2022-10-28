type vault = {
  id: any;
  name: string;
  icon: string;
};

export interface ProductType {
  id: any;
  name: string;
  vault: vault[];
  apy: number;
  max_cap: number;
  curr_dep: number;
  price_change?: number;
  position: number;
  currency: string;
}
