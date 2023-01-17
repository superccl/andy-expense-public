import { useEffect, useRef, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loading from "../components/ui/Loading"
import TextField from "../components/ui/TextField"
import { useSetting } from "../context/SettingContext"
import SignInWithProvider from "../components/Authentication/Provider/LoginWithProvider"
import Head from "next/head"


const Signup = () => {
  const defaultErrors = {
    email: '',
    password: '',
    passwordConfirm: ''
  }
  const [errors, setErrors] = useState(defaultErrors)
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { currentUser, signupAndInitializeDb } = useSetting()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setErrors(defaultErrors)

    const email = emailRef.current!.value.trim()
    const password = passwordRef.current!.value.trim()
    const passwordConfirm = passwordConfirmRef.current!.value.trim()
    let checkErrors = Object.assign({}, defaultErrors)

    if (password.length < 8) {
      checkErrors.password = 'Password length must be at least 8 characters'
    }

    if (password !== passwordConfirm) {
      checkErrors.passwordConfirm = 'Passwords do not match'
    }

    if (Object.values(checkErrors).every(item => item === '')) {
      signupAndInitializeDb(email, password)
      .then(() => router.push('/login'))
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
    currentUser ? router.push("/transaction") : router.push("/signup")
  }, [currentUser])
  
  return (
    <div>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="flex flex-col h-full justify-center items-center">
        <form className="px-6 py-4 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="text-3xl self-center my-4">Sign up</div>
          <TextField ref={emailRef} label="Email" type="email" error={errors.email} required/>
          <TextField ref={passwordRef} label="Password" type="password" error={errors.password} required/>
          <TextField ref={passwordConfirmRef} label="Confirm Password" type="password" error={errors.passwordConfirm} required/>
          {<button disabled={loading} className="button-accent py-2 rounded mt-4 px-8 self-center">{loading ? <Loading /> : "Sign up"}</button>}
        </form>
        <p className="self-center mt-2">Already have account? <Link href="/login" className="text-accent hover:underline underline-offset-2">Login</Link></p>
        <p className="my-2">OR</p>
        <SignInWithProvider />
      </div>
      {errorMessage && <div className="text-center text-danger bg-900 w-full py-2 mt-4">{errorMessage}</div>}
    </div>
  )
}

export default Signup