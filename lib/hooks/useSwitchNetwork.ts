 const switchNetwork = async (networkData: any) => {
  console.log('debug', networkData)
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkData.chainID }],
    });
  } catch (switchError: any) {
    // 4902 error code indicates the chain is missing on the wallet
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
              blockExplorerUrls: [networkData.blockExplorerUrls],
              iconUrls: [networkData.icon]
            }
          ],
        });
      } catch (error) {
        //  console.log(error)
      }
    }
  }
}

export default switchNetwork
