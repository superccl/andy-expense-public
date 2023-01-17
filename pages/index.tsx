import { useSetting } from "../context/SettingContext"
import CTA from "../components/Home/CTA"
import Hero from "../components/Home/Hero"
import MainFeatures from "../components/Home/MainFeatures"
import SideFeatures from "../components/Home/SideFeatures"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Home = () => {
  const { currentUser } = useSetting()
  const router = useRouter()
  useEffect(() => {
    currentUser ? router.push("/transaction") : router.push("/")
  }, [])
  return (
    <div className="flex flex-col items-center overflow-y-auto overflow-x-hidden">
      <Hero />
      <MainFeatures />
      <SideFeatures />
      <CTA />
    </div>
  )
}

export default Home