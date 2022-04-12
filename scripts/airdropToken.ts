import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "./helpers";
import fs from "fs";

import csv from "csv-parser";

async function main() {
  const MarketingManagementAdd = readContractAddress("/MarketingManagement.json");

  const MarketingManagementFact = await ethers.getContractFactory(
    "MarketingManagement"
  );
  const MarketingManagementContract = await MarketingManagementFact.attach(MarketingManagementAdd);

  console.log("Token address of MarketingManagementContract:", MarketingManagementContract.address);

  type airdrop = {
    address: string;
    amount: string;
  }
  let airdropList: airdrop[] = [];

  fs.createReadStream("scripts/data/airdrop.csv")
    .pipe(csv())
    .on("data", async (row: any) => {
      airdropList.push(row);
    })
    .on("end", async () => {
      for (let i = 0; i < airdropList.length; i++) {
        console.log(airdropList[i].address, airdropList[i].amount);
        await MarketingManagementContract.transferNTT(airdropList[i].address, airdropList[i].amount, {
          gasPrice: 100000000000,
        });
        console.log("Airdropped completed for: ", airdropList[i].address);
      }
      console.log("CSV file successfully processed");
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
