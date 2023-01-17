import Loading from "../../components/ui/Loading"
import { TransactionData, useSetting } from "../../context/SettingContext"
import { formatCurrency } from "../../utils/CurrencyHelper"
import TrItem from "./TrItem"

type TrGroupProps = {
  date: string,
  itemList: TransactionData[],
  handleOnClick: (id: string) => void

}

const TrGroup = ( {date, itemList, handleOnClick}:TrGroupProps ) => {
  const { currencyData, conversionData, isCurrencyReady, isConversionReady } = useSetting()
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const income:number = itemList.filter(item => item.type === 'income').reduce((prevAmount, item) => (prevAmount + item.amount / conversionData[item.currency]), 0)
  const expenses:number = itemList.filter(item => item.type === 'expenses').reduce((prevAmount, item) => (prevAmount + item.amount / conversionData[item.currency]), 0)

  return (
    <div>
      <div className="flex justify-between py-4 px-4 sm:px-6">
        <span>{`${date} (${dayOfWeek[new Date(date).getDay()]})`}</span>
        {isCurrencyReady ?
        <div className="flex gap-4">
          <span className="text-success">{formatCurrency(currencyData.baseCurrency, income)}</span>
          <span className="text-danger">{formatCurrency(currencyData.baseCurrency, expenses)}</span>
        </div>
        : <Loading />
        }       
      </div>
      <div className="flex flex-col justify-center items-center bg-900 shadow">
        {itemList.map(item => <TrItem key={item.id} {...item} handleClick={handleOnClick}/>)}
      </div>
    </div>
  )
}

export default TrGroup