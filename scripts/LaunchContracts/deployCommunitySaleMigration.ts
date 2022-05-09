import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "../helpers";
import { constants } from "../constants";

async function main() {
  const nttContractAddress = readContractAddress("/NTT.json");

  const CommunitySaleMigrationFact = await ethers.getContractFactory(
    "CommunitySaleMigration"
  );
  const communitySaleMigration = await CommunitySaleMigrationFact.deploy(
    nttContractAddress
  );

  await communitySaleMigration.deployed();

  console.log(
    "communitySale Migration contract address:",
    communitySaleMigration.address
  );

  saveFrontendFiles(communitySaleMigration, "CommunitySaleMigration");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
