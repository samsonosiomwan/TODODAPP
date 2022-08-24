import { useState } from "react";
import { rinkebyChainId } from "../  config";


export const useMetamask = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [currentNetwork, setCorrectNetwork] = useState(false);

    const connectWallet = async()=>{
        try{
          const {ethereum}:any = window;
          if(!ethereum){
            console.log("Cannot not detect metamask");
          }
    
          let chainId = await ethereum.request({method:"eth_chainId"});
          console.log("Connected to chain:" + chainId)
    
        
    
          if(chainId !== rinkebyChainId){
            alert("conection to rinkeby failed");
            return;
          }else{
            setCorrectNetwork(true)
          }
    
          const accounts = await ethereum.request({method: "eth_requestAccounts"});
          console.log("account detected",accounts[0]);
          setCurrentAccount(accounts[0])
          
        }catch(error){
          console.log('Error connecting to metamask', error)
        }
      }

      return{
        currentNetwork,
        currentAccount,
        connectWallet

      }
    
}