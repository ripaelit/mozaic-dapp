import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { ZERO_ADDRESS, web3BNToFloatString } from '../utils/web3BNToFloatString';
import { getERC20Contract } from '../store/contractStore';
import BigNumber from 'bignumber.js';
import BN from 'bn.js';

export default function useBalance(tokenAddress: any, decimals: any) {
  // initial balance
  const [balance, setBalance] = useState('0');

  const { account, library } = useWeb3React();

  useEffect(() => {
    let isCancelled = false;

    function getBalance() {
      return new Promise((resolve) => {
        if (!library || !tokenAddress) {
          resolve(new BN('0'));
          return;
        }

        try {
          if (tokenAddress === ZERO_ADDRESS) {
            library.eth
              .getBalance(account)
              .then((value: any) => {
                resolve(new BN(value));
              })
              .catch((error: any) => {
                console.log(error);
                resolve(new BN('0'));
              });
          } else {
            const contract = getERC20Contract(tokenAddress, library);
            contract?.methods
              .balanceOf(account)
              .call()
              .then((value: any) => {
                resolve(new BN(value));
              })
              .catch((error: any) => {
                console.log(error);
                resolve(new BN('0'));
              });
          }
        } catch (error) {
          resolve(new BN('0'));
        }
      });
    }

    async function run() {
      const bn = await getBalance();

      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals));
        setBalance(web3BNToFloatString(bn, pow, 4, BigNumber.ROUND_DOWN));
      }
    }

    run();

    return () => {
      isCancelled = true;
    };
  }, [tokenAddress, library, decimals, account]);

  return [balance];
}
