export interface ITransactionContext {
    connectWallet: () => Promise<void>
    account: string
    addingTransaction: boolean
    transactions: (IAddToTransaction & {addressFrom: string; timestamp: string})[]
    addToTransaction: (data: IAddToTransaction) => Promise<any>
}

export interface IAddToTransaction {
    addressTo: string
    amount: number
    keyword: string
    message: string
}