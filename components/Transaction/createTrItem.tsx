import { useEffect, useRef, useState } from 'react'
import { TfiSave } from "react-icons/tfi"
import Select from "../../components/ui/Select"
import TextField from "../../components/ui/TextField"
import { useSetting, Status, TransactionData } from "../../context/SettingContext"
import { combineDateAndTime, getCurrentDatetime, getDateAndTime } from "../../utils/DatetimeHelper"

type CreateTrItemProps = {
  handleClose: () => void,
  id?: string
}

type TransactionDataNoId = Omit<TransactionData, "id">

type ErrorProps = {
  [key in keyof Omit<TransactionDataNoId, "description">]: string
}

const CreateTrItem = ( {handleClose, id}: CreateTrItemProps) => {
  const { 
    currencyData, 
    expensesCategory, 
    incomeCategory,
    transactionData, 
    accountData, 
    accountIdToName,
    isCurrencyReady, 
    isExpensesCategoryReady,
    isIncomeCategoryReady, 
    isTransactionReady, 
    isAccountReady, 
    setTransactionDataFull,
    handleFetch 
  } = useSetting()

  const typeRef = useRef<HTMLSelectElement>(null)
  const dateTimeRef = useRef<HTMLInputElement>(null)
  const accountIdRef = useRef<HTMLSelectElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const currencyRef = useRef<HTMLSelectElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  // const ref = {
  //   category: categoryRef,
  //   name: nameRef,
  //   amount: amountRef,
  //   currency: currencyRef,
  //   description: descriptionRef
  // }
  const [type, setType] = useState<TransactionData['type']>('expenses')
  useEffect(() => {
    setDefaultItems(defaultItems => ({...defaultItems, type:type}))
  }, [type])
  const prefillItems:TransactionData =
  { 
    type: type, 
    date: getDateAndTime(getCurrentDatetime()).date,  
    time: getDateAndTime(getCurrentDatetime()).time, 
    currency: currencyData.baseCurrency
  } as TransactionData
  const [defaultItems, setDefaultItems] = useState<TransactionData>(transactionData.find(item => item.id === id) || prefillItems)
  const [errors, setErrors] = useState<ErrorProps>(
    {
      accountId: "",
      category: "",
      name: "",
      currency: "",
    } as ErrorProps)

  function accountNameToId(accountName:string) {
    if (accountName === '') return ''
    const [category, name] = accountName.split(': ')
    const accountId = accountData.find(item => item.category === category && item.name === name)!.id
    return accountId
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    const submittedItems:TransactionDataNoId = {
      type: typeRef.current!.value as TransactionData['type'],
      date: dateTimeRef.current!.value.slice(0, 10),
      time: dateTimeRef.current!.value.slice(11),
      accountId: accountNameToId(accountIdRef.current!.value),
      category: categoryRef.current!.value,
      name: nameRef.current!.value.trim(),
      amount: Number(amountRef.current!.value),
      currency: currencyRef.current!.value,
      description: descriptionRef.current!.value.trim()
    }

    let checkErrors = Object.assign({}, errors)

    Object.keys(checkErrors).forEach(key => {
      checkErrors = {...checkErrors, [key as keyof ErrorProps]: submittedItems[key as keyof ErrorProps] ? '' : 'This field is required'}
    })

    if (Object.values(checkErrors).every(item => item === '')) {
      const status = id ? handleFetch('transaction', 'PUT', setTransactionDataFull, submittedItems, id) : handleFetch('transaction', 'POST', setTransactionDataFull, submittedItems, id)
      status === Status.SUCCESS ? handleClose() : null
    } else {
      setErrors(checkErrors)
    }
  }

  function handleDelete() {
    const status = handleFetch('transaction', 'DELETE', setTransactionDataFull, undefined, id)
    status === Status.SUCCESS ? handleClose() : null
  }

  return (
    <div className="bg-main min-h-[55vh] flex flex-col items-center px-4 py-4 sm:px-8">
      <h1 className="py-2 text-2xl">{id ? "Edit" : "Add"} Transaction</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4 items-start">
        <Select value={defaultItems.type} onChange={(e) => {setType(e.target.value as TransactionData['type'])}} options={["income", "expenses"]} label="Type" ref={typeRef} error={errors.type} />
        <TextField defaultValue={combineDateAndTime(defaultItems.date, defaultItems.time)} label="Date & Time" ref={dateTimeRef} type="datetime-local" />
        <Select defaultValue={ id ? accountIdToName(defaultItems.accountId) : ''} options={accountData.map(item => accountIdToName(item.id))} label="Account" ref={accountIdRef} error={errors.accountId}/>
        <Select defaultValue={defaultItems.category} options={defaultItems.type === 'expenses' ? expensesCategory.map(item => item.category) : incomeCategory.map(item => item.category)} label="Category" ref={categoryRef} error={errors?.category}/>
        <TextField defaultValue={defaultItems.name} label="Name" ref={nameRef} type="text" error={errors?.name}/>
        <Select defaultValue={defaultItems.currency} options={currencyData.currencyGroup} label="Currency" ref={currencyRef} error={errors?.currency}/>
        <TextField defaultValue={defaultItems.amount} label="Amount" step={0.001} ref={amountRef} type="number" required/>
        <TextField defaultValue={defaultItems.description} label="Description" ref={descriptionRef} type="text"/>
        <button 
        className="w-[120px] self-center button-accent mt-8 py-2 px-6 rounded-lg flex justify-center items-center gap-2">
          <TfiSave/>  
          <span className="ml-2">Save</span>
        </button>
        {id ? 
          <button 
          className="self-center border-b border-danger text-danger mt-2 hover:bg-900"
          type="button"
          onClick={() => handleDelete()}
          >Delete</button> : 
          <button 
          className="self-center border-b border-accent txt-accent mt-2 hover:bg-900"
          type="button"
          onClick={() => handleClose()}
          >Cancel</button>}
      </form>
    </div>
  )
}

export default CreateTrItem