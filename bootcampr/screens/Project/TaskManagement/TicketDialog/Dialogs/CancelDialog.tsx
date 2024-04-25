import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import {
  closeConfirmationDialog,
  closeVisibleTicketDialog,
} from '@/utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectConfirmationDialogType } from '@/redux/slices/taskBoardSlice'
import '../../styles/ConfirmationDialogs.scss'

export const CancelDialog = () => {
  const confirmationDialogType = useAppSelector(selectConfirmationDialogType)
  const dispatch = useAppDispatch()
  const handleCloseVisibleTicketDialog = () =>
    closeVisibleTicketDialog(dispatch)
  const handleCloseDialog = () => closeConfirmationDialog(dispatch)
  const openDialog = confirmationDialogType === 'cancel'

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='xs'>
      <DialogContent className='confirmation-dialog'>
        <h3>Close this story?</h3>
        <p>Any information you input or changes you made will not be saved.</p>
        <div className='buttons'>
          <SecondaryButton
            handler={handleCloseDialog}
            text='Cancel'
            variant='text'
          />
          <PrimaryButton
            disableElevation
            handler={handleCloseVisibleTicketDialog}
            text='Close'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
