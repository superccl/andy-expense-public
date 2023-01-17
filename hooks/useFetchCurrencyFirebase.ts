import { onAuthStateChanged, User } from "firebase/auth"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import moment from "moment"
import { useEffect, useState } from "react"
import { ConversionData, CurrencyData } from "../context/SettingContext"
import { auth, db } from "../firebase"



export function useFetchCurrencyFirebase() {
  const [currencyData, setCurrencyData] = useState<CurrencyData>({} as CurrencyData)
  const [conversionData, setConversionData] = useState<ConversionData>({} as ConversionData)
  const [isCurrencyReady, setIsCurrencyReady] = useState(false)
  const [isConversionReady, setIsConversionReady] = useState(false)
  const [currentUser, setCurrentUser] = useState<User|null>(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const reloadConversion = () => {setIsConversionReady(false)}



  useEffect(() => {
    if (!isCurrencyReady && currentUser) {
      const fetchData = async() => {
        const data = [] as CurrencyData[]
        const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'currency'))
        querySnapshot.forEach(doc => data.push({id: doc.id, ...doc.data()} as CurrencyData))
        setCurrencyData(data[0])
        setIsCurrencyReady(true)
      }
      fetchData()
    }
  }, [isCurrencyReady, currentUser])

  useEffect(() => {
    if (isCurrencyReady && !isConversionReady && currentUser) {
      const fetchData = async() => {
        const res = await getDoc(doc(db, 'conversion', 'conversion'))
        const data = res.data()!
        const dayOffset = (+moment() - +moment(data.date, 'YYYY-MM-DD')) / 1000 / 86400
        // console.log(data.date, dayOffset)
        if(dayOffset>= 2) {
          setIsConversionReady(true)
          fetchConversionData()
        } else {
          const baseRate = data.rates[currencyData.baseCurrency]
          setConversionData(Object.keys(data.rates).reduce((prev, code) => Object.assign(prev, {[code]: data.rates[code] / baseRate}), {} as ConversionData))
          setIsConversionReady(true)
        }
      }
      fetchData()
    }
  }, [isConversionReady, currentUser, isCurrencyReady])

  async function fetchConversionData() {
    const res = await fetch(`https://api.exchangerate.host/latest`)
    const data = await res.json()
    console.log(data)
    const dayOffset = (+moment() - +moment(data.date, 'YYYY-MM-DD')) / 1000 / 86400
    if (dayOffset < 2) {
      setDoc(doc(db, 'conversion', 'conversion'), {base: data.base, date: data.date, rates: data.rates})
      setIsConversionReady(false)
      // console.log('Conversion data is updated')
    } else {
      // console.log(data.date, 'Conversion data is NOT updated')
    }

  }

  return {currencyData, conversionData, isCurrencyReady, isConversionReady, reloadConversion, setCurrencyData}
}