#!/bin/bash

npx hardhat run deployNTT.ts --network localhost &&
npx hardhat run deployCommunitySale.ts --network localhost &&
npx hardhat run communityInitialize.ts --network localhost