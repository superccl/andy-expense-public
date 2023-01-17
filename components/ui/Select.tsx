import React, { ReactNode } from 'react'

type SelectProps = {
  options: string[],
  label: string,
  error?: string,
  defaultValue?: string,
  value?:string,
  onChange?:(e:React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = React.forwardRef(({options, label, error='', defaultValue='', value, onChange}: SelectProps, ref:React.ForwardedRef<HTMLSelectElement>) => {
    return (
      <div className="flex py-2 gap-6">
        <label className="w-20 sm:w-24">{label}</label>
        <div>
          <select 
          defaultValue={value ? undefined : defaultValue}
          ref={ref} 
          name={label}  
          value={value} 
          onChange={onChange}
          className={`w-40 sm:w-60 h-7 pl-1 bg-900 ${error && "border-2 border-danger"}`}
          >
            <option hidden value=''> -- select an option -- </option>
              {options.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          {error ? <p className='text-danger'>Please select an option</p> : null}
        </div>
      </div>
    )
  }
)

export default Select