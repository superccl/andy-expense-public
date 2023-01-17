import { useEffect, useState } from "react"
import { AccountData, useSetting } from "../context/SettingContext"
import AcGroup from "../components/Account/AcGroup"
import Summary from "../components/ui/Summary"
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from "../components/ui/Modal"
import CreateAcItem from "../components/Account/CreateAcItem"
import { groupBy } from 'lodash'
import SearchBar from "../components/ui/SearchBar"
import Loading from "../components/ui/Loading"
import { useRouter } from "next/router"
import Head from "next/head"


const Account = () => {
  const { accountData, conversionData, isAccountReady, isConversionReady, currentUser } = useSetting()
  let assets:number = accountData.filter(item => item.amount >= 0).reduce((prev, item) => prev + item.amount / conversionData[item.currency], 0)
  let liabilities:number = accountData.filter(item => item.amount < 0).reduce((prev, item) => prev - item.amount / conversionData[item.currency], 0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [id, setId] = useState<string | undefined>(undefined)
  const [data, setData] = useState<AccountData[]>(accountData)
  const router = useRouter()

  const accountDataGroup = groupBy(data, 'category')

  const summary = {
    positive: {name: 'Assets', amount: assets},
    negative: {name: 'Liabilities', amount: liabilities},
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleSetData(data:AccountData[]) {
    setData(data)
  }

  useEffect(() => {
    currentUser ? router.push("/account") : router.push("/login")
  }, [])

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div className="sticky flex flex-col items-center self-center">
        <div className="flex items-center h-12 px-6 shadow bg-main"></div>
        <Summary summary={summary} />
        {isAccountReady ?
          <SearchBar defaultData={accountData} setData={handleSetData} matchKeys={['category', 'name', 'description', 'currency']} />
        : <Loading />
        }
      </div>
      {isConversionReady ? 
        <div className='overflow-y-auto overflow-x-hidden w-main self-center'>
          {Object.keys(accountDataGroup).length === 0 ? 
          isAccountReady && <p className="w-full text-center text-lg">There is currenctly no account.</p>
          :Object.keys(accountDataGroup).sort()
          .map(category => 
          <AcGroup key={category} groupName={category} itemList={accountDataGroup[category].sort((a, b) => (b.amount / conversionData[b.currency] - a.amount / conversionData[a.currency]))} handleOnClick={(id) => {
            setId(id)
            setIsOpen(true)
            }}/>)}
        </div>
      : <Loading />
      }

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
        <CreateAcItem handleClose={handleClose} id={id} />
      </Modal>
    </>
  )
}

export default Account