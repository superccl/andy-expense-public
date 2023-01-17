import { ReactNode } from "react"

type SettingRowProps = {
  icon?: ReactNode,
  name: string,
  children?: ReactNode,
  hover?: boolean
  handleClick?: () => void
}
const SettingRow = ({ icon, name, children, hover=false, handleClick}:SettingRowProps) => {
  return (
    <div className={`flex justify-start items-center gap-4 bg-900 shadow-sm p-4 ${hover ? "bg-hover" : ""}`} onClick={handleClick}>
      {icon ? <div>{icon}</div> : null}
      <div>{name}</div>
      <div className="ml-auto">{children}</div>
    </div>
  )
}

export default SettingRow