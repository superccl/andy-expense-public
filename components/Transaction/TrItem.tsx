import { Currency, TransactionData, useSetting } from '../../context/SettingContext'
import { formatCurrency } from '../../utils/CurrencyHelper'

interface TrItemProps extends TransactionData {
  handleClick: (id:string) => void
}


const TrItem = ({ id, type, accountId, category, name, currency, amount, handleClick}:TrItemProps) => {
  const { accountIdToName } = useSetting()
  return (
    <div className="flex items-center px-4 w-full h-[56px] bg-hover cursor-pointer sm:px-6" onClick={() => handleClick(id)}>
      <span className='w-28 xl:w-40 text-small break-words'>{category}</span>
      <div className='relative flex-1 h-full grid grid-rows-5 grid-cols-1 items-center'>
        <p className='row-span-3'>{name}</p>
        <p className='text-small row-span-2'>{accountIdToName(accountId)}</p>
      </div>
      <span className={`${type === 'expenses' ? "text-danger" : "text-success"} ml-auto`}>{formatCurrency(currency, amount)}</span>
    </div>
  )
}

export default TrItem