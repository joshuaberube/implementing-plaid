// import client from "../../../lib/plaid"
import client from "./index"

export default async (req, res) => {
    client.getCategories()
    .then(({categories}) => res.status(200).send(categories))
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })
}