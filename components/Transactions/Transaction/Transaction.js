import PropTypes from 'prop-types'

const Transaction = ({ transaction }) => {
  const { amount, category, date, merchant_name, pending } = transaction
  const amountString = `$${(amount * -1).toFixed(2)}`.replace('$-', '-$')
  const textColor = Math.sign(amount) === -1 ? 'text-green-400' : 'text-gray-900'

  return (
    <li className="flex flex-row py-8 px-16 items-center justify-between">
      <div className="flex flex-col w-128">
        <h3 className="text-base text-gray-900">{merchant_name}</h3>
        <time className="text-xs text-gray-400">{date}</time>
      </div>
      <div className="flex flex-col justify-end items-end">
        <p className={`text-sm font-bold ${textColor}`}>{amountString}</p>
        <p className="text-xs font-thin italic text-gray-400">{category[0]}</p>
      </div>
        {/* <p className="flex justify-center w-105 text-xs text-gray-400">{category[0]}</p>
        <p className={`flex justify-end w-64 text-sm font-bold ${textColor}`}>{amountString}</p> */}
    </li>
  )
}

Transaction.defaultProps = {
  transaction: {
    account_id: 'k7jAyXnXBrtRkq994NXetDQNZEmzBxtxA13Kn',
    amount: 500,
    category: ['Travel', 'Airlines and Aviation Services'],
    date: '2021-07-24',
    iso_currency_code: 'USD',
    merchant_name: 'United Airlines',
    name: 'United Airlines',
    pending: false
  }
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    account_id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    iso_currency_code: PropTypes.string.isRequired,
    merchant_name: PropTypes.string,
    name: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired
  })
}

export default Transaction
