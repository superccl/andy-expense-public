import Link from 'next/link'
import { TfiWallet as AccountIcon} from "react-icons/tfi"
import { FaExchangeAlt as TransactionIcon} from 'react-icons/fa'
import { BsCalculator as BudgetIcon} from 'react-icons/bs'
import { AiOutlinePieChart as StatsIcon, AiOutlineSetting as SettingsIcon} from 'react-icons/ai'
import { useSetting } from "../../context/SettingContext"
import { useRouter } from 'next/router'

const Navbar = () => {
  const { currentUser } = useSetting()
  const { pathname } = useRouter()

  if (!currentUser) return null;
  return (
    <>
      <div className="h-14 bg-900 text-2xl flex justify-around items-center shadow w-full xl:hidden">
        <Link className={`${pathname === '/transaction' && 'active'} flex-1 h-full flex justify-center items-center bg-hover`} href="/transaction"><TransactionIcon/></Link>
        <Link className={`${pathname === '/account' && 'active'} flex-1 h-full flex justify-center items-center bg-hover`} href="/account"><AccountIcon /></Link>
        <Link className={`${pathname === '/budget' && 'active'} flex-1 h-full flex justify-center items-center bg-hover`} href="/budget"><BudgetIcon /></Link>
        <Link className={`${pathname === '/stats' && 'active'} flex-1 h-full flex justify-center items-center bg-hover`} href="/stats"><StatsIcon /></Link>
        <Link className={`${pathname === '/settings' && 'active'} flex-1 h-full flex justify-center items-center bg-hover`} href="/settings"><SettingsIcon /></Link>
      </div>

      <div className="mt-2 hidden h-full absolute flex-col xl:flex mx-4 z-1" style={{width: 'clamp(200px, calc(50vw - 433px), 275px)'}}>
        <Link className="bg-hover px-4 flex items-center gap-4 py-2 rounded-lg" href="/transaction">
          <TransactionIcon className="text-2xl"/>
          <span className="text-lg">Transaction</span>
        </Link>
        <Link className="bg-hover px-4 flex items-center gap-4 py-2 rounded-lg" href="/account">
          <AccountIcon className="text-2xl"/>
          <span className="text-lg">Account</span>
        </Link>
        <Link className="bg-hover px-4 flex items-center gap-4 py-2 rounded-lg" href="/budget">
          <BudgetIcon className="text-2xl"/>
          <span className="text-lg">Budget</span>
        </Link>
        <Link className="bg-hover px-4 flex items-center gap-4 py-2 rounded-lg" href="/stats">
          <StatsIcon className="text-2xl"/>
          <span className="text-lg">Statistics</span>
        </Link>
        <Link className="bg-hover px-4 flex items-center gap-4 py-2 rounded-lg" href="/settings">
          <SettingsIcon className="text-2xl"/>
          <span className="text-lg">Settings</span>
        </Link>
      </div>
    </>
  )
}

export default Navbar