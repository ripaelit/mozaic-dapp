// nav item types

export type NavItemType = {
  id: any;
  name: string;
  path: string;
};

export type MenuItemType = {
  id: any;
  name: string;
  path?: string;
  icon: string;
  newWindow?: boolean;
  link?: boolean;
};

// loader error types

export type LoadErrorType = {
  message: string;
  status: number;
  code: string;
};

// modal button types

export enum ModalBtnType {
  default = 'default',
  disabled = 'disabled',
  warning = 'warning',
  inProgress = 'inProgress',
}

export type DefaultBtnType = {
  text: string;
  icon?: string;
  type?: string;
  onClick: undefined | React.MouseEventHandler<HTMLDivElement>;
};

// wallet item types

export type WalletItemType = {
  id: any;
  name: string;
  icon: string;
};

export type NetworkItemType = {
  id: any;
  chainID: number | null;
  name: string;
  icon: string;
};

export type TabItem = { id: any; name: string; shortName?: string; value?: any };
