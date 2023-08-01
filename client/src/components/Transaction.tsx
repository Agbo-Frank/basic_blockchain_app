import { useContext } from "react";
import { formatAddress } from "../utils";
import { TransactionContext } from "../context/Transaction";

interface IFCTransactionCard {
    addressTo: string 
    addressFrom: string 
    timestamp: string 
    message: string 
    keyword?: string 
    amount: number | string 
    url?: string
}

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, amount, }: IFCTransactionCard) => {
    // const gifUrl = useFetch({ keyword });
    return (
      <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
      >
        <div className="flex flex-col items-center w-full mt-3">
          <div className="display-flex justify-start w-full mb-6 p-2">
            <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">From: {formatAddress(addressFrom)}</p>
            </a>
            <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">To: {formatAddress(addressTo)}</p>
            </a>
            <p className="text-white text-base">Amount: {amount} ETH</p>
            {message && (
              <>
                <br />
                <p className="text-white text-base">Message: {message}</p>
              </>
            )}
          </div>
          {/* <img
            src={gifUrl || url}
            alt="nature"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          /> */}
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    );
  };

const Transactions = () => {
    const { account } = useContext(TransactionContext);
    const { transactions } = useContext(TransactionContext)
    console.log("transaction", transactions)
    return (
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {account ? (
            <h3 className="text-white text-3xl text-center my-2">
              Latest Transactions
            </h3>
          ) : (
            <h3 className="text-white text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
          )}
  
          <div className="flex flex-wrap justify-center items-center mt-10">
            {[ ...transactions].reverse().map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Transactions;