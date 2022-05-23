import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress, saveFrontendFiles } from "../helpers";
// eslint-disable-next-line node/no-missing-import
import { constants } from "../constants";

async function main() {
  const nttContractAddress = readContractAddress("/NTT.json");

  const startTime = Math.round(Date.UTC(2022, 4, 25, 17, 0, 0) / 1000);
  const endTime = Math.round(Date.UTC(2022, 4, 26, 17, 0, 0) / 1000);
  console.log(startTime);
  console.log(endTime);
  const PublicPresaleOF = await ethers.getContractFactory("PublicPresaleOF");
  const constructor_args = [
    nttContractAddress,
    constants.usdtMainnetAddress,
    constants.tokenPriceInPublicPresale,
    constants.amountToRaiseForPublicPresale,
    constants.totalPublicPresaleSupply,
    startTime,
    endTime]
  console.log(constructor_args);
  const publicPresaleOF = await PublicPresaleOF.deploy(
    nttContractAddress,
    constants.usdtMainnetAddress,
    constants.tokenPriceInPublicPresale,
    constants.amountToRaiseForPublicPresale,
    constants.totalPublicPresaleSupply,
    startTime,
    endTime,
    {
      gasPrice: 100000000000,
    }
  );

  await publicPresaleOF.deployed();

  console.log("publicPresaleOF contract address:", publicPresaleOF.address);

  saveFrontendFiles(publicPresaleOF, "PublicPresaleOF");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
