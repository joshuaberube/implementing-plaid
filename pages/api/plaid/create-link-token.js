import client from "./index"

export default async (req, res) => {
    if (req.method === "POST") {
        const { userId } = req.body
    
        const { link_token } = await client.createLinkToken({
            user: {
                client_user_id: userId
                //add more for a better returning user experience https://plaid.com/docs/link/returning-user
            },
            client_name: "Plaid Test App",
            products: ["auth", "transactions"],
            country_codes: ["US"],
            language: "en"
        }).catch(err => {
            console.error(err)
            return res.status(500).send(err)
        })
    
        return res.status(200).send(link_token)
    } else {
        return res.status(404)
    }
}