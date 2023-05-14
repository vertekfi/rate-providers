import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';

dotenv.config();

const accounts = process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  //  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      forking: {
        url: process.env.BSC_RPC || '',
        blockNumber: 25894014,
      },
    },
    goerli: {
      url: process.env.GOERLI_RPC || '',
      accounts,
    },
    bsc: {
      url: process.env.BSC_RPC || '',
      accounts,
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC || '',
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
