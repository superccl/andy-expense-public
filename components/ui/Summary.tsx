import ErrorHandler from '../ErrorHandler'
import { useSetting } from '../../context/SettingContext'
import { formatCurrency } from '../../utils/CurrencyHelper'
import Loading from './Loading'

type SummaryProps = {
  summary: {
    positive: {name:string, amount:number}
    negative: {name:string, amount:number}
  }
}

const Summary = ({ summary }: SummaryProps) => {
  if (summary.positive.amount < 0 || summary.negative.amount < 0)  return (
    <ErrorHandler>
      {`${summary.negative.name} or ${summary.positive.name} must be positive`}
    </ErrorHandler>
  )

  const { currencyData, isCurrencyReady } = useSetting()

  return (
    <div className="h-14 flex items-center bg-900 py-1 px-4 text-sm w-main sm:px-8 sm:text-base">  
      <div className="flex-1 flex flex-col justify-center items-center">
        <span>{summary.positive.name}</span>
        {isCurrencyReady ? 
        <span className="text-success">{formatCurrency(currencyData.baseCurrency, summary.positive.amount)}</span>
        : <Loading />
        }        
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <span>{summary.negative.name}</span>
        {isCurrencyReady ? 
        <span className="text-danger">{formatCurrency(currencyData.baseCurrency, summary.negative.amount)}</span>
        : <Loading />
        }        
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <span>Total</span>
        {isCurrencyReady ?
        <span>{formatCurrency(currencyData.baseCurrency, summary.positive.amount - summary.negative.amount)}</span>
        : <Loading />
        }
      </div>
    </div>
  )
}

export default Summary