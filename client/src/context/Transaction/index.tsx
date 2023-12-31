import { ethers } from "ethers";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/constant";
import { IAddToTransaction, ITransactionContext } from "./interface";

//@ts-ignore
export const TransactionContext = createContext<ITransactionContext>({})
//@ts-ignore
const { ethereum } = window

function getEthContract(){
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()

  const transactionsContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return transactionsContract;
}

function TransactionProvider({ children }: PropsWithChildren) {
    const [account, setAccount] = useState("");
    const [addingTransaction, setAddingTransaction] = useState(false)
    const [transactions, setTransactions] = useState([])

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install the MetaMask extension.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
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
          if (!ethereum) return alert("Please install the MetaMask extension.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
          setAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
    };

    async function addToTransaction(data: IAddToTransaction){
      try {
        const contract = getEthContract()
        setAddingTransaction(true)
        const transaction = await contract.addToTransaction(data.addressTo, data.amount, data.message, data.keyword)
        setAddingTransaction(false)
        await transaction.wait()
        

      } catch (error) {
        console.log(error)
      }
    }

    async function getAllTransactions(){
      try {
        const contract = getEthContract()
        const transactions = await contract.getAllTransaction()

        const structedTransactions = transactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          message: transaction.message,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          amount: parseInt(transaction.amount) / (10 ** 18),
        }))

        setTransactions(structedTransactions)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(() => {
        checkIfWalletIsConnect()
        getAllTransactions()
    }, [])
    return (
        <TransactionContext.Provider 
          value={{ 
            connectWallet, 
            account, 
            transactions,
            addingTransaction,
            addToTransaction 
          }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider