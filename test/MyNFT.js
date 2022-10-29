const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("should min and transfer an NFT to someone", async function () {
    const NftGang = await ethers.getContractFactory("NftGang");
    const nftGang = await NftGang.deploy();
    await nftGang.deployed();

    const recipient = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const metadataURI = "cid/test.png";

    let balance = await nftGang.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await nftGang.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await newlyMintedToken.wait();
    balance = await nftGang.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await nftGang.isContentOwned(metadataURI)).to.equal(true);
  });
});
