require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/C1vcX7j4TCfrK_F5cyaxi1gN6W6Y48hX",
      accounts: ["01a259afd2d8c23a8a667d9817edd5b63d10b6ab9a4eaf0e9d105d6ca28aae30"]
    }
  }
};
