import { ethers } from "ethers";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Table from "./Table";

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

  const handleClick = () => {
    // manually refetch
    refetch();
  };

  const getTraits = async () => {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${metaDataURI}`);
    return await res.json();
  };

  const { data, status, refetch } = useQuery("traits", getTraits, { enabled: false });

  return (
    <div className="card w-96 bg-slate-50 shadow-xl m-4">
      <figure>
        <img className="h-64 mt-4" src={isMinted ? imageURI : "/nft-placeholder.png"} alt="test"></img>
      </figure>
      <div className="card-body bg-slate-50">
        <h5 className="card-title">ID #{tokenId}</h5>
        <div className="card-actions justify-end">
          <p>{data.description}</p>
          {!isMinted ? (
            <button className="btn btn-primary" onClick={mintToken}>
              Mint
            </button>
          ) : (
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full" onClick={handleClick}>
              <div className="collapse-title text-xl font-medium">NFT Traits</div>
              <div className="collapse-content p-0">{data && <Table data={data} />}</div>
            </div>
          )}
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>Error</p>}
        </div>
      </div>
    </div>
  );
};

export default NFTImage;
