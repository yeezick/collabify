import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectAuthUser, selectUserId } from '@/redux/slices/userSlice'
import { selectProjectId } from '@/redux/slices/projectSlice'
import {
  resetTicketFields,
  setVisibleTicketDialog,
} from '@/redux/slices/taskBoardSlice'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const {
    _id: userId,
    payment: { experience },
  } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: experience === 'sandbox' ? 'starStruck' : userId,
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <Button
      className='create-ticket-btn'
      onClick={openCreateTicketDialog}
      startIcon={<AddIcon />}
      variant='contained'
    >
      Create story
    </Button>
  )
}
