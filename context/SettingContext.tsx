import { AuthProvider, createUserWithEmailAndPassword, getAdditionalUserInfo, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, User, UserCredential } from "firebase/auth"
import moment from "moment"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { useFetchDataFirebase } from "../hooks/useFetchDataFirebase"
import defaultData from "../db_default.json"
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useFetchCurrencyFirebase } from "../hooks/useFetchCurrencyFirebase"

type SettingProviderProps = {
  children: ReactNode
}

export type Currency = string

export type AccountData = {
  id: string,
  category: string,
  name: string,
  amount: number,
  currency: Currency,
  description: string
}

export type TransactionData = {
  id: string,
  type: 'income' | 'expenses',
  date: string,
  time: string,
  accountId: string,
  category: string,
  name: string
  amount: number,
  currency: Currency,
  description: string
}

export type CurrencyData = {
  id: string
  baseCurrency: Currency,
  currencyGroup: Currency[],
}

export type ExpensesCategory = {
  category: string,
  budget: number,
  id: string
}

export type IncomeCategory = {
  id: string
  category: string
}

export type AccountCategory = {
  id: string
  category: string
}

export type ConversionData = {
  [key: Currency]: number
}

export enum Status {
  FAIL,
  SUCCESS
}

type GetSetValueProps<T> = {
  [key in Position]: React.Dispatch<React.SetStateAction<(T & { id: string} )[]>>
}


export type Position = 'transaction' | 'account' | 'currency' | 'incomeCategory' | 'expensesCategory' | 'accountCategory'
type Method = 'POST' | 'PUT' | 'DELETE'

type SettingContext = {
  currentUser: User | null,
  signupAndInitializeDb: (email: string, password: string) => Promise<DocumentReference<DocumentData>>,
  signInWithProvider: (provider: AuthProvider) => Promise<void>
  login: (email: string, password: string) => Promise<UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  updateEmailInfo: (email: string) => Promise<void>,
  updatePasswordInfo: (password: string) => Promise<void>,
  transactionData: TransactionData[],
  accountData: AccountData[],
  currencyData: CurrencyData,
  incomeCategory: IncomeCategory[],
  expensesCategory: ExpensesCategory[],
  accountCategory: AccountCategory[],
  conversionData: ConversionData,
  monthOffset: number,
  setMonthOffset: React.Dispatch<React.SetStateAction<number>>,
  date: moment.Moment,
  isDark: boolean
  isTransactionReady: boolean,
  isAccountReady: boolean,
  isCurrencyReady: boolean,
  isIncomeCategoryReady: boolean,
  isExpensesCategoryReady: boolean,
  isAccountCategoryReady: boolean,
  isConversionReady: boolean,
  setTransactionDataFull: React.Dispatch<React.SetStateAction<TransactionData[]>>,
  setAccountData: React.Dispatch<React.SetStateAction<AccountData[]>>,
  setCurrencyData: React.Dispatch<React.SetStateAction<CurrencyData>>,
  setIncomeCategory: React.Dispatch<React.SetStateAction<IncomeCategory[]>>,
  setExpensesCategory: React.Dispatch<React.SetStateAction<ExpensesCategory[]>>,
  setAccountCategory: React.Dispatch<React.SetStateAction<AccountCategory[]>>,
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
  accountIdToName: (accountId:string) => string
  handleFetch: <T>(position: Exclude<Position, 'currency'>, method: Method, setValue:React.Dispatch<React.SetStateAction<(T & {id:string})[]>>, submittedItem?: T, id?: string) => Status,
  handleFetchCurrency: (submittedItem:CurrencyData | Omit<CurrencyData, "id">) => void
}

const SettingContext = createContext({} as SettingContext)
export function useSetting() {
  return useContext(SettingContext)
} 

