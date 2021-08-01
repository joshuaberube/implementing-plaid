import Head from 'next/head'
import axios from "axios"
import { useEffect, useState } from 'react'
import PlaidLink from '../components/PlaidLink/PlaidLink'
import Transactions from '../components/Transactions/Transactions'

const Home = () => {  
  return (
    <div>
      <Head>
        <title>Hello World!</title>
      </Head>

      <main className="bg-gray-100 h-100vh">
        <PlaidLink />
        <Transactions />
      </main>
    </div>
  )
}

export default Home