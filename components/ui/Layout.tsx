import { ReactNode } from 'react'
import { SettingProvider } from '../../context/SettingContext'
import Navbar from '../Navbar/Navbar'
import TopNav from '../TopNav/TopNav'

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }:LayoutProps) {
  return (
    <SettingProvider>
      <div className='sticky w-full'>
        <TopNav />
        <Navbar />
      </div>
      <>
        {children}
      </>
    </SettingProvider>
  )
}