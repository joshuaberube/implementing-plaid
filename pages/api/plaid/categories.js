import client from './index'

const getCategories = async (req, res) => {
  client.getCategories()
    .then(({ categories }) => res.status(200).send(categories))
    .catch(err => {
      console.error(err)
      return res.sendStatus(500)
    })
}

export default getCategories
