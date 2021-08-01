import useTransactions from '../../hooks/useTransactions'
import Transaction from './Transaction/Transaction'

const Transactions = () => {
  const { transactions, isLoading, isError } = useTransactions()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>ERROR</div>

  return (
    <ol className="mx-16 bg-white rounded-10">
      {transactions.map(transaction => (
        <Transaction key={transaction.transaction_id} transaction={transaction} />
      ))}
    </ol>
  )
}

export default Transactions
