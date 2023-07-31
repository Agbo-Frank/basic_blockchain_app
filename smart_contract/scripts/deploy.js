const hre = require("hardhat");

async function main() {
  const transactions = await hre.ethers.deployContract("Transactions");

  await transactions.waitForDeployment();

  console.log("Transaction deployed to:", transactions.target, await transactions.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
