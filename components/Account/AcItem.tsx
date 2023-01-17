import { Currency } from '../../context/SettingContext'
import { formatCurrency } from '../../utils/CurrencyHelper'

type AcItemProps = {
  id: string
  name: string,
  currency: Currency,
  amount: number,
  handleClick: (id:string) => void
}

const AcItem = ({ id, name, currency, amount, handleClick}:AcItemProps) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 w-full bg-hover cursor-pointer" onClick={() => handleClick(id)}>
      <span>{name}</span>
      <span className={amount < 0 ? 'text-danger' : 'text-success'}>{formatCurrency(currency, amount)}</span>
    </div>
  )
}

export default AcItem