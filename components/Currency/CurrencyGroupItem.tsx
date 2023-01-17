import React from 'react'
import Loading from '../../components/ui/Loading'
import { Currency, useSetting } from '../../context/SettingContext'
import { formatCurrency } from '../../utils/CurrencyHelper'

type CurrencyGroupItemProps = {
  code: Currency,
  onDelete: (code:Currency) => void
}
const CurrencyGroupItem = ({ code, onDelete}: CurrencyGroupItemProps) => {
  const { currencyData, conversionData, isCurrencyReady, isConversionReady } = useSetting()
  return (
    <div className='flex items-center p-2 pl-4 w-full text-lg hover:bg-900'>
      {/* <span>{`${code} 1 = ${baseCurrency} ${1 / conversionData[code]}`}</span> */}
      <span className='w-20'>{formatCurrency(code, 1)}</span>
      <span className='mx-4'>=</span>
      {isCurrencyReady && isConversionReady ?
      <span className='mx-4'>{formatCurrency(currencyData.baseCurrency, 1 / conversionData[code], undefined, 5)}</span>
      : <Loading />
      }
      <button className='bg-danger rounded px-4 py-2 ml-auto mr-2' onClick={() => onDelete(code)}>Delete</button>
    </div>
  )
}

export default CurrencyGroupItem