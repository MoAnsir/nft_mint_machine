require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-solhint");
// require("@nomiclabs/hardhat-waffle");
//require("@openzeppelin/contracts");

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./src/artifacts",
//   },
// };

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/artifacts",
  },
  etherscan: {
    apiKey: "622DJGRUD6SIW9TEFGJIPTPDP63V7QF5GA",
  },
};
