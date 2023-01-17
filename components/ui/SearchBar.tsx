import { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"

interface SearchBarProps<T> {
  defaultData: T[],
  setData: (data:T[]) => void,
  matchKeys: Array<keyof T>,
  className?: string,
}

const SearchBar = <T extends Object>({ defaultData, setData, matchKeys, className=''}: SearchBarProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  
  useEffect(() => {
    setData(defaultData.filter(item => matchKeys.some((key) => (item[key] as string).toLowerCase().includes(searchString))))
  }, [searchString, defaultData])
  
  return (
    <div className={`h-[4.5rem] px-6 py-4 bg-main w-main`}>
      <div className={`flex items-center p-2 rounded-full bg-900 ${isFocus && "outline"} ${className}`}>
        <AiOutlineSearch size={25}/>
        <input 
        className="outline-none w-full pl-1 ml-1 bg-transparent" 
        type="text" 
        placeholder='Search' 
        ref={inputRef}
        value={searchString} 
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={e => setSearchString(e.target.value)}
        />
        <button 
        className='ml-auto mr-1'
        onClick={() => setSearchString('')}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

export default SearchBar