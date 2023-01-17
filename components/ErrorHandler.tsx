import { ReactNode } from "react"

type ErrorHandlerProps = {
  children: string
  pathname?: string
}

const ErrorHandler = ({ children, pathname }: ErrorHandlerProps) => {
  return (
    <div className="absolute bg-danger z-[100] text-xl py-10 w-full text-center bottom-0">
      {pathname ? <p>Location: {pathname}</p> : null}
      <p>ERROR: {children}</p>
    </div>
  )
}

export default ErrorHandler