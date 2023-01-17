import { motion } from 'framer-motion'
import { BiLockAlt, BiCustomize, BiDevices } from 'react-icons/bi'
type SideFeaturesItemProps = {
  title: string,
  description: string,
  logo: JSX.Element
}

const SideFeatures = () => {
  return (
    <motion.div 
    className="bg-900 p-12 w-full flex flex-col items-center"
    >
      <h2 className='text-3xl lg:text-4xl mb-6 w-full text-center'>Why You Should Choose Andy Expense</h2>
      <div className='grid grid-rows-3 grid-cols-1 gap-4 lg:grid-rows-1 lg:grid-cols-3'>
        <SideFeaturesItem
        title='Customize Your Options'
        description='Review and adjust different categories with a few taps.'
        logo={<BiCustomize size={25}/>}
        />
        <SideFeaturesItem
        title='One Account for All Devices'
        description='View your data on any device with one account — Laptop, tablet, or phone.'
        logo={<BiDevices size={25}/>}
        />
        <SideFeaturesItem
        title='Secure Your Data'
        description='Privacy is our main goal. Your information is secure in our encrypted database.'
        logo={<BiLockAlt size={25}/>}
        />
      </div>    
    </motion.div>
  )
}

const SideFeaturesItem = ({title, description, logo}:SideFeaturesItemProps) => {
  return (
    <motion.div    
    initial={{ opacity: 0, x: '-200px' }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ ease: 'easeInOut', duration: 0.8 }}
    >
      <div className='flex gap-4 items-center my-4'>
        {logo}
        <h3 className="text-2xl">{title}</h3>
      </div>
      <p className="">{description}</p>
    </motion.div>
  )
}

export default SideFeatures