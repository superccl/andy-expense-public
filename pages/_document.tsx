import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/assets/logo.ico" />
        <meta name="description" content="Andy Expense allows you to build your saving habits and handle your expenses, assets, and debts all in one place." />
        <meta name="keywords" content="Expense Tracker, Financial Manager, Personal Finance, Saving Habit, Transaction, Account, Budget, Statistics, Free, Mobile Friendly" />
        <meta name="author" content="Chun Long Andy Chan" />
      </Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  )
}
