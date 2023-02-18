export default async function switchChain(chainData: any) {
  try {
    // console.log('debug switch Chain', chainData)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainData.chainID }],
    });
  } catch (switchError: any) {
    // 4902 code indicates the chain is missing on the wallet
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainData.chainID,
              rpcUrls: [chainData.rpcUrls],
              chainName: chainData.name,
              nativeCurrency: { name: chainData.nativeCurrency.name, decimals: chainData.nativeCurrency.decimals, symbol: chainData.nativeCurrency.symbol },
              blockExplorerUrls: chainData.blockExplorerUrls? [chainData.blockExplorerUrls] : null,
              iconUrls: [chainData.icon]
            }
          ],
        });
      } catch (error) {
        //  console.log('debug adding Chain error:', error)
      }
    }
  }
}

