import React, { useEffect, useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { TfiSave } from "react-icons/tfi"
import Loading from "../../components/ui/Loading"
import Modal from "../../components/ui/Modal"
import TextField from "../../components/ui/TextField"
import { ExpensesCategory, useSetting } from "../../context/SettingContext"
import GroupItem from "./GroupItem"


type ExpensesSettingProps = {
  handleClose: () => void
}

type ExpensesCategoryNoId = Omit<ExpensesCategory, "id">

const ExpensesSetting = ({ handleClose }:ExpensesSettingProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { expensesCategory, isExpensesCategoryReady } = useSetting()
  const [id, setId] = useState<string | undefined>(undefined)

  return (
    <div className="relative bg-main min-h-[50vh] max-h-[100vh] flex flex-col items-center gap-4 py-4">
      <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => handleClose()}>&times;</button>
      <h1 className="py-2 text-xl">Expenses Category and Budget Setting</h1>
      {isExpensesCategoryReady ?
      <div className='flex flex-col items-center w-main shadow'>
        {expensesCategory.map(item => 
        <button 
        key={item.category} 
        className="flex justify-center items-center p-2 pl-4 w-main text-lg bg-900 bg-hover"
        onClick={() => {
          setIsOpen(true)
          setId(item.id)
        }}
        >
          {item.category}
          </button>
        )}
      </div>
      : <Loading />
      }

      <button 
      className={`${isOpen ? "hidden" : "fixed"} bottom-10 left-[50%] translate-x-[-50%] text-center rounded-full text-2xl p-4 button-accent`}
      onClick={() => {
        setIsOpen(true)
        setId(undefined)
        }
      }
      >
        <AiOutlinePlus />
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} position='left right bottom'>
        <CreateItem handleClose={() => {
            setIsOpen(false)
            setId(undefined)
            }
          } id={id} />
      </Modal>
    </div>
  )
}

type CreateItemProps = {
  handleClose: () => void,
  id?: string
}
const CreateItem = ({ handleClose, id}:CreateItemProps) => {
  const [error, setError] = useState<string>('')
  const categoryRef = useRef<HTMLInputElement>(null)
  const budgetRef = useRef<HTMLInputElement>(null)
  const { handleFetch, expensesCategory, isExpensesCategoryReady, setExpensesCategory } = useSetting()

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    const item:ExpensesCategoryNoId = {
      category: categoryRef.current!.value.trim(),
      budget: Number(budgetRef.current!.value)
    }
    if (item.category === '') {
      setError('This field cannot be empty')
      return;
    }

    if (!id && expensesCategory.map(i => i.category).includes(item.category)) {
      setError('This category already exists')
      return
    }
    
    setError('')
    id ? handleFetch('expensesCategory', 'PUT', setExpensesCategory, item, id) : handleFetch('expensesCategory', 'POST', setExpensesCategory, item, undefined)
    handleClose()
  }

  function handleDelete() {
    handleFetch('expensesCategory', 'DELETE', setExpensesCategory, undefined, id)
    handleClose()
  }

  return (
    <div className={`bottom-0 bg-main flex flex-col items-center w-full pb-2`}>
      <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => handleClose()}>&times;</button>
      <h1 className="py-2 text-2xl">{id ? "Edit Item" : "Add Item"}</h1>
      {isExpensesCategoryReady ?
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <TextField defaultValue={id ? expensesCategory.find(i => i.id === id)!.category : ''} label='Name' ref={categoryRef} error={error}/>
        <TextField defaultValue={id ? expensesCategory.find(i => i.id === id)!.budget : undefined} label='Budget' type="number" ref={budgetRef} required/>
        <button 
        className="w-[120px] button-accent mt-8 py-2 px-6 rounded-lg flex justify-center items-center gap-2"
        >
          <TfiSave/>  
          <span className="ml-2">Save</span>
        </button>
      </form>
      : <Loading />
      }
      {id ? 
      <button 
      className="border-b border-danger text-danger mt-2 hover:bg-900"
      type="button"
      onClick={() => handleDelete()}
      >Delete</button> 
      : 
      <button 
      className="border-b border-accent txt-accent mt-2 hover:bg-900"
      type="button"
      onClick={() => handleClose()}
      >Cancel</button>
      }
    </div>        
  )
}
export default ExpensesSetting