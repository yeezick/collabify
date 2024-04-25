import { SecondaryButton } from 'components/Buttons'
import { toggleCancelDialog } from '@/utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectProjectId } from '@/redux/slices/projectSlice'
import { selectTicketFields } from '@/redux/slices/taskBoardSlice'
import { selectUserId } from '@/redux/slices/userSlice'

export const CancelTicketBtn = () => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCancel = () =>
    toggleCancelDialog(dispatch, userId, projectId, ticketFields)

  return (
    <SecondaryButton
      handler={handleCancel}
      text={'Cancel'}
      sx={{ backgroundColor: '#fff' }}
    />
  )
}
