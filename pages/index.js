import Head from 'next/head'
import axios from "axios"
import { useEffect } from 'react'
import PlaidLink from '../components/PlaidLink';

const Home = () => {

  useEffect(() => {
    const test = async () => {
      try {
        const test2 = await axios.post("/api/hello")
  
        console.log(test2)
      } catch (err) {
        console.error(err)
      }
    }
    test()
  }, [])

  return (
    <div>
      <Head>

      </Head>

      <main>
        <PlaidLink />
      </main>
    </div>
  )
}

export default Home