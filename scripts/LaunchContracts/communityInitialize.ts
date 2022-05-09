import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "../helpers";
// eslint-disable-next-line node/no-missing-import
import { constants } from "../constants";

async function main() {
  const nttContractAddress = readContractAddress("/NTT.json");
  const communitySaleOFContractAddress = readContractAddress(
    "/CommunitySaleOF.json"
  );

  const nttContractFact = await ethers.getContractFactory("NTT");
  const nttContract = await nttContractFact.attach(nttContractAddress);

  await nttContract.mint(
    communitySaleOFContractAddress,
    constants.totalCommunitySupply,
    {
      gasPrice: 50000000000,
    }
  );

  console.log("ntt minted to: ", communitySaleOFContractAddress);

  await nttContract.approveAddressForTransfer(communitySaleOFContractAddress, {
    gasPrice: 50000000000,
  });

  console.log("community sale contract address approved: ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
