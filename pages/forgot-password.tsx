import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import TextField from "../components/ui/TextField"
import { useSetting } from "../context/SettingContext"
import { useRouter } from 'next/router'
import Head from "next/head"


const ForgotPassword = () => {
  const forgotPasswordRef = useRef<HTMLInputElement>(null)
  const { resetPassword, currentUser } = useSetting()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const router = useRouter()

  function handleSubmit(e:React.FormEvent) {
    setIsSubmitted(true)
    e.preventDefault()
    resetPassword(forgotPasswordRef.current!.value.trim())
  }
  if (isSubmitted) return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col p-6 gap-6" style={{width: "min(500px, 80vw)"}}>
        <div className="text-2xl">Password Reset Request Sent</div>
        <p>
          A password reset message has been sent to {forgotPasswordRef.current!.value.trim()}
        </p>
        <p>
          Please click the link in the message to reset your password.
          If you cannot see the message, please check your junk mailbox.
        </p>
        <Link href="/login" className="px-6 py-2 self-center button-accent rounded">Back to Login</Link>
      </div>
    </div>
  )

  useEffect(() => {
    currentUser ? router.push("/transaction") : router.push("/forgot-password")
  }, [])
  
  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="flex flex-col items-center" style={{width: "min(500px, 80vw)"}}>
        <div className="text-3xl my-4">Find My Account</div>
        <p className="self-start">Please enter your email address to search for your account.</p>
        <form 
        className="mt-2 flex flex-col gap-4 w-full" 
        onSubmit={handleSubmit}
        >
          <TextField ref={forgotPasswordRef} placeholder="Email Address" type="email" required />
          <button className="px-6 py-2 button-accent self-center rounded">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword