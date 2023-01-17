import Loading from "../../components/ui/Loading"
import { AccountData, useSetting } from "../../context/SettingContext"
import { formatCurrency } from "../../utils/CurrencyHelper"
import AcItem from "./AcItem"

type AcGroupProps = {
  groupName: string,
  itemList: AccountData[],
  handleOnClick: (id: string) => void

}

const AcGroup = ( {groupName, itemList, handleOnClick}:AcGroupProps ) => {
  const { currencyData, conversionData, isCurrencyReady, isConversionReady } = useSetting()
  const total:number = itemList.reduce((prevAmount, item) => (prevAmount + item.amount / conversionData[item.currency]), 0)


  return (
    <div>
      <div className="flex justify-between py-4 px-6">
        <span>{groupName}</span>
        {isCurrencyReady ? <span>{formatCurrency(currencyData.baseCurrency, total)}</span> : <Loading />}
      </div>
      <div className="flex flex-col justify-center items-center bg-900 shadow">
        {itemList.map(item => <AcItem key={item.id} {...item} handleClick={handleOnClick}/>)}
      </div>
    </div>
  )
}

export default AcGroup