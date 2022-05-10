import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "../helpers";
import fs from "fs";

import csv from "csv-parser";

async function main() {
  const CommunitySaleMigration = readContractAddress(
    "/CommunitySaleMigration.json"
  );

  const CommunitySaleMigrationFact = await ethers.getContractFactory(
    "CommunitySaleMigration"
  );
  const CommunitySaleMigrationContract = await CommunitySaleMigrationFact.attach(
      CommunitySaleMigration
  );

  console.log(
    "Token address of CommunitySaleMigrationContract:",
      CommunitySaleMigrationContract.address
  );

  type airdrop = {
    address: string;
    amount: string;
  };
  const airdropList: airdrop[] = [];

  fs.createReadStream("scripts/data/airdrop.csv")
    .pipe(csv())
    .on("data", async (row: any) => {
      airdropList.push(row);
    })
    .on("end", async () => {
      for (let i = 0; i < airdropList.length; i++) {
        await CommunitySaleMigrationContract.transferNTT(
          airdropList[i].address,
          airdropList[i].amount
        );
        console.log(
          "Airdropped completed for: ",
          airdropList[i].address,
          airdropList[i].amount
        );
      }
      console.log("CSV file successfully processed");
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
