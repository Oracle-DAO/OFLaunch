import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "../helpers";
// eslint-disable-next-line node/no-missing-import
import { constants } from "../constants";

async function main() {
  const PublicPresaleOFContractAddress = readContractAddress(
    "/PublicPresaleOF.json"
  );

  const PublicPresaleOF = await ethers.getContractFactory(
    "PublicPresaleOF"
  );
  const publicPresaleOFContract = await PublicPresaleOF.attach(
    PublicPresaleOFContractAddress
  );

  await publicPresaleOFContract.withdrawRaisedAmount({
    gasPrice: 100000000000,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
