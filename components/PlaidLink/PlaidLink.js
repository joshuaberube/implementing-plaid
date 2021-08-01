import { useCallback, useEffect, useState, memo } from 'react'
import { usePlaidLink } from "react-plaid-link"
import axios from "axios"

const PlaidLink = () => {
    const [token, setToken] = useState("")
    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const createToken = async () => {
            try {
                const res = await axios.post("/api/plaid/create-link-token", {userId: "1"})
                setToken(res.data)
            } catch (err) {
                setToken(err)
            }
        }

        createToken()
    }, [])

    const onSuccess = useCallback(async publicToken => {
        const {data} = await axios.post("/api/plaid/create-access-token", { publicToken })
        .catch(err => console.error(err))
        setAccessToken(data)
    }, [])

    const onEvent = useCallback(async eventName => {
        if (eventName === "HANDOFF") {
            const {data} = await axios.post("/api/plaid/transactions", {accessToken})
            .catch(err => console.error(err))

            console.log("transactions", data)
        }
    }, [accessToken])

    const config = { token, onSuccess, onEvent }

    const { open, ready, error } = usePlaidLink(config)

    return (
        <input
            type="button" 
            onClick={open} 
            disabled={!ready || error} 
            value="Connect a bank account"
        />
    )
}

export default memo(PlaidLink)