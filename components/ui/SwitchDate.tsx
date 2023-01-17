import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { useSetting } from "../../context/SettingContext"

const SwitchDate = () => {
  const { setMonthOffset, date } = useSetting()
  return (
  <div className="flex mt-2 h-10 px-6 bg-main w-main text-xl">
    <button onClick={() => setMonthOffset(monthOffset => monthOffset - 12)} className="bg-hover px-2"><FaAngleDoubleLeft /></button>
    <button onClick={() => setMonthOffset(monthOffset => monthOffset - 1)} className="bg-hover px-2"><FaAngleLeft /></button>
    <div className="flex-1 text-center text-lg self-center">{date.format('MMM YYYY')}</div>
    <button onClick={() => setMonthOffset(monthOffset => monthOffset + 1)} className="bg-hover px-2"><FaAngleRight /></button>       
    <button onClick={() => setMonthOffset(monthOffset => monthOffset + 12)} className="bg-hover px-2"><FaAngleDoubleRight /></button>
  </div>
  )
}

export default SwitchDate