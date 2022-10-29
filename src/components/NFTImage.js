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
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={isMinted ? imageURI : "../../public/logo192.png"} alt="test"></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
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
  );
};

export default NFTImage;
