export default async function switchNetwork(networkData: any) {
  try {
    console.log('debug switch network', networkData)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkData.chainID }],
    });
  } catch (switchError: any) {
    // 4902 code indicates the chain is missing on the wallet
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: networkData.chainID,
              rpcUrls: [networkData.rpcUrls],
              chainName: networkData.name,
              nativeCurrency: { name: networkData.nativeCurrency.name, decimals: networkData.nativeCurrency.decimals, symbol: networkData.nativeCurrency.symbol },
              blockExplorerUrls: networkData.blockExplorerUrls? [networkData.blockExplorerUrls] : null,
              iconUrls: [networkData.icon]
            }
          ],
        });
      } catch (error) {
         console.log('debug adding network error', error)
      }
    }
  }
}

