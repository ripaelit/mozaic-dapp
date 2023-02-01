import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';

export default function useSwitchNetwork(networkData: any) {

  const { library } = useWeb3React();

  const switchNetwork = async (networkData: any) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkData.chainID }],
      });
    } catch (switchError: any) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: networkData.chainID,
                rpcUrls: [networkData.upcUrls],
                chainName: networkData.name,
                nativeCurrency: { name: networkData.nativeCurrency.name, decimals: networkData.nativeCurrency.decimals, symbol: networkData.nativeCurrency.symbol },
                blockExplorerUrls: [networkData.blockExplorerUrls],
                iconUrls: [networkData.icon]
              }
            ],
          });
        } catch (error) {
           console.error(error)
        }
      }
    }
  };

  useEffect(() => {
    switchNetwork(networkData)
  }, [networkData]);
  


}
