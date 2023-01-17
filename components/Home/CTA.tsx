import { motion } from "framer-motion"
import Link from "next/link"

const CTA = () => {
  return (
    <motion.div 
    className="flex flex-col gap-6 items-center p-12"
    initial={{ opacity: 0, y: -50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      <h2 className="text-2xl lg:text-3xl">Take A Step Closer To Financial Independence</h2>
      <p className="text-lg lg:text-xl">Signup and start building your spending habits.</p>
      <Link href="/signup" className='px-6 py-4 button-accent rounded text-lg lg:text-xl'>Try Andy Expense Free</Link>
    </motion.div>
  )
}

export default CTA