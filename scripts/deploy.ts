import { ethers } from 'hardhat';

async function main() {
  // BAL's current rate from explorer 5/14 4:15PM
  const rate = '1004670559319783586';
  const ethDecimals = 18;
  const TestChainlinkRateProvider = await ethers.getContractFactory('TestChainlinkRateProvider');
  const rateProvider = await TestChainlinkRateProvider.deploy(rate, ethDecimals);
  await rateProvider.deployed();

  console.log(`TestChainlinkRateProvider deployed to: ${rateProvider.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
