import ERC20ABI from './assets/abi-erc20.json';
import SecondaryVaultABI from './assets/abi-SecondaryVault.json';
import Web3 from 'web3';
import { chains } from '../data/static/wallet';

export function getWeb3(chainName: string) {
  const chain = chains.find(obj => obj.name == chainName)
  if (!chain) {
    return null;
  }
  const web3Provider = new Web3.providers.HttpProvider(chain!.rpcUrls);
  const web3 = new Web3(web3Provider);
  return web3;
}

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