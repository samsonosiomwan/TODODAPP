import {ethers} from 'hardhat';

async function main(){
    const Todos =  await ethers.getContractFactory("Todo");
    const todos = await Todos.deploy();

    await todos.deployed();
    console.log("Contract deployed to: " ,todos.address);
}


main().catch((error)=>{
  console.log(error);
  process.exitCode = 1;
})


// contract address : 0xfe6e5551e7e0a834Be30C94F4a09BA419D2f6d25