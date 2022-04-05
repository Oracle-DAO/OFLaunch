import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "./helpers";
import fs from "fs";

import csv from "csv-parser";

async function main() {
  const communitySaleOFAdd = readContractAddress("/CommunitySaleOF.json");

  const CommunitySaleOFFact = await ethers.getContractFactory(
    "CommunitySaleOF"
  );
  const communitySaleOF = await CommunitySaleOFFact.attach(communitySaleOFAdd);

  console.log("Token address of communitySaleOF:", communitySaleOF.address);

  const csvData = [];

  const addressList: string[] = [];

  fs.createReadStream("scripts/data/whitelist.csv")
    .pipe(csv())
    .on("data", async (row: any) => {
      // console.log(row.address);
      addressList.push(row.address);
      // console.log(await communitySaleOF.getAmountInfo());
      // console.log("Whitelisted pushed to list", row);
    })
    .on("end", async () => {
      for (let i = 0; i < addressList.length; i++) {
        await communitySaleOF.whitelistUser(addressList[i], {
          gasPrice: 50000000000
        });
        console.log("Whitelisted completed for: ", addressList[i]);
      }
      console.log("CSV file successfully processed");
    });

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
