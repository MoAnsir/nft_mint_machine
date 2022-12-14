import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import NFTImage from "./NFTImage";
import NftGang from "../artifacts/contracts/MyNFT.sol/NftGang.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // You can get this when you start hardhat
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get the end user
const signer = provider.getSigner();

// Get the smart contract
const contract = new ethers.Contract(contractAddress, NftGang.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  console.log("🚀 ~ file: Home.js ~ line 19 ~ Home ~ totalMinted", totalMinted);

  useEffect(() => {
    getCount();
  }, [totalMinted]);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap m-4">
        <WalletBalance />
      </div>
      <br />
      <div className="flex flex-wrap">
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={"home" + i} className={i}>
              <NFTImage tokenId={i} getCount={getCount} contractAddress={contractAddress} provider={provider} signer={signer} contract={contract} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
