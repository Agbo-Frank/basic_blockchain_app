import { ethers } from "ethers";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/constant";
import { ITransactionContext } from "./interface";


export const TransactionContext = createContext<Partial<ITransactionContext>>({})
//@ts-ignore
const { ethereum } = window

function getEthContract(){
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const TransactionContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
    console.log(provider, signer, TransactionContract)
}

function TransactionProvider({ children }: PropsWithChildren) {
    const [account, setAccount] = useState("");
    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
          console.log(accounts)
    
          if (accounts.length > 0) {
            setAccount(accounts[0]);
    
            // getAllTransactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
          setAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
    };

    console.log(account)

    useEffect(() => {
        checkIfWalletIsConnect()
    }, [])
    return (
        <TransactionContext.Provider value={{ connectWallet, account }}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider