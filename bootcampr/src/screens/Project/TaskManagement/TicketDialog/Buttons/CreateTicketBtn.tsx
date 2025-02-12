import { PrimaryButton } from 'components/Buttons'
import { createTicket } from 'utils/api/tickets'
import { successSnackbar } from 'utils/helpers/commentHelpers'
import {
  buildTicketPayload,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  addTicketToStatus,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CreateTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  const handleCreateTicket = async e => {
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await createTicket(ticketPayload)

    if (ticketResponse.error) {
      // display error banner
    } else {
      dispatch(addTicketToStatus(ticketResponse))
      dispatch(resetTicketFields({}))
      dispatch(successSnackbar('Task created!'))
      closeVisibleTicketDialog(dispatch)
    }
  }

  return (
    <PrimaryButton
      handler={handleCreateTicket}
      text={'Create story'}
      disableElevation
    />
  )
}
