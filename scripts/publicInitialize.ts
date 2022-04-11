import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { readContractAddress } from "./helpers";
// eslint-disable-next-line node/no-missing-import
import { constants } from "./constants";

async function main() {
    const nttContractAddress = readContractAddress("/NTT.json");
    const publicSaleOFContractAddress = "0x3aBEeB2DF13508a6C8294472DC41A2a3b378855C";

    const nttContractFact = await ethers.getContractFactory("NTT");
    const nttContract = await nttContractFact.attach(nttContractAddress);

    await nttContract.mint(
        publicSaleOFContractAddress,
        constants.totalPublicSaleTokenSupply, {
            gasPrice: 50000000000
        }
    );

    console.log("ntt minted to: ", publicSaleOFContractAddress);

    await nttContract.approveAddressForTransfer(publicSaleOFContractAddress, {
        gasPrice: 50000000000
    });

    console.log("public sale contract address approved: ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
