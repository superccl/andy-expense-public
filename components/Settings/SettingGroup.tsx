import { ReactNode } from "react"

type SettingGroupProps = {
  icon?: ReactNode,
  name: string,
  children: ReactNode
}
const SettingGroup = ({ icon, name, children }: SettingGroupProps) => {
  return (
    <>
      <div className="flex justify-start items-center gap-4 shadow p-4">
        <div>{icon}</div>
        <div>{name}</div>
      </div>
      <div className="flex flex-col shadow">
        <div>{children}</div>
      </div>
    </>
  )
}

export default SettingGroup