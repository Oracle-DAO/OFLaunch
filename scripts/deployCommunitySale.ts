import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "./helpers";
import { constants } from "./constants";

async function main() {
  const nttContractAddress = readContractAddress("/NTT.json");


  const startTime = Math.round(Date.UTC(2022, 4, 5, 17, 0, 0) / 1000);
  const endTime = Math.round(Date.UTC(2022, 4, 6, 17, 0, 0) / 1000);

  const CommunitySaleOFFact = await ethers.getContractFactory(
    "CommunitySaleOF"
  );
  const communitySaleOF = await CommunitySaleOFFact.deploy(
    nttContractAddress,
    constants.usdtMainnetAddress,
    constants.tokenPrice,
    constants.amountToRaise,
    constants.totalTokenSupply,
    constants.maxTokenPerUser,
    startTime,
    endTime
  );

  await communitySaleOF.deployed();

  console.log("communitySaleOF contract address:", communitySaleOF.address);

  saveFrontendFiles(communitySaleOF, "CommunitySaleOF");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
