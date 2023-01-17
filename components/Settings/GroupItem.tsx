type GroupItemProps = {
  category: string,
  onDelete: (item:string) => void
}

const GroupItem = ({ category, onDelete }: GroupItemProps) => {
  return (
    <div className='flex items-center p-2 pl-4 w-main text-lg hover:bg-900'>
      <span>{category}</span>
      <button className='bg-danger rounded px-4 py-2 ml-auto mr-2' onClick={() => onDelete(category)}>Delete</button>
    </div>
  )
}

export default GroupItem