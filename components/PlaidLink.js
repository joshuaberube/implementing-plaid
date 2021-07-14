import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from "react-plaid-link"
import axios from "axios"

const PlaidLink = () => {
    const [token, setToken] = useState("")

    const onSuccess = useCallback(async publicToken => {
        await axios.post("/api/plaid/create-access-token", { publicToken })
        .catch(err => console.error(err))
    }, [])

    const onEvent = useCallback(eventName => {
        if (eventName === "HANDOFF") console.log("HALLO")
    }, [])

    const config = { token, onSuccess, onEvent }

    const { open, ready, error } = usePlaidLink(config)

    useEffect(() => {
        const createToken = async () => {
            const response = await axios.post("/api/plaid/create-link-token", {userId: "1"})
            .catch(err => console.error(err))
            console.log(response)

            setToken(response.data)
        }

        createToken()
    }, [])

    return (
        <input 
            type="button" 
            onClick={open} 
            disabled={!ready || error} 
            value="Connect a bank account"
        />
    )
}

export default PlaidLink