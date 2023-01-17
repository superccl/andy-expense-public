import Image from "next/image"
import { Currency } from "../../context/SettingContext"
import data from "../../currency_info.json"
import { getCurrencySymbol } from "../../utils/CurrencyHelper"
type CurrencyInfoItemProps = {
  code: Currency,
  selected?: boolean,
  onSubmit?: (code: Currency) => void
}

export type CurrencyInfo = {
  country: string,
  currency: string,
  code: Currency,
  symbol: string,
  fullName: string
  img: string,
  id: number
}

const CurrencyInfoItem = ({ code, selected=false, onSubmit }: CurrencyInfoItemProps) => {
  const selectedItem:CurrencyInfo = data.find(item => item.code === code) || {} as CurrencyInfo
  if (selected) {onSubmit = undefined}
  return (
    <button className={`flex justify-center items-center gap-3 py-2 px-6 sm:text-lg ${selected ? "cursor-default text-danger" : "bg-900 bg-hover"}`} onClick={() => onSubmit ? onSubmit(code) : null}>
      <div className="relative h-5 aspect-video">
        <Image fill src={`/assets/flags/${code}.png`} alt={`${selectedItem.country} flag`} />
      </div>
      <span className="w-10">{selectedItem.code}</span>
      <span className="flex-1">{selectedItem.fullName}</span>
      <span>({getCurrencySymbol(selectedItem.code)})</span>
      {/* <span>({selectedItem.symbol})</span> */}
    </button>
  )
}

export default CurrencyInfoItem