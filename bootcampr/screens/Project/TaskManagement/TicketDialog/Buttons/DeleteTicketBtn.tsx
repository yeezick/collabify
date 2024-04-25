import { SecondaryButton } from 'components/Buttons'
import { useAppDispatch } from '@/redux/hooks'
import { setConfirmationDialogType } from '@/redux/slices/taskBoardSlice'

export const DeleteTicketBtn = () => {
  const dispatch = useAppDispatch()
  const handleOpenDeleteDialog = () =>
    dispatch(setConfirmationDialogType('delete'))

  return (
    <SecondaryButton
      handler={handleOpenDeleteDialog}
      text={'Delete story'}
      sx={{ background: '#fff', borderColor: '#d32f2f', color: '#d32f2f' }}
    />
  )
}