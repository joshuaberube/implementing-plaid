import useAccounts from "./useAccounts"

const useTransactions = () => {
    const { transactions, selectedAccount, isError, isLoading } = useAccounts()
    
    if (!isLoading && !isError) {
        const filteredTransactions = transactions.filter(transaction => (
            transaction.account_id === selectedAccount.account_id   
        ))

        return {
            transactions: selectedAccount.account_id === "all" ? transactions : filteredTransactions,
            isError
        }
    } else {
        return { transactions: [], isError }
    }

}

export default useTransactions