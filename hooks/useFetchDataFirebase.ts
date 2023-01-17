import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from '../firebase'
import { onAuthStateChanged, User } from "firebase/auth"
import { Position } from "../context/SettingContext"

export function useFetchDataFirebase<T>(position:Position):[T[], boolean, () => void, React.Dispatch<React.SetStateAction<T[]>>] {
  const [value, setValue] = useState<T[]>([] as T[])
  const [isValueReady, setIsValueReady] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User|null>(null)

  const reloadValue = () => {setIsValueReady(false)}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!isValueReady && currentUser) {
      const fetchData = async() => {
        let data = [] as T[]
        const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, position))
        querySnapshot.forEach(doc => data.push({id: doc.id, ...doc.data()} as T))
        setValue(data)
        setIsValueReady(true)
      }
      fetchData()
    }
  }, [isValueReady, currentUser])
  return [value, isValueReady, reloadValue, setValue]
}