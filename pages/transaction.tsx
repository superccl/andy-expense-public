import { groupBy } from "lodash"
import { useEffect, useRef, useState } from "react"
import Summary from "../components/ui/Summary"
import { TransactionData, useSetting } from "../context/SettingContext"
import TrGroup from "../components/Transaction/TrGroup"
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from "../components/ui/Modal"
import CreateTrItem from "../components/Transaction/createTrItem"
import SearchBar from "../components/ui/SearchBar"
import Loading from "../components/ui/Loading"
import SwitchDate from "../components/ui/SwitchDate"
import Navbar from "../components/Navbar/Navbar"
import Head from "next/head"

const Transaction = () => {
  const { transactionData, conversionData, monthOffset, isTransactionReady, isConversionReady } = useSetting()
  const income:number = transactionData.filter(item => item.type === 'income').reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0)
  const expenses:number = transactionData.filter(item => item.type === 'expenses').reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0)
  const [data, setData] = useState<TransactionData[]>(transactionData)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [id, setId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setData(transactionData)
  }, [monthOffset])


  const trDataGroup = groupBy(data, "date")

  const summary = {
    positive: { name: 'Income', amount: income },
    negative: { name: 'Expenses', amount: expenses},
  }

  function handleSetData(data:TransactionData[]) {
    setData(data)
  }

  return (
    <>
      <Head>
        <title>Transaction</title>
      </Head>
      <div className="sticky flex flex-col items-center self-center">
        <SwitchDate />
        <Summary summary={summary} />
        {isTransactionReady ? 
          <SearchBar defaultData={transactionData} setData={handleSetData} matchKeys={['type', 'date', 'category', 'name', 'description', 'currency']} />
        : <Loading />
        }
      </div>
      <div className='overflow-y-auto overflow-x-hidden w-main self-center'>
        {Object.keys(trDataGroup).length === 0 ? 
        isTransactionReady && <p className="w-full text-center text-lg">There is currenctly no transaction.</p>
        :Object.keys(trDataGroup).sort().reverse()
        .map(date => 
        <TrGroup key={date} date={date} itemList={trDataGroup[date].sort((a, b) => (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0))} handleOnClick={(id) => {
          setId(id)
          setIsOpen(true)
          }}/>)}
      </div>

      <button 
      className={`${isOpen ? "hidden" : "fixed"} bottom-10 left-[50%] translate-x-[-50%] text-center rounded-full text-2xl p-4 button-accent`}
      onClick={() => {
        setId(undefined)
        setIsOpen(true)}
      }
      >
        <AiOutlinePlus />
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} position="bottom left right">
        <CreateTrItem handleClose={() => setIsOpen(false)} id={id} />
      </Modal>
    </>
  )
}

export default Transaction