import crypto from "crypto"
import moment from "moment"

const decrypt = apiKey => {
    const algorithm = "aes-192-cbc"
    const apiKeySplit = apiKey.split(':')
    const iv = Buffer.from(apiKeySplit.shift(), 'hex')
    const encryptedText = Buffer.from(apiKeySplit.join(":"), 'hex')

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

export default async (req, res) => {
    if (req.method !== "POST") return res.status(404)
    
    try {
        //get accessToken from database
        const accessToken = localStorage.getItem("accessToken")

        if (accessToken) {
            const decryptedAccessToken = decrypt(accessToken)
    
            const startDate = moment().subtract(60, "days").format("YYYY-MM-DD")
            const endDate = moment().format("YYYY-MM-DD")
            
            const plaidTransactions = await client.getTransactions(decryptedAccessToken, startDate, endDate)

            //allow for custom transactions (like cash purchases if they'd like to add any)
            const dbTransactions = []
            const allTransactions = [...plaidTransactions.transactions, ...dbTransactions]
    
            const current = plaidTransactions.accounts.slice(0, 4).reduce((acc, curVal) => {
                return acc += curVal.balances.current
            }, 0)
    
            const allAccounts = {account_id: "all", balances: {current: current}, name: "All Accounts", subtype: "combined"}
            const allAccountsCombined = [allAccounts, ...plaidTransactions.accounts.slice(0, 4)]
    
            plaidTransactions.transactions = allTransactions
            plaidTransactions.accounts = allAccountsCombined
    
            res.status(200).send(plaidTransactions)
        }
    } catch (err) {
        res.send(500)
        console.error(err)
    }
}