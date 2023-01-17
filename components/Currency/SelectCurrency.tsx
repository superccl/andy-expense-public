import { useState } from 'react'
import dataFromJson from '../../currency_info.json'
import { Currency } from '../../context/SettingContext'
import CurrencyInfoItem, { CurrencyInfo } from './CurrencyInfoItem'
import SearchBar from '../../components/ui/SearchBar'
import { BsArrowLeft as PreviousIcon} from 'react-icons/bs'
type SelectCurrencyProps = {
  selectedCurrency?: Currency[] | Currency
  handleClose: () => void
  onSubmit: (code:Currency) => void
}

const SelectCurrency = ({ selectedCurrency=[] as Currency[], handleClose, onSubmit }: SelectCurrencyProps) => {
  const [defaultOtherData, _] = useState(dataFromJson.filter(item => !selectedCurrency.includes(item.code)))
  const [otherData, setOtherData] = useState<CurrencyInfo[]>(defaultOtherData)
  Array.isArray(selectedCurrency) ? null : selectedCurrency = [selectedCurrency]

  function handleSubmit(code:Currency) {
    handleClose()
    onSubmit(code)
  }

  function handleSetData(data:CurrencyInfo[]) {
    setOtherData(data)
  }

  return (
    <div className="relative h-full bg-main flex flex-col items-center w-full">
      <div className='sticky w-full bg-main flex flex-col items-center'>
        <button className="absolute left-0 text-3xl p-2 bg-900 bg-hover top-0 m-1 rounded-full" onClick={() => handleClose()}><PreviousIcon size={25}/></button>
        <h1 className="py-2 text-2xl">Currency List</h1>
        <SearchBar defaultData={defaultOtherData} setData={handleSetData} matchKeys={['code', 'fullName']}/>
      </div>      
      <div className='flex flex-col gap-2 overflow-y-auto'>
        <h1 className='text-center text-xl'>Selected</h1>  
        <div className="flex flex-col border border-danger">   
          {dataFromJson.filter(item => selectedCurrency.includes(item.code)).map(item => <CurrencyInfoItem key={item.code} code={item.code} selected onSubmit={handleSubmit}/>)}
        </div>

        <h1 className='text-center text-xl'>Others</h1>  
        <div className="flex flex-col shadow">
          {otherData.length > 0 ?
            otherData.map(item => <CurrencyInfoItem key={item.code} code={item.code} onSubmit={handleSubmit}/>)
          : <span className='text-center p-2 text-lg'>No Item fuifills your search</span>
          }        
        </div>
      </div>
    </div>
  )
}

export default SelectCurrency