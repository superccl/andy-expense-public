import { ReactNode, useEffect, useState } from "react"
import { BsCurrencyExchange, BsFillPersonFill as PersonIcon } from "react-icons/bs"
import Navbar from "../components/Navbar/Navbar"
import Loading from "../components/ui/Loading"
import Modal from "../components/ui/Modal"
import { useSetting } from "../context/SettingContext"
import BaseCurrency from "../components/Currency/BaseCurrency"
import CurrencyGroup from "../components/Currency/CurrencyGroup"
import ExpensesSetting from "../components/Settings/ExpensesSetting"
import GroupSetting from "../components/Settings/GroupSetting"
import SettingGroup from "../components/Settings/SettingGroup"
import SettingRow from "../components/Settings/SettingRow"
import { useRouter } from "next/router"
import Head from "next/head"

type switchComponentProps = {
  [key:string]: ReactNode
}
const Settings = () => {
  const { 
    logout, 
    currencyData, 
    incomeCategory, 
    accountCategory,
    isCurrencyReady, 
    isIncomeCategoryReady, 
    isAccountCategoryReady,
    currentUser,
    setIncomeCategory,
    setAccountCategory
  } = useSetting()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [key, setKey] = useState<string>('')
  const router = useRouter()

  const switchComponent:switchComponentProps = {
    "Income Category": <GroupSetting header="Income Category" dbKey='incomeCategory' itemList={incomeCategory} setItem={setIncomeCategory} isItemListReady={isIncomeCategoryReady} handleClose={() => setIsOpen(false)} />,
    "Expenses Category": <ExpensesSetting handleClose={() => setIsOpen(false)}/>,
    "Account Category": <GroupSetting header="Account Category" dbKey='accountCategory' itemList={accountCategory} setItem={setAccountCategory} isItemListReady={isAccountCategoryReady} handleClose={() => setIsOpen(false)} />,
    "Base Currency": <BaseCurrency handleClose={() => setIsOpen(false)}/>,
    "Currency Group": <CurrencyGroup handleClose={() => setIsOpen(false)}/>
  }

  useEffect(() => {
    if (key) {
      setIsOpen(true)
    }
  }, [key])

  useEffect(() => {
    if (!isOpen) {
      setKey('')
    }
  }, [isOpen])

  useEffect(() => {
    currentUser ? router.push("/settings") : router.push("/login")
  }, [])

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="w-main self-center">
        <SettingGroup name="General">
          <SettingRow hover name="Income Category Setting" handleClick={() =>setKey("Income Category")} />
          <SettingRow hover name="Expenses Category and Budget Setting" handleClick={() =>setKey("Expenses Category")} />
          <SettingRow hover name="Account Category Setting" handleClick={() =>setKey("Account Category")} />
        </SettingGroup>
        <SettingGroup icon={<BsCurrencyExchange size={25}/>} name="Currency">
          <SettingRow hover name="Base Currency" handleClick={() => setKey("Base Currency")}>
            {isCurrencyReady ?
            <span className="txt-accent">{currencyData.baseCurrency}</span>
            : <Loading />
            }
          </SettingRow>
          <SettingRow hover name="Currency Group" handleClick={() =>setKey("Currency Group")}>
            {isCurrencyReady ?
            <span className="txt-accent">{currencyData.currencyGroup.slice(1).join(',')}</span>
            : <Loading />
            }
          </SettingRow>
        </SettingGroup>
        <SettingGroup name="Account" icon={<PersonIcon size={25}/>}>
          <SettingRow name="Logout">
            <button 
            className="text-danger border-b border-b-danger"
            onClick={() => logout().then(() => router.push('/login'))}
            >Logout</button>
          </SettingRow>
        </SettingGroup>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} position="left right bottom">
        {switchComponent[key as keyof switchComponentProps]}
      </Modal>
    </>
  )
}


export default Settings