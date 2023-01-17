import { motion } from 'framer-motion'
import { useSetting } from '../../context/SettingContext'
import { formatCurrency } from '../../utils/CurrencyHelper'
import { PieChartProps } from './PieChart'


const StatSummary = ({ dataGroupSum, backgroundColor }:PieChartProps) => {
  const sum = dataGroupSum.map(item => item.amount).reduce((a,b) => a+b, 0)
  const percentages = dataGroupSum.map(item => item.amount / sum * 100)
  const maxPercentage = Math.max(...percentages)
  const barLengthPercentages = percentages.map(item => item / maxPercentage * 100)
  return (
    <div className='my-4 flex flex-col gap-4'>
      {dataGroupSum.map((item,idx) => 
      <Item 
      key={item.name}
      category={item.name} 
      amount={item.amount} 
      percentage={percentages[idx]}
      barLengthPercentage = {barLengthPercentages[idx]} 
      backgroundColor={backgroundColor[idx]}
      />
      )}
    </div>
  )
}

type ItemProps = {
  category: string,
  amount: number,
  percentage: number,
  barLengthPercentage: number
  backgroundColor: string
}
const Item = ({ category, amount, percentage, barLengthPercentage, backgroundColor }:ItemProps) => {
  const { currencyData } = useSetting()
  return (
    <div>
      <div className="mb-2 flex flex-col">
        <span>{category}</span>
        <div className='flex justify-between items-center text-small'>
          <span>{formatCurrency(currencyData.baseCurrency, amount)}</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="w-full h-3 bg-900 rounded-full">
        <motion.div 
        className={`h-full rounded-full`}
        initial= {{ width: 0 }}
        animate= {{ width: `${barLengthPercentage}%`}}
        transition= {{ duration: 0.5 }} 
        style={{
          backgroundColor: backgroundColor,
        }}
        >
        </motion.div>
      </div>
    </div>
  )
}

export default StatSummary