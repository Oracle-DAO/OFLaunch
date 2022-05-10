import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { saveFrontendFiles } from "../helpers";

async function main() {
  const NttFact = await ethers.getContractFactory("NTT");
  const nttContract = await NttFact.deploy({
    gasPrice: 40000000000,
  });

  await nttContract.deployed();

  console.log("NTT contract address:", nttContract.address);

  saveFrontendFiles(nttContract, "NTT");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
