import client from "./index"
import crypto from "crypto"


const encrypt = accessToken => {
    const algorithm = "aes-192-cbc"
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv)
    let encryptedToken = cipher.update(accessToken)

    encryptedToken = Buffer.concat([encryptedToken, cipher.final()])

    return `${iv.toString("hex")}:${encryptedToken.toString("hex")}`
}

export default async (req, res) => {
    try {
        const { publicToken } = req.body
        //separate to easily change to the session when implemented
        const { userId } = req.body

        const { access_token } = await client.exchangePublicToken(publicToken)

        //encrypting the key before it gets added to the database (not sure if necessary but I did it anyways)
        const encryptedKey = encrypt(access_token)
        //add the encryptedKey to the "database"
        localStorage.addItem("accessToken", encryptedKey)


        res.status(200).send(true)
    } catch (err) {
        res.send(500) 
        console.error(err)
    }
}