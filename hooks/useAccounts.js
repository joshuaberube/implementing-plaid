import { useEffect, useState } from "react";
import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.post(url).then(res => res.data)

const useAccounts = () => {
    const { data, error } = useSWR("/api/plaid/transactions", fetcher)
    const [selectedAccount, setSelectedAccount] = useState({account_id: 0})

    useEffect(() => {
        if (data && selectedAccount.account_id === 0) setSelectedAccount(data.accounts[1])
    }, [data])

    return {
        accounts: data?.accounts || [],
        transactions: data?.transactions || [],
        selectedAccount,
        setSelectedAccount,
        isLoading: !data && !error,
        isError: error
    }
}

export default useAccounts