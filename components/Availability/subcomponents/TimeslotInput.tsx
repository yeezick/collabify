import { AddRounded, ContentCopyOutlined } from '@mui/icons-material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { SelectTimeInput } from './SelectTimeInput'
import { useState, useEffect } from 'react'
import './CopyTimesModal.scss'
import { useDispatch } from 'react-redux'
import { setUserAvailability } from '@/redux/slices/userSlice'
import {
  consolidateAvailability,
  deleteTimeSlot,
  addTimeSlot,
  renderCopyTimesModal,
  copyTimes,
} from '../@/utils/helpers'
import { weekdaysMap } from '../@/utils/data'
import { BCToolTip } from 'components/ToolTip/ToolTip'
import { CopyTimesModal } from './CopyTimesModal'

export const TimeSlotInput = ({ day, days, setDays }) => {
  const dispatch = useDispatch()
  const [displayModal, toggleDisplayModal] = useState({
    0: false,
  })

  const getDisplay = idx => {
    return displayModal[idx]
  }

  useEffect(() => {
    dispatch(setUserAvailability(days))
  }, [days])

  const handleRenderModal = (e, idx) => {
    renderCopyTimesModal(idx, displayModal, toggleDisplayModal)
  }

  return (
    <div className='timeslots-container'>
      {consolidateAvailability(days[day].availability).map((slot, idx) => (
        <div key={`${slot}-${idx}`} className='timeslot-input'>
          <div className='left-banner'>
            <SelectTimeInput
              isStart={true}
              idx={idx}
              slot={slot}
              day={day}
              days={days}
              setDays={setDays}
            />
            <h4>--</h4>
            <SelectTimeInput
              isStart={false}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
              setDays={setDays}
            />
            <div className='clickable-icon'>
              <FaRegTrashAlt
                className='react-icon'
                onClick={() => deleteTimeSlot(day, days, setDays, idx)}
              />
            </div>
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <BCToolTip
                text={`New time block for ${weekdaysMap[day]}`}
                child={
                  <div className='clickable-icon'>
                    <AddRounded
                      onClick={() => addTimeSlot(day, days, setDays, idx)}
                      className='icon'
                    />
                  </div>
                }
              />
            )}
            <div>
              {getDisplay(idx) && (
                <CopyTimesModal
                  days={days}
                  day={day}
                  idx={idx}
                  copyTimes={copyTimes}
                  setDays={setDays}
                  handleRenderModal={handleRenderModal}
                />
              )}
              <BCToolTip
                text='Copy available time to other days'
                child={
                  <div className='clickable-icon'>
                    <ContentCopyOutlined
                      onClick={e => handleRenderModal(e, idx)}
                      className='icon'
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
