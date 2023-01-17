import { useState } from "react"
import Modal from "../../components/ui/Modal"
import { Currency, useSetting } from "../../context/SettingContext"
import SelectCurrency from "./SelectCurrency"
import CurrencyInfoItem from "./CurrencyInfoItem"
import Loading from "../../components/ui/Loading"

type BaseCurrencyProps = {
  handleClose: () => void
}
const BaseCurrency = ({ handleClose }: BaseCurrencyProps) => {
  const { currencyData, isCurrencyReady, handleFetchCurrency } = useSetting()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleSubmit(code: Currency) {
    const submittedItem = {
      'baseCurrency': code,
      'currencyGroup': [code, ...currencyData.currencyGroup.filter(item => item !== code)]
    }
    handleFetchCurrency(submittedItem)
    handleClose()
  }
  return (
    <>
      <div className="relative bg-main min-h-[25vh] flex flex-col items-center gap-4 py-4">
        <button className="absolute top-0 right-0 text-3xl p-2 hover:bg-900" onClick={() => handleClose()}>&times;</button>
        <h1 className="py-2 text-2xl">Base Currency</h1>
        {isCurrencyReady ? <CurrencyInfoItem code={currencyData.baseCurrency} selected/> : <Loading />}
        <button className="button-accent px-4 py-2 rounded-lg" onClick={() => setIsOpen(true)}>Change</button>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} position="top right bottom left">
        {isCurrencyReady ? 
        <SelectCurrency selectedCurrency={currencyData.baseCurrency} handleClose={() => setIsOpen(false)} onSubmit={handleSubmit}/>
        : <Loading />
        }
      </Modal>
    </>
  )
}

export default BaseCurrency