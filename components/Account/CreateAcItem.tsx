import { useRef, useState } from 'react'
import { TfiSave } from "react-icons/tfi"
import Select from "../../components/ui/Select"
import TextField from "../../components/ui/TextField"
import { AccountData, useSetting, Status } from "../../context/SettingContext"

type CreateAcItemProps = {
  handleClose: () => void,
  id?: string
}

type AccountDataNoId = Omit<AccountData, "id">

type ErrorProps = {
  [key in keyof Omit<AccountDataNoId, "description">]: string
}

const CreateAcItem = ( {handleClose, id}: CreateAcItemProps) => {
  const { 
    currencyData, 
    accountCategory, 
    accountData, 
    isCurrencyReady, 
    isAccountCategoryReady, 
    isAccountReady, 
    setAccountData,
    handleFetch 
  } = useSetting()

  const categoryRef = useRef<HTMLSelectElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const currencyRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  // const ref = {
  //   category: categoryRef,
  //   name: nameRef,
  //   amount: amountRef,
  //   currency: currencyRef,
  //   description: descriptionRef
  // }
  const [defaultItems, setDefaultItems] = useState<AccountData>(accountData.find(item => item.id === id) || { currency: currencyData.baseCurrency} as AccountData)
  const [errors, setErrors] = useState<ErrorProps>(
    {
      category: '',
      name: '',
      currency: ''
    } as ErrorProps)

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    const submittedItems:AccountDataNoId = {
      category: categoryRef.current!.value.trim(),
      name: nameRef.current!.value.trim(),
      amount: Number(amountRef.current!.value.trim()),
      currency: currencyRef.current!.value.trim(),
      description: descriptionRef.current!.value.trim()
    }

    let checkErrors = Object.assign({}, errors)

    Object.keys(checkErrors).forEach(key => {
      checkErrors = {...checkErrors, [key as keyof ErrorProps]: submittedItems[key as keyof ErrorProps] ? '' : 'This field is required'}
    })

    if (Object.values(checkErrors).every(item => item === '')) {
      const status = id ? handleFetch('account', 'PUT', setAccountData, submittedItems, id) : handleFetch('account', 'POST', setAccountData, submittedItems, id)
      status === Status.SUCCESS ? handleClose() : null
    } else {
      setErrors(checkErrors)
    }
  }

  function handleDelete() {
    const status = handleFetch('account', 'DELETE', setAccountData, undefined, id)
    status === Status.SUCCESS ? handleClose() : null
  }




  return (
    <div className="bg-main min-h-[55vh] flex flex-col items-center px-4 py-4 sm:px-8">
      <h1 className="py-2 text-2xl">{id ? "Edit" : "Add"} Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-full items-center sm:w-auto sm:items-start ">
        <Select defaultValue={defaultItems.category} options={accountCategory.map(item => item.category)} label="Group" ref={categoryRef} error={errors?.category}/>
        <TextField defaultValue={defaultItems.name} label="Name" ref={nameRef} type="text" error={errors?.name} required/>
        <TextField defaultValue={defaultItems.amount} label="Amount" step={0.001} ref={amountRef} type="number" required/>
        <Select defaultValue={defaultItems.currency} options={currencyData.currencyGroup} label="Currency" ref={currencyRef} error={errors?.currency}/>
        <TextField defaultValue={defaultItems.description} label="Description" ref={descriptionRef} type="text"/>
        <button 
        className="w-[120px] button-accent mt-8 py-2 px-6 self-center rounded-lg flex justify-center items-center gap-2">
          <TfiSave/>  
          <span className="ml-2">Save</span>
        </button>
        {id ? 
          <button 
          className="border-b border-danger text-danger mt-2 self-center hover:bg-900"
          type="button"
          onClick={() => handleDelete()}
          >Delete</button> : 
          <button 
          className="border-b border-accent txt-accent mt-2 self-center hover:bg-900"
          type="button"
          onClick={() => handleClose()}
          >Cancel</button>}
      </form>
    </div>
  )
}

export default CreateAcItem