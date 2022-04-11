import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "./helpers";
import { constants } from "./constants";

async function main() {
  const nttContractAddress = readContractAddress("/NTT.json");

  const MarketingManagementFact = await ethers.getContractFactory("MarketingManagement");
  const marketingManagementContract = await MarketingManagementFact.deploy(nttContractAddress);

  await marketingManagementContract.deployed();

  console.log("marketing Management contract address:", marketingManagementContract.address);

  saveFrontendFiles(marketingManagementContract, "MarketingManagement");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
