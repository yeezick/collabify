import { useAppDispatch } from '@/redux/hooks'
import { setModalDisplayStatus } from '@/redux/slices/calendarSlice'
import { Clear } from '@mui/icons-material'
import { useState } from 'react'
import { DiscardChangesModal } from './DiscardChangesModal'

export const MeetingModalHeaderIcons = ({ handleCloseMeetingModal }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleCloseDiscardChanges = () => {
    setOpen(false)
    handleCloseMeetingModal()
  }

  return (
    <div className='meeting-modal-icons'>
      <Clear className='clear-icon' onClick={handleOpen} />
      <DiscardChangesModal
        handleClose={handleClose}
        handleCloseDiscardChanges={handleCloseDiscardChanges}
        open={open}
      />
    </div>
  )
}
