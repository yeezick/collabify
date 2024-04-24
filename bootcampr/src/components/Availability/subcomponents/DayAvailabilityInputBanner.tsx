import { Checkbox } from '@mui/material'
import { TimeSlotInput } from './TimeslotInput'
import { handleCheck } from '../utils/helpers'

export const DayAvailabilityInputBanner = ({ day, days, idx, setDays }) => {
  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <div className='check-day'>
            <Checkbox
              name={day}
              onChange={() => handleCheck(day, days, setDays)}
              sx={checkBoxStyle}
              checked={days[day].available}
            />
            <h2>{day}</h2>
          </div>
          {days[day]['available'] ? (
            <TimeSlotInput day={day} days={days} setDays={setDays} />
          ) : (
            <h2 className='unavailable'>Unavailable</h2>
          )}
        </div>
      </div>
      {day !== 'SAT' && <hr />}
    </div>
  )
}

const checkBoxStyle = {
  color: 'black',
  '&.Mui-checked': { color: '#022888' },
}
