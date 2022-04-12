import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "./helpers";
import { constants } from "./constants";

async function main() {

  const [deployer] = await ethers.getSigners();

  const nttContractAddress = readContractAddress("/NTT.json");

  const marketingManagementAddress = readContractAddress("/MarketingManagement.json");

  const nttContractFact = await ethers.getContractFactory("NTT");
  const nttContract = await nttContractFact.attach(nttContractAddress);

  await nttContract.mint(
      marketingManagementAddress,
      constants.marketingNttSupply, {
        gasPrice: 100000000000
      })

  console.log("ntt minted to: ", marketingManagementAddress);

  await nttContract.approveAddressForTransfer(marketingManagementAddress, {
    gasPrice: 100000000000
  });

  console.log("marketing management contract address approved: ");

  const MarketingManagementFact = await ethers.getContractFactory(
      "MarketingManagement"
  );
  const MarketingManagementContract = await MarketingManagementFact.attach(marketingManagementAddress);

  await MarketingManagementContract.approveManagerAllowance(deployer.address, "500000000000000000000000", {
    gasPrice: 100000000000,
  });
  console.log("deployer has been provided allowances: ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
