import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { constants } from "../scripts/constants";

describe("Public Presale", function () {
  let projectToken: Contract,
    stableCoin: string,
    nttContract: Contract,
    deployer: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress,
    user3: SignerWithAddress,
    publicPresaleOF: Contract;

  // before(async () => {
  //   [deployer, user1, user2, user3] = await ethers.getSigners();
  //
  //   const nttContractFact = await ethers.getContractFactory("NTT");
  //   nttContract = await nttContractFact.deploy();
  //
  //   await nttContract.deployed();
  //
  //   console.log("ntt contract address:", nttContract.address);
  //
  //   const startTime = Math.round(Date.UTC(2022, 3, 5, 17, 0, 0) / 1000);
  //   const endTime = Math.round(Date.UTC(2022, 3, 6, 17, 0, 0) / 1000);
  //
  //   const PublicPresaleOFFact = await ethers.getContractFactory(
  //     "PublicPresaleOF"
  //   );
  //
  //   publicPresaleOF = await PublicPresaleOFFact.deploy(
  //     nttContract.address,
  //     constants.usdtMainnetAddress,
  //     "125000",
  //     "5000000",
  //     "40000000000000000000",
  //     startTime,
  //     endTime,
  //     {
  //       gasPrice: 40000000000,
  //     }
  //   );
  //
  //   await publicPresaleOF.deployed();
  //
  //   console.log(
  //     "community sale contract address:",
  //     publicPresaleOF.address
  //   );
  // });

  it("Check Owner and Contract Status of Contract", async function () {
    const PublicPresaleOFFact = await ethers.getContractFactory(
      "PublicPresaleOF"
    );
    publicPresaleOF = await PublicPresaleOFFact.attach(
      "0x120D9C6a660B25A49783B68785Bc8EdD99Ffa5E5"
    );

    console.log(await publicPresaleOF.maxAllocation());
  });

  // it("Check reverts in participate", async function () {
  //   // expect(
  //   //   await communitySaleOFContract.whiteListedUser[user1.address]
  //   // ).to.equal(0);
  //
  //   // expect(
  //   //   await communitySaleOFContract.connect(user1).participate("0")
  //   // ).to.be.revertedWith("User is not whitelisted");
  //
  //   await communitySaleOFContract.whitelistUser(user1.address);
  //
  //   // expect(
  //   //   await communitySaleOFContract.connect(user1).participate("0")
  //   // ).to.be.revertedWith("invalid amount");
  //
  //   expect(
  //     await communitySaleOFContract.connect(user1).participate("200000")
  //   ).to.be.revertedWith("project not live");
  //
  //   await communitySaleOFContract.setTimeInfo(
  //     Math.round(Date.now() / 1000),
  //     Math.round(Date.now() / 1000) - 10
  //   );
  //
  //   expect(
  //     await communitySaleOFContract.connect(user1).participate("200000")
  //   ).to.be.revertedWith("project has ended");
  //
  //   await communitySaleOFContract.setTimeInfo(
  //     Math.round(Date.now() / 1000),
  //     Math.round(Date.now() / 1000) + 60 * 60
  //   );
  // });
});
