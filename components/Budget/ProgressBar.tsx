import Loading from "../../components/ui/Loading"
import { useSetting } from "../../context/SettingContext"
import { formatCurrency } from "../../utils/CurrencyHelper"
import { motion } from 'framer-motion'

type ProgressBarProps = {
  category: string,
  budget: number,
  amount: number,
  idx: number,
}
const ProgressBar = ({ category, budget, amount, idx }: ProgressBarProps) => {
  const { currencyData, isCurrencyReady } = useSetting()
  const percentage = Math.min(amount  / budget * 100, 100).toFixed(1)
  return (
    <div>
      <div className="mb-2 flex flex-col">
        <span>{category}</span>
        {isCurrencyReady ? 
        <span className="text-small">{formatCurrency(currencyData.baseCurrency, amount)}</span>
        : <Loading />
        }
      </div>
      <div className="w-full h-3 bg-900 rounded-full">
        <motion.div 
        className={`h-full rounded-full ${amount < budget ? "bg-accent" : "bg-danger"}`} 
        initial= {{ width: 0 }}
        animate= {{ width: `${percentage}%`}}
        transition= {{ duration: 0.5, delay: 0.05 * idx }}
        >
        </motion.div>
      {isCurrencyReady ?
      <div className="w-full mt-1 flex justify-between items-center text-small">
        <span className="">{formatCurrency(currencyData.baseCurrency, 0)}</span>
        <span className="right-0">{formatCurrency(currencyData.baseCurrency, budget)}</span>
      </div>
      : null}
      </div>
    </div>
  )
}

export default ProgressBar