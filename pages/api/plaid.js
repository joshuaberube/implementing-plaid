import plaid from "plaid"

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET_SANDBOX;
const PLAID_ENV = process.env.PLAID_ENV;

console.log("PLAID_CLIENT_ID", PLAID_CLIENT_ID)

const client = new plaid.Client({
    clientId: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: PLAID_ENV
})

const createPlaidLinkToken = async (req, res) => {
    const { user_id } = req.session.user

    const { link_token } = await client.createLinkToken({
        user: {
            client_user_id: toString(user_id)
        },
        client_name: "Budgwit",
        products: ["auth", "transactions"],
        country_codes: ["US"],
        language: "en"
    }).catch(err => {res.sendStatus(500); console.log(err)})

    res.status(200).send(link_token)
}

const createAccessToken = async (req, res) => {
    try {
        const db = req.app.get('db')
        const { publicToken } = req.body
        const { user_id } = req.session.user

        const { access_token } = await client.exchangePublicToken(publicToken)

        const encryptedKey = encrypt(access_token)
        
        await db.user.add_access_token([user_id, encryptedKey])

        res.status(200).send(true)
    } catch (err) {
        res.sendStatus(500) 
        console.log(err)
    }
}

const getPlaidTransactions = async (req, res) => {
    try {
        const db = req.app.get('db')
        const { user_id } = req.session.user
    
        const [{api_key}] = await db.user.get_access_token(user_id)
        const decrypted = decrypt(api_key)

        const startDate = moment().subtract(60, "days").format("YYYY-MM-DD")
        const endDate = moment().format("YYYY-MM-DD")
        
        const plaidTransactions = await client.getTransactions(decrypted, startDate, endDate)
        const dbTransactions = await db.transactions.where("user_id=$1", [user_id])

        const allTransactions = [...plaidTransactions.transactions, ...dbTransactions]

        const current = plaidTransactions.accounts.slice(0, 4).reduce((acc, curVal) => {
            return acc += curVal.balances.current
        }, 0)

        const allAccounts = {account_id: "all", balances: {current: current}, name: "All Accounts", subtype: "combined"}
        const allAccountsCombined = [allAccounts, ...plaidTransactions.accounts.slice(0, 4)]

        plaidTransactions.transactions = allTransactions
        plaidTransactions.accounts = allAccountsCombined

        res.status(200).send(plaidTransactions)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

const getCategories = async (req, res) => {
    const { categories } = await client.getCategories()
    .catch(err => {console.log(err); res.sendStatus(500)})

    res.status(200).send(categories)
}

export { createPlaidLinkToken, createAccessToken, getPlaidTransactions, getCategories }