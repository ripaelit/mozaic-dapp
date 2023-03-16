import { NetworkItemType, ChainDataType, WalletItemType } from '../../types/common';

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

export const chains: ChainDataType[] = [
  // mainnet
  // {
  //   id: 0,
  //   chainID: 1,
  //   name: 'Ethereum Mainnet',
  //   icon: '/assets/icons/wallet/networks/ico.eth.svg',
  // },
  // {
  //   id: 1,
  //   chainID: 56,
  //   name: 'Binance Smart Chain Mainnet',
  //   icon: '/assets/icons/wallet/networks/ico.bsc.svg',
  // },
  // {
  //   id: 2,
  //   chainID: 10,
  //   name: 'Optimism',
  //   icon: '/assets/icons/wallet/networks/ico.op.svg',
  // },
  // {
  //   id: 3,
  //   chainID: 43114,
  //   name: 'Avalanche C-Chain',
  //   icon: '/assets/icons/wallet/networks/ico.avax.svg',
  // },
  // {
  //   id: 4,
  //   chainID: 250,
  //   name: 'Fantom Opera',
  //   icon: '/assets/icons/wallet/networks/ico.ftm.svg',
  // },
  // {
  //   id: 5,
  //   chainID: 137,
  //   name: 'Polygon Mainnet',
  //   icon: '/assets/icons/wallet/networks/ico.matic.svg',
  // },
  // {
  //   id: 6,
  //   chainID: 42161,
  //   name: 'Arbitrum One',
  //   icon: '/assets/icons/wallet/networks/ico.arb.svg',
  // },

  // testnet
  // BSC testnet
  {
    id: 0,
    chainID: 97, // from chainlist
    rpcUrls: 'https://endpoints.omniatech.io/v1/bsc/testnet/public',
    name: 'BSC Testnet',
    nativeCurrency: {
      name: 'tBNB',
      decimals: 18,
      symbol: 'tBNB',
    },
    icon: '/assets/icons/wallet/networks/ico.bsc.svg',
  },
  {
    id: 1,
    chainID: 4002, // from chainlist
    rpcUrls: 'https://rpc.testnet.fantom.network',
    name: 'Fantom Testnet',
    nativeCurrency: {
      name: 'FTM',
      decimals: 18,
      symbol: 'FTM',
    },
    icon: '/assets/icons/wallet/networks/ico.ftm.svg',
  },
  // Goerli
  // {
  //   id: 1,
  //   chainID: 5, // from chainlist
  //   rpcUrls: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  //   name: 'Goerli',
  //   nativeCurrency: {
  //     name: 'ETH',
  //     decimals: 18,
  //     symbol: 'ETH',
  //   },
  //   icon: '/assets/icons/wallet/networks/ico.eth.svg',
  // },
  // Fuji (Avalanche testnet)
  // {
  //   id: 2,
  //   chainID: 43113, // from chainlist
  //   rpcUrls: 'https://api.avax-test.network/ext/bc/C/rpc',
  //   name: 'Fuji',
  //   nativeCurrency: {
  //     name: 'AVAX',
  //     decimals: 18,
  //     symbol: 'AVAX',
  //   },
  //   icon: '/assets/icons/wallet/networks/ico.avax.svg',
  // },
  // Optimism (Optimism Goerli Testnet)
  // {
  //   id: 3,
  //   chainID: 420, // from chainlist
  //   rpcUrls: 'https://opt-goerli.g.alchemy.com/v2/VvDMoNPGL63OALxGv9KaoQ1xf4_kr5br',
  //   name: 'Optimism Goerli Testnet',
  //   nativeCurrency: {
  //     name: 'ETH',
  //     decimals: 18,
  //     symbol: 'ETH',
  //   },
  //   icon: '/assets/icons/wallet/networks/ico.op.svg',
  // },
  // Mumbai (Polygon testnet)
  // {
  //   id: 4,
  //   chainID: 80001, // from chainlist
  //   rpcUrls: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  //   name: 'Mumbai',
  //   nativeCurrency: {
  //     name: 'MATIC',
  //     decimals: 18,
  //     symbol: 'MATIC',
  //   },
  //   icon: '/assets/icons/wallet/networks/ico.matic.svg',
  // },
  // Fantom (Testnet)
  // Arbitrum (Arbitrum Goerli)
  // {
  //   id: 6,
  //   chainID: 421613, // from chainlist
  //   rpcUrls: 'https://endpoints.omniatech.io/v1/arbitrum/goerli/public',
  //   name: 'Arbitrum Goerli',
  //   nativeCurrency: {
  //     name: 'AGOR',
  //     decimals: 18,
  //     symbol: 'AGOR',
  //   },
  //   icon: '/assets/icons/wallet/networks/ico.arb.svg',
  // },
];
