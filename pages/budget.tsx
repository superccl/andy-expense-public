import { groupBy } from "lodash"
import Loading from "../components/ui/Loading"
import SwitchDate from "../components/ui/SwitchDate"
import { useSetting } from "../context/SettingContext"
import ProgressBar from "../components/Budget/ProgressBar"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import Head from "next/head"

const Budget = () => {
  const { currentUser, transactionData, expensesCategory, conversionData, isTransactionReady, isExpensesCategoryReady } = useSetting()
  
  // Copy from Stats
  const transactionDataGroup = groupBy(transactionData.filter(item => item.type === 'expenses'), 'category')
  // const categoryList = Object.keys(transactionDataGroup)
  // const categorySum = categoryList.map(key => transactionDataGroup[key].reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0))
  const transactionDataGroupSum = Object.keys(transactionDataGroup)
    .map(key => ({name: key, amount : transactionDataGroup[key]
    .reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0)})
    )
  const router = useRouter()
  
  useEffect(() => {
    currentUser ? router.push("/budget") : router.push("/login")
  }, [])

  return (
    <>
      <Head>
        <title>Budget</title>
      </Head>
      <div className="sticky flex flex-col items-center self-center">
        <SwitchDate />
      </div>
      {isExpensesCategoryReady ?
      <div 
        className="mx-12 mt-4 flex flex-col gap-12 w-main self-center"
        style={{width: 'clamp(50vw, 700px, 85vw'}}
      >
        {expensesCategory.find(item => item.budget) ? null 
        : <p className="w-full text-center text-lg">No budget is set.</p>
        }
        {expensesCategory
        .filter(item => item.budget)
        .sort((a, b) => 
        (transactionDataGroupSum.find(data => data.name === b.category)?.amount || 0) / b.budget - 
        (transactionDataGroupSum.find(data => data.name === a.category)?.amount || 0) / a.budget
        )
        .map((item, idx) => 
        <ProgressBar 
        key={item.id}
        category={item.category} 
        budget={item.budget} 
        amount={transactionDataGroupSum.find(data => data.name === item.category)?.amount || 0}
        idx={idx}
        />)
        }       
      </div>
      : <Loading />
      }

    </>
  )
}

export default Budget