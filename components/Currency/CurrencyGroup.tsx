import CircularProgress from '@mui/material/CircularProgress'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Loading from '../../components/ui/Loading'
import Modal from '../../components/ui/Modal'
import { Currency, useSetting } from '../../context/SettingContext'
import CurrencyGroupItem from './CurrencyGroupItem'
import SelectCurrency from './SelectCurrency'

type CurrencyGroupProps = {
  handleClose: () => void
}
const CurrencyGroup = ({ handleClose }: CurrencyGroupProps) => {
  const { currencyData, conversionData, isCurrencyReady, isConversionReady, setCurrencyData, handleFetchCurrency } = useSetting()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleSubmit(code:Currency) {
    handleFetchCurrency({baseCurrency: currencyData.baseCurrency, currencyGroup: [...currencyData.currencyGroup, code]})
  }

  function handleDelete(code:Currency) {
    handleFetchCurrency({baseCurrency: currencyData.baseCurrency, currencyGroup: currencyData.currencyGroup.filter(item => item != code)})
  }

  if(Object.keys(currencyData).length > 0 && Object.keys(conversionData).length > 0) {
    return (
      <>
        <div className="relative bg-main min-h-[50vh] max-h-[100vh] flex flex-col items-center gap-4 px-8 py-4">
          <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => handleClose()}>&times;</button>
          <h1 className="py-2 text-2xl">Currency Group</h1>
          {isConversionReady ?
          <div className='flex flex-col items-center w-main overflow-y-auto'>
            {currencyData.currencyGroup
            .filter(code => code !== currencyData.baseCurrency)
            .map(code => <CurrencyGroupItem key={code} code={code} onDelete={handleDelete}/>)}
          </div>
          : <Loading />
          }

          <button 
          className={`${isOpen ? "hidden" : "fixed"} bottom-10 left-[50%] translate-x-[-50%] text-center button-accent rounded-full text-2xl p-4`}
          onClick={() => {
            setIsOpen(true)}
          }
          >
            <AiOutlinePlus />
        </button>
        </div>

        <Modal open={isOpen} onClose={() => setIsOpen(false)} position="top right bottom left">
          <SelectCurrency selectedCurrency={currencyData.currencyGroup} handleClose={() => setIsOpen(false)} onSubmit={handleSubmit}/>
        </Modal>
      </>
    )
  } else {
    return (
      <div className="bg-main min-h-[55vh] flex flex-col items-center px-8 py-4">
        <CircularProgress color="inherit"/>
      </div>
    )
  }
}

export default CurrencyGroup