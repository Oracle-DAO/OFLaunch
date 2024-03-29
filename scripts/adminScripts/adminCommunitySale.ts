import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "../helpers";
// eslint-disable-next-line node/no-missing-import
import { constants } from "../constants";

async function main() {
  const communitySaleOFContractAddress = readContractAddress(
    "/CommunitySaleOF.json"
  );

  const CommunitySaleOFFact = await ethers.getContractFactory(
    "CommunitySaleOF"
  );
  const communitySaleOFContract = await CommunitySaleOFFact.attach(
    communitySaleOFContractAddress
  );

  await communitySaleOFContract.withdrawRaisedAmount({
    gasPrice: 100000000000,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
