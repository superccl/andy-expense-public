import { groupBy } from "lodash"
import Loading from "../components/ui/Loading"
import SwitchDate from "../components/ui/SwitchDate"
import { useSetting } from "../context/SettingContext"
import PieChart from "../components/Stats/PieChart"
import StatSummary from "../components/Stats/StatSummary"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import Head from "next/head"

const Stats = () => {
  const { transactionData, conversionData, isConversionReady, isTransactionReady, currentUser } = useSetting()
  const transactionDataGroup = groupBy(transactionData.filter(item => item.type === 'expenses'), 'category')
  // const categoryList = Object.keys(transactionDataGroup)
  // const categorySum = categoryList.map(key => transactionDataGroup[key].reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0))
  const transactionDataGroupSum = Object.keys(transactionDataGroup)
    .map(key => ({name: key, amount : transactionDataGroup[key]
    .reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0)})
    )
    .sort((a,b) => b.amount - a.amount)

  const colorList = [
    'rgba(255, 99, 132, 0.55)',
    'rgba(54, 162, 235, 0.55)',
    'rgba(255, 206, 86, 0.55)',
    'rgba(75, 192, 192, 0.55)',
    'rgba(153, 102, 255, 0.55)',
    'rgba(255, 159, 64, 0.55)',
    'rgba(152, 159, 64, 0.55)',
    'rgba(152, 53, 163, 0.55)',
  ]
  const router = useRouter()
  useEffect(() => {
    currentUser ? router.push("/stats") : router.push("/login")
  }, [])

  return (
  <>
    <Head>
      <title>Statistics</title>
    </Head>
    <div className="sticky flex flex-col items-center self-center">
      <SwitchDate />
    </div>
    {isTransactionReady && Object.keys(transactionDataGroupSum).length === 0 ? 
    <p className="w-full text-center text-lg">There is currently no transaction.</p>
    : null}
    {isConversionReady && isTransactionReady ?
    <div className="px-6 flex-1 overflow-x-hidden overflow-y-auto w-main self-center lg:grid lg:grid-cols-2 lg:items-center">
      <PieChart dataGroupSum={transactionDataGroupSum} backgroundColor={colorList}/>
      <StatSummary dataGroupSum={transactionDataGroupSum} backgroundColor={colorList}/>
    </div>
    : <Loading />
    }
  </>
  )
}

export default Stats