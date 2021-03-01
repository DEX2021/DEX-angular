var web3 = require('web3')

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";

export const EVM_REVERT = "VM Exception while processing transaction: revert";

export const fromWei = (n) => {
  return web3.utils.fromWei(n.toString(), "ether");
};

export const toEther = (n) => {
  return web3.utils.toWei(n.toString(), "ether");
};


// Same as ether
export const tokens = (n) => toEther(n);

export const formatBalance = (balance) => {
  const precision = 100; // 2 decimal places

  balance = fromWei(balance);
  balance = Math.round(balance * precision) / precision; // Use 2 decimal places

  return balance;
};

export const formatBalanceToEther = (balance) => {
  const precision = 100; // 2 decimal places

  balance = toEther(balance);
  balance = Math.round(balance * precision) / precision; // Use 2 decimal places

  return balance;
};


export const DECIMALS = (10 ** 18);

export const RED = 'danger';
export const GREEN = 'success';

export const ether = (wei) => {
  if (wei) {
    return (wei / DECIMALS);
  }
}

export const tokens2 = ether;