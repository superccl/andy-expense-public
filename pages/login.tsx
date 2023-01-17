import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'
import Loading from "../components/ui/Loading"
import TextField from "../components/ui/TextField"
import { useSetting } from "../context/SettingContext"
import LoginWithProvider from "../components/Authentication/Provider/LoginWithProvider"
import Head from "next/head"


const Login = () => {
  const defaultErrors = {
    email: '',
    password: '',
  }
  const [errors, setErrors] = useState(defaultErrors)
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { currentUser, login } = useSetting()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setErrors(defaultErrors)

    const email = emailRef.current!.value.trim()
    const password = passwordRef.current!.value.trim()
    let checkErrors = Object.assign({}, defaultErrors)

    if (Object.values(checkErrors).every(item => item === '')) {
      login(email, password)
      .then(() => router.push('/transaction'))
      .catch(error => {
        setErrorMessage(error.code)
        setLoading(false)
      })
    } else {
      setErrors(checkErrors)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    console.log(currentUser)
    currentUser ? router.push("/transaction") : router.push("/login")
  }, [currentUser])
  
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <form className="px-6 py-4 flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
          <div className="text-3xl self-center my-4">Login</div>
          <TextField ref={emailRef} label="Email" type="email" error={errors.email} required/>
          <TextField ref={passwordRef} label="Password" type="password" error={errors.password} required/>
          <div className="self-stretch flex justify-between items-center gap-4">
            <Link href="/signup" className="text-sm txt-accent hover:underline underline-offset-2">Don't have an account?</Link>
            <Link href="/forgot-password" className="text-sm txt-accent hover:underline underline-offset-2">Forgot Password?</Link>
          </div>
          {<button disabled={loading} className="button-accent py-2 rounded mt-4 px-8 self-center">{loading ? <Loading /> : "Login"}</button>}
        </form>
        <p className="my-2">OR</p>
        <LoginWithProvider />
        {errorMessage && <div className="text-center text-danger bg-900 w-full py-2 mt-4">{errorMessage}</div>}
      </div>  
    </div>
  )
}

export default Login