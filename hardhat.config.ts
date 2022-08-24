import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url: `${process.env.ALCHEMY_URL}`,
      accounts:[`${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;
