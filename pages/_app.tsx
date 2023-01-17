import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/ui/Layout'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Andy Expense - Your Best Expense Tracker and Financial Manager</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
