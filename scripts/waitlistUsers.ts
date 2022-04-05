import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "./helpers";
import csv from "csv-parser";

import fs from "fs";

async function main() {
  const communitySaleOFAdd = readContractAddress("/CommunitySaleOF.json");

  const CommunitySaleOFFact = await ethers.getContractFactory(
    "CommunitySaleOF"
  );
  const communitySaleOF = await CommunitySaleOFFact.attach(communitySaleOFAdd);

  console.log("Token address of communitySaleOF:", communitySaleOF.address);

  fs.createReadStream("/data/waitlist.csv")
    .pipe(csv())
    .on("data", async (row: string) => {
      await communitySaleOF.waitlistUser(row);
      console.log("waitlisting completed for:", row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
