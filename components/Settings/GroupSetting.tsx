import { useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { TfiSave } from "react-icons/tfi"
import Loading from "../../components/ui/Loading"
import Modal from "../../components/ui/Modal"
import TextField from "../../components/ui/TextField"
import { AccountCategory, IncomeCategory, Position, useSetting } from "../../context/SettingContext"
import GroupItem from "./GroupItem"


type GroupSettingProps = {
  header: string,
  dbKey: Exclude<Position, "currency">,
  itemList: {id: string, category: string}[],
  setItem: React.Dispatch<React.SetStateAction<{id: string, category: string}[]>>
  isItemListReady?: boolean,
  handleClose: () => void
}
const GroupSetting = ({ header, dbKey, itemList, setItem, isItemListReady=true, handleClose }:GroupSettingProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleFetch } = useSetting()

  function handleAdd(category: string) {
    if (!category) {
      setError('This field is required')
      return;
    }

    if (itemList.find(item => item.category === category)) {
      setError('This item already exists')
      return;
    }
    setError('')
    handleFetch(dbKey, 'POST', setItem, {category: category}, undefined)
    setIsOpen(false)
  }

  function handleDelete(category:string) {
    handleFetch(dbKey, 'DELETE', setItem, undefined, itemList.find(item => item.category === category)!.id)
  }

  return (
    <div className="relative bg-main min-h-[50vh] max-h-[100vh] flex flex-col items-center gap-4 px-8 py-4">
      <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => handleClose()}>&times;</button>
      <h1 className="py-2 text-2xl">{header}</h1>
      {isItemListReady ?
      <div className='flex flex-col items-center w-full'>
        {itemList.map(item => <GroupItem key={item.id} category={item.category} onDelete={handleDelete}/>)}
      </div>
      : <Loading />
      }

      <button 
      className={`${isOpen ? "hidden" : "fixed"} bottom-10 left-[50%] translate-x-[-50%] text-center rounded-full text-2xl p-4 button-accent`}
      onClick={() => setIsOpen(true)}
      >
        <AiOutlinePlus />
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} position='left right'>
        <div className={`${isOpen ? "fixed" : "hidden"} bottom-0 bg-main flex flex-col items-center w-full`}>
        <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => setIsOpen(false)}>&times;</button>
          <h1 className="py-2 text-2xl">Add Item</h1>
          <TextField label='' ref={inputRef} error={error}/>
          <button 
          className="w-[120px] button-accent mt-8 py-2 px-6 rounded-lg flex justify-center items-center gap-2"
          onClick={() => handleAdd(inputRef.current!.value.trim())}
          >
            <TfiSave/>  
            <span className="ml-2">Save</span>
          </button>
          <button 
            className="border-b border-accent txt-accent my-2 hover:bg-900"
            type="button"
            onClick={() => setIsOpen(false)}
            >Cancel</button>
        </div>        
      </Modal>
    </div>
  )
}

export default GroupSetting