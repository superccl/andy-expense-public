import { useSetting } from '../../../context/SettingContext'
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

type ProviderCompany = 'Google' | 'Facebook'
type LoginButtonProps = {
  iconPath: string | StaticImageData,
  provider: ProviderCompany
}
function LoginWithProvider() {
  return (
    <div className='w-[300px] flex flex-col items-center gap-4'>
      <LoginButton iconPath='/assets/SignInButtons/google.png' provider='Google' />
      <LoginButton iconPath='/assets/SignInButtons/facebook.png' provider='Facebook' />
    </div>
  )
}


const LoginButton = ({iconPath, provider}:LoginButtonProps) => {
  const { signInWithProvider } = useSetting()
  const router = useRouter()

  function handleClick(providerCompany:ProviderCompany) {
    const provider = {
      Google: new GoogleAuthProvider(),
      Facebook: new FacebookAuthProvider()
    }
    signInWithProvider(provider[providerCompany])
  }

  return (
    <button 
    className='border w-full px-6 py-2 rounded-full flex justify-center items-center gap-4 bg-hover'
    onClick={() => handleClick(provider)}
    >
      <div className='relative h-6 aspect-square'>
       <Image fill src={iconPath} alt={`icon of ${provider}`}/>
      </div>
      <span>Continue with {provider}</span>
    </button>
  )
}


export default LoginWithProvider