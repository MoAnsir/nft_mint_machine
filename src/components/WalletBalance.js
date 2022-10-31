import React, { useState } from "react";
import { ethers } from "ethers";

const WalletBalance = () => {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div>
      <p className="py-2">Your wallet balance {balance}</p>
      <button className="btn btn-primary" onClick={() => getBalance()}>
        Check Balance
      </button>
    </div>
  );
};

export default WalletBalance;