export function SettingProvider({ children }: SettingProviderProps) {
  const [currentUser, setCurrentUser] = useState<User|null>(null)
  const [transactionDataFull, isTransactionReady, reloadTransaction, setTransactionDataFull] = useFetchDataFirebase<TransactionData>('transaction')
  const [accountData, isAccountReady, reloadAccount, setAccountData] = useFetchDataFirebase<AccountData>('account')
  const {currencyData, conversionData, isCurrencyReady, isConversionReady, reloadConversion, setCurrencyData} = useFetchCurrencyFirebase()
  const [incomeCategory, isIncomeCategoryReady, reloadIncomeCategory, setIncomeCategory] = useFetchDataFirebase<IncomeCategory>('incomeCategory')
  const [expensesCategory, isExpensesCategoryReady, reloadExpensesCategory, setExpensesCategory] = useFetchDataFirebase<ExpensesCategory>('expensesCategory')
  const [accountCategory, isAccountCategoryReady, reloadAccountCategory, setAccountCategory] = useFetchDataFirebase<AccountCategory>('accountCategory')
  const [monthOffset, setMonthOffset] = useState<number>(0)
  const [date, setDate] = useState(moment())
  const [loading, setLoading] = useState<boolean>(true)
  const [transactionData, setTransactionData] = useState<TransactionData[]>([] as TransactionData[])
  const [isDark, setIsDark] = useState<boolean>(
    typeof window !== 'undefined' &&     
    ( localStorage.theme === 'dark' || 
      (
        !('theme' in localStorage) 
        && window.matchMedia('(prefers-color-scheme: dark)').matches
      ) 
    )
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    setDate(moment().add(monthOffset, 'months'))
  }, [monthOffset])

  useEffect(() => {
    setTransactionData(transactionDataFull.filter(item => item.date.slice(0, 7) === date.format('YYYY-MM')))
  }, [transactionDataFull, date])

  async function signupAndInitializeDb(email:string, password:string) {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const docRef = await initializeDb(res.user.uid)
    return docRef
  }

  async function signInWithProvider(provider: AuthProvider) {
    const res = await signInWithPopup(auth, provider)
    const { isNewUser } = getAdditionalUserInfo(res)!
    if (isNewUser) initializeDb(res.user.uid)
  }

  async function initializeDb(uid: string) {
    await defaultData.expensesCategory.forEach(item => addDoc(collection(db, 'users', uid, 'expensesCategory'), item))
    await defaultData.incomeCategory.incomeCategory.forEach(item => addDoc(collection(db, 'users', uid, 'incomeCategory'), {category: item}))
    await defaultData.accountCategory.accountCategory.forEach(item => addDoc(collection(db, 'users', uid, 'accountCategory'), {category: item}))
    const docRef = addDoc(collection(db, 'users', uid, 'currency'), defaultData.currency)
    return docRef
  }
    
  function login(email:string, password:string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email:string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmailInfo(email:string) {
    return updateEmail(currentUser!, email)
  }

  function updatePasswordInfo(password:string) {
    return updatePassword(currentUser!, password)
  }

  function accountIdToName(accountId:string):string {
    if (!isAccountReady) return ''
    const item = accountData.find(item => item.id === accountId)!
    return item.category + ': ' + item.name
  }

  function handleDataChange<T>(method:Method, setValue:React.Dispatch<React.SetStateAction<(T & {id:string})[]>>, id: string, submittedItem?: T):void {
    if (method === 'POST' && submittedItem) {
      const newItem = {id: id, ...submittedItem}
      setValue(value => [...value, newItem])
      return;
    }
    if (method === 'DELETE') {
      setValue(value => value.filter(item => item.id !== id))
      return;
    }
    if (method === 'PUT') {
      setValue(value => value.map(item => item.id === id ? {...item, ...submittedItem} : item))
      return;
    }
  }

  function handleFetch<T>(position: Exclude<Position, 'currency'>, method: Method, setValue:React.Dispatch<React.SetStateAction<(T & {id:string})[]>>, submittedItem?: T, id?: string) {
    const userId = currentUser!.uid
    if(method === 'POST' && submittedItem && !id) {
      addDoc(collection(db, 'users', userId, position), submittedItem)
      .then(doc => {
        handleDataChange(method, setValue, doc.id, submittedItem)
      })
      .catch(error => {console.log(error)})
      return Status.SUCCESS
    } 
    if (method === 'DELETE' && !submittedItem && id && position) {
      deleteDoc(doc(db, 'users', userId, position, id))
      .then(() => {
        handleDataChange(method, setValue, id, undefined)
      })
      .catch(error => {console.log(error)})
      return Status.SUCCESS
    } 
    if (method === 'PUT' && submittedItem && id) {
      updateDoc(doc(db, 'users', userId, position, id), submittedItem)
      .then(() => {
        handleDataChange(method, setValue, id, submittedItem)
      })
      .catch(error => {console.log(error)})
      return Status.SUCCESS
    }
    console.log('Please provide the correct variables')
    return Status.FAIL
  }

  function handleFetchCurrency(submittedItem:CurrencyData | Omit<CurrencyData, "id">) {
    setCurrencyData(data => ({...data, ...submittedItem}))
    updateDoc(doc(db, 'users', currentUser!.uid, 'currency', currencyData.id), submittedItem)
    reloadConversion()
  }

  return (
    <SettingContext.Provider
      value={{
        currentUser,
        signupAndInitializeDb,
        signInWithProvider,
        login,
        logout,
        resetPassword,
        updateEmailInfo,
        updatePasswordInfo,
        transactionData,
        accountData,
        currencyData,
        incomeCategory,
        expensesCategory,
        accountCategory,
        conversionData,
        monthOffset,
        setMonthOffset,
        date,
        isDark,
        isTransactionReady,
        isAccountReady,
        isCurrencyReady,
        isIncomeCategoryReady,
        isExpensesCategoryReady,
        isAccountCategoryReady,
        isConversionReady,
        setTransactionDataFull,
        setAccountData,
        setCurrencyData,
        setIncomeCategory,
        setExpensesCategory,
        setAccountCategory,
        setIsDark,
        accountIdToName,
        handleFetch,
        handleFetchCurrency
      }}
    
    >
      {!loading && children}
    </SettingContext.Provider>
  )
}
