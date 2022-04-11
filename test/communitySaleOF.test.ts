// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { Contract } from "ethers";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { constants } from "../scripts/constants";
//
// describe("Greeter", function () {
//   let projectToken: Contract,
//     stableCoin: string,
//     nttContract: Contract,
//     deployer: SignerWithAddress,
//     user1: SignerWithAddress,
//     user2: SignerWithAddress,
//     user3: SignerWithAddress,
//     communitySaleOFContract: Contract;
//
//   before(async () => {
//     [deployer, user1, user2, user3] = await ethers.getSigners();
//
//     const nttContractFact = await ethers.getContractFactory("NTT");
//     nttContract = await nttContractFact.deploy();
//
//     await nttContract.deployed();
//
//     console.log("ntt contract address:", nttContract.address);
//
//     const startTime = Math.round(Date.UTC(2022, 3, 5, 17, 0, 0) / 1000);
//     const endTime = Math.round(Date.UTC(2022, 3, 6, 17, 0, 0) / 1000);
//
//     const communitySaleOFFact = await ethers.getContractFactory(
//       "CommunitySaleOF"
//     );
//
//     communitySaleOFContract = await communitySaleOFFact.deploy(
//       nttContract.address,
//       constants.usdtMainnetAddress,
//       "100000", // 1e5
//       "4000000", // 4 * 1e6
//       "40000000000000000000", // 4 * 1e19
//       "10000000000000000000", // 1e19
//       startTime,
//       endTime,
//       {
//         gasPrice: 50000000000,
//       }
//     );
//
//     await communitySaleOFContract.deployed();
//
//     console.log(
//       "community sale contract address:",
//       communitySaleOFContract.address
//     );
//   });
//
//   it("Check Owner and Contract Status of Contract", async function () {
//     expect(await communitySaleOFContract.owner()).to.equal(deployer.address);
//     expect(await communitySaleOFContract.contractStatus()).to.equal(true);
//   });
//
//   it("Check reverts in participate", async function () {
//     // expect(
//     //   await communitySaleOFContract.whiteListedUser[user1.address]
//     // ).to.equal(0);
//
//     // expect(
//     //   await communitySaleOFContract.connect(user1).participate("0")
//     // ).to.be.revertedWith("User is not whitelisted");
//
//     await communitySaleOFContract.whitelistUser(user1.address);
//
//     // expect(
//     //   await communitySaleOFContract.connect(user1).participate("0")
//     // ).to.be.revertedWith("invalid amount");
//
//     expect(
//       await communitySaleOFContract.connect(user1).participate("200000")
//     ).to.be.revertedWith("project not live");
//
//     await communitySaleOFContract.setTimeInfo(
//       Math.round(Date.now() / 1000),
//       Math.round(Date.now() / 1000) - 10
//     );
//
//     expect(
//       await communitySaleOFContract.connect(user1).participate("200000")
//     ).to.be.revertedWith("project has ended");
//
//     await communitySaleOFContract.setTimeInfo(
//       Math.round(Date.now() / 1000),
//       Math.round(Date.now() / 1000) + 60 * 60
//     );
//   });
// });
