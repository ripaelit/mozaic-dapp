import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
  4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
};

// metamask
export const injected = new InjectedConnector(<any>{
  supportedChainIds: [5, 420, 97, 43113, 4002, 80001, 421613],
});

// walletconnect
export const walletconnect: any = new WalletConnectConnector(<any>{
  rpc: {
    1: RPC_URLS[1],
    4: RPC_URLS[4],
  },
  qrcode: true,
  pollingInterval: 15000,
});

export function resetWalletConnector(connector: any) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

