import { NetworkItemType, WalletItemType } from '../../types/common';

export const wallets: WalletItemType[] = [
  {
    id: 0,
    name: 'Metamask',
    icon: '/assets/icons/wallet/ico.wallet.metamask.svg',
  },
  {
    id: 1,
    name: 'Wallet Connect',
    icon: '/assets/icons/wallet/ico.wallet.walletconnect.svg',
  },
];

export const networkIdleStates: NetworkItemType[] = [
  {
    id: 0,
    chainID: null,
    name: 'Connect Wallet',
    icon: '/assets/icons/menu/button/ico.addWallet.svg',
  },
  {
    id: 1,
    chainID: null,
    name: 'Connecting...',
    icon: '/assets/icons/menu/button/ico.inprogress.svg',
  },
];

export const networks: NetworkItemType[] = [
  {
    id: 0,
    chainID: 1,
    name: 'Ethereum Mainnet',
    icon: '/assets/icons/wallet/networks/ico.eth.svg',
  },
  {
    id: 1,
    chainID: 56,
    name: 'Binance Smart Chain Mainnet',
    icon: '/assets/icons/wallet/networks/ico.bsc.svg',
  },
  {
    id: 2,
    chainID: 10,
    name: 'Optimism',
    icon: '/assets/icons/wallet/networks/ico.op.svg',
  },
  {
    id: 3,
    chainID: 43114,
    name: 'Avalanche C-Chain',
    icon: '/assets/icons/wallet/networks/ico.avax.svg',
  },
  {
    id: 4,
    chainID: 250,
    name: 'Fantom Opera',
    icon: '/assets/icons/wallet/networks/ico.ftm.svg',
  },
  {
    id: 5,
    chainID: 137,
    name: 'Polygon Mainnet',
    icon: '/assets/icons/wallet/networks/ico.matic.svg',
  },
  {
    id: 6,
    chainID: 42161,
    name: 'Arbitrum One',
    icon: '/assets/icons/wallet/networks/ico.arb.svg',
  },
];
