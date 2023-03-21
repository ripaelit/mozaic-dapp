import ERC20ABI from './assets/abi-erc20.json';
import SecondaryVaultABI from './assets/abi-SecondaryVault.json';

export function getERC20Contract(tokenAddress: any, web3: any) {
  return web3
    ? new web3.eth.Contract(ERC20ABI, tokenAddress, {
        from: web3.eth.defaultAccount,
      })
    : null;
}

export function getSecondaryVaultContract(tokenAddress: any, web3: any) {
  return web3
    ? new web3.eth.Contract(SecondaryVaultABI, tokenAddress, {
        from: web3.eth.defaultAccount,
      })
    : null;
}