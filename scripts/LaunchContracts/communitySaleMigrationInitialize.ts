import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "../helpers";
import { constants } from "../constants";

async function main() {
  const [deployer] = await ethers.getSigners();

  const nttContractAddress = readContractAddress("/NTT.json");

  const communitySaleMigrationAddress = readContractAddress(
    "/CommunitySaleMigration.json"
  );

  const nttContractFact = await ethers.getContractFactory("NTT");
  const nttContract = await nttContractFact.attach(nttContractAddress);

  await nttContract.mint(communitySaleMigrationAddress, constants.totalCommunitySupply);

  console.log("ntt minted to: ", communitySaleMigrationAddress);

  await nttContract.approveAddressForTransfer(communitySaleMigrationAddress);

  console.log("community Sale migration contract address approved: ");

  const CommunitySaleMigrationFact = await ethers.getContractFactory(
    "CommunitySaleMigration"
  );
  const communitySaleMigrationContract = await CommunitySaleMigrationFact.attach(
      communitySaleMigrationAddress
  );

  await communitySaleMigrationContract.approveManagerAllowance(
    deployer.address,
    "100000000000000000000000",
  );
  console.log("deployer has been provided allowances: ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
