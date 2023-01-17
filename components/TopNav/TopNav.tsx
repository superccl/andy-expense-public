import { BsBell as BellIcon} from 'react-icons/bs'
import Link from 'next/link'
import DarkModeToggle from './DarkMode'
import { useSetting } from '../../context/SettingContext'
import Image from 'next/image'

const TopNav = () => {
  const { currentUser } = useSetting()
  return (
    <div className="h-14 flex shadow justify-between items-center px-6 py-2">
      <Link className="font-logo text-2xl flex gap-4 items-center" href="/">
        <div className='relative h-14 aspect-square'>
          <Image 
          src='/assets/logo.ico'
          alt='logo with letter A'
          fill
          />
        </div>
        <span className='hidden sm:inline'>Andy Expense</span>
        </Link>
      <div className="flex h-full gap-4 sm:gap-6">
        <DarkModeToggle />
        {currentUser ?
        <>
          {/* <button>
            <BellIcon fontSize="25"/>
          </button>
          <button className='relative h-full aspect-square'>
            <Image fill src='/assets/profile.jpg' alt="profile" className='rounded-full'/>
          </button> */}
        </>
        :
        <>
          <Link href="/signup" className='px-4 py-2 button-accent rounded'>
            Signup
          </Link>
          <Link href="/login" className='px-4 py-2 border border-accent bg-hover rounded'>
            Login
          </Link>
        </>
        }
      </div>
    </div>
  )
}

export default TopNav