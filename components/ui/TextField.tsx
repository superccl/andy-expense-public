import React from "react"

type TextFieldProps = {
  label?: string,
  error?: string,
  [key:string]: any,
}

const TextField = React.forwardRef(({label='', error='', ...props}:TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="flex py-2 gap-6">
        {label && <label className="w-20 sm:w-24">{label}</label>}
        <div className={`${label ? "" : "w-full"}`}>
          <input ref={ref} type="text" className={`${label ? "w-40 sm:w-60" : "w-full"} h-7 pl-1 bg-900 ${error && "border-2 border-danger"}`} {...props}/>
          {error ? <p className='text-danger'>{error}</p> : null}
        </div>
      </div>
    )
  }
)


export default TextField