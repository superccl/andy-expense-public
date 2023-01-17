import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import 'chart.js/auto'
import type { ChartData, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2';
import { getCurrencySymbol } from '../../utils/CurrencyHelper';
import { useSetting } from '../../context/SettingContext';
import { clamp } from 'lodash';

export type PieChartProps = {
  dataGroupSum: {name: string, amount: number}[]
  backgroundColor: string[]
}
const PieChart = ({ dataGroupSum, backgroundColor }:PieChartProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { currencyData } = useSetting()
  
  const data = {
    labels: dataGroupSum.map(item => item.name),
    datasets: [
      {
        label: `Expenses (${getCurrencySymbol(currencyData.baseCurrency)}) `,
        data: dataGroupSum.map(item => item.amount),
        backgroundColor: backgroundColor,
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='flex justify-center items-center' style={{height: 'clamp(40vw,500px,85vw)'}}>
      <Pie data={data} style={{height: 'clamp(40vw,500px,85vw)'}}/>
    </div>

  )
}

export default PieChart