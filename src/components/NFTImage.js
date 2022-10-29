import { ethers } from "ethers";

import React, { useEffect, useState } from "react";

const NFTImage = ({ tokenId, getCount, contractAddress, provider, signer, contract }) => {
  const contentId = "Qmechv1kde4hkctCAn5QdRo3JxA4SBxo11rcKQEnJ9Somd";
  const metaDataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metaDataURI);
    console.log("getMintedStatus - ", result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metaDataURI, { value: ethers.utils.parseEther("0.05") });
    await result.wait();
    getMintedStatus();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }

  return (
    <div className="card w-96 bg-slate-50 shadow-xl m-4">
      <figure>
        <img className="h-64 mt-4" src={isMinted ? imageURI : "/nft-placeholder.png"} alt="test"></img>
      </figure>
      <div className="card-body bg-slate-50">
        <h5 className="card-title">ID #{tokenId}</h5>
        <div className="card-actions justify-end">
          {!isMinted ? (
            <button className="btn btn-primary" onClick={mintToken}>
              Mint
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={getURI}>
              Show Taken URI
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTImage;
