import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import NFTImage from "./NFTImage";
import NftGang from "../artifacts/contracts/MyNFT.sol/NftGang.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get the end user
const signer = provider.getSigner();

// Get the smart contract
const contract = new ethers.Contract(contractAddress, NftGang.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, [totalMinted]);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };
  console.log("🚀 ~ file: Home.js ~ line 25 ~ getCount ~ Array(totalMinted + 1)", Array(totalMinted + 1));

  return (
    <div>
      <p>This is the Home page</p>
      <WalletBalance />
      <br />
      <div>
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage tokenId={i} getCount={getCount} contractAddress={contractAddress} provider={provider} signer={signer} contract={contract} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
