import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  setModalDisplayStatus,
  selectDisplayedEvent,
  deleteExistingEvent,
} from '@/redux/slices/calendarSlice'
import { Close } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DisplayPopover } from './DisplayPopover'
import { deleteEvent } from '@/@/api/events'
import { selectCalendarId } from '@/redux/slices/projectSlice'
import { checkSandboxEvent } from '@/utils/helpers'

export const DisplayModalHeaderIcons = ({ handleClose, setDisplayMeeting }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const { eventId } = displayedEvent
  const calendarId = useAppSelector(selectCalendarId)
  const open = Boolean(anchorEl)
  const popoverId = open ? 'meeting-popover' : undefined

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClosePopover = () => setAnchorEl(null)
  const dispatch = useAppDispatch()

  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

  const handleDelete = async e => {
    try {
      await deleteEvent(calendarId, eventId)
      dispatch(deleteExistingEvent({ eventId }))
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='modal-icons'>
      {!checkSandboxEvent(eventId) && <MoreVertIcon onClick={handleClick} />}
      <DisplayPopover
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        popoverId={popoverId}
        open={open}
      />
      <Close onClick={handleClose} />
    </div>
  )
}
