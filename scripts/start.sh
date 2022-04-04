#!/bin/bash

npx hardhat run deployNTT.ts --network oasis_mainnet &&
npx hardhat run deployCommunitySale.ts --network oasis_mainnet &&
npx hardhat run communityInitialize.ts --network oasis_mainnet