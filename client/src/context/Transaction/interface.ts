export interface ITransactionContext {
    connectWallet: () => Promise<void>
    account: string
}