import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Hero = () => {
  return (
    <div
    className='flex flex-col gap-8 p-8 bg-900 w-full justify-between sm:p-12 lg:p-20 lg:flex-row'
    >
      <motion.div 
      className='flex flex-col gap-4 justify-center items-start lg:w-1/2 lg:gap-8'  
      initial={{ opacity: 0, x: '-200px' }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.8 }}
      >
        <h1 className='text-4xl lg:text-5xl'>Financial Manager, Free and Easy</h1>
        <p className='text-lg lg:text-xl'>
        Build your saving habits and handle your expenses, assets, and debts all in one place.
        </p>
        <Link href="/signup" className='px-6 py-4 button-accent rounded text-lg lg:text-xl'>Try Andy Expense Free</Link>
      </motion.div>

      <motion.div 
      className='self-center'
      initial={{ opacity: 0, x: '200px' }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.8 }}
      >
        <Image
        width={512}
        height={512}
        src='/assets/Home/Hero.png' 
        alt="Hero image, smiley bussiness man spreading money with sunset in the background"
        priority
         />
      </motion.div>
    </div>
  )
}

export default Hero