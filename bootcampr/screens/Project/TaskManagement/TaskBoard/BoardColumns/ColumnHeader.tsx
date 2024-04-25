import { formatTaskStatus } from '@/utils/helpers/taskHelpers'
import { useAppSelector } from '@/redux/hooks'
import { selectVisibleTickets } from '@/redux/slices/taskBoardSlice'

export const ColumnHeader = ({ columnStatus }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)
  return (
    <div className='column-header'>
      <p>{formatTaskStatus(columnStatus)}</p>
      <span>{visibleTickets[columnStatus].length}</span>
    </div>
  )
}
