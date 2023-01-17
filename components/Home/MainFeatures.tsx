import currencyDark from '../../public/assets/Home/dark/currency.png'
import searchBarDark from '../../public/assets/Home/dark/search_bar.png'
import statsDark from '../../public/assets/Home/dark/stats.png'
import budgetDark from '../../public/assets/Home/dark/budget.png'
import currencyLight from '../../public/assets/Home/light/currency.png'
import searchBarLight from '../../public/assets/Home/light/search_bar.png'
import statsLight from '../../public/assets/Home/light/stats.png'
import budgetLight from '../../public/assets/Home/light/budget.png'
import { useSetting } from '../../context/SettingContext'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

type MainFeaturesItemProps = {
  title: string,
  description: string,
  imagePath: string | StaticImageData,
  imageAlt: string,
  isEven?: boolean
}

const MainFeatures = () => {
  const { isDark } = useSetting()
  return (
    <div className="flex flex-col gap-20 my-10 p-6 sm:p-12 lg:w-[85vw]">
      <MainFeaturesItem
      title='Record cash flow seamlessly worldwide'
      description='Include all kinds of currencies with a real-time updates in conversion rates.'
      imagePath={isDark ? currencyDark : currencyLight}
      imageAlt='Screenshot from the transaction page that shows transactions in different currencies, and the total value is based on base currency with real-time conversion rates'
      />
      <MainFeaturesItem
      title='Find Things Easily'
      description='Filter your desired info with powerful, flexible search abilities.'
      imagePath={isDark ? searchBarDark : searchBarLight}
      imageAlt='Screenshot from the currency select page that shows a search bar and the filtered results based on input.'
      isEven
      />
      <MainFeaturesItem
      title='Review expenses concisely'
      description='Gain insights into your spending habits with aesthetic charts and focus on your main spending category.'
      imagePath={isDark ? statsDark : statsLight}
      imageAlt='Screenshot from the Statistics page'
      />
      <MainFeaturesItem
      title='Create Your Financial Plans'
      description='Review your saving goals at a glance and prevent you from extra spending.'
      imagePath={isDark ? budgetDark : budgetLight}
      imageAlt='Screenshot from the Budget page'
      isEven
      />
    </div>
  )
}

const MainFeaturesItem = ({title, description, imagePath, imageAlt, isEven=false}: MainFeaturesItemProps) => {
  return (
    <motion.div 
    className={`flex flex-col items-center gap-8 lg:space-between lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    initial={{ opacity: 0, x: `${isEven ? '-200px' : '200px'}` }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ ease: 'easeInOut', duration: 0.8 }}
    >
      <div className='relative w-full lg:w-1/2 aspect-video'>
        <Image
        fill
        src={imagePath}
        alt={imageAlt}
        style={{objectFit: 'contain'}}
        // onLoadingComplete={({ naturalWidth, naturalHeight }) => {
        //   setRatio(naturalWidth / naturalHeight);
        // }}
        />
      </div>
      <div className='flex flex-col gap-8 lg:w-1/2 justify-center'>
        <h2 className="text-3xl text-center">{title}</h2>
        <p className='text-lg'>{description}</p>
      </div>
    </motion.div>
  )
}

export default MainFeatures