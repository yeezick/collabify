import { handleReduxInputChange } from '@/utils/helpers'
import { MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectMembersAsTeam } from '@/redux/slices/projectSlice'
import {
  selectTicketFields,
  setTicketFields,
} from '@/redux/slices/taskBoardSlice'
import { useEffect } from 'react'
import { TicketTextLabel } from './TicketTextFields'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'

export const SelectAssignee = () => {
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const { assignee } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!assignee) {
      dispatch(setTicketFields({ assignee: 'Unassigned' }))
    }
  }, [])

  const handleAssigneeChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  return (
    <div className='assignee'>
      <TicketTextLabel icon='person' label='Assignee' />
      <Select
        className='select'
        name={'assignee'}
        onChange={handleAssigneeChange}
        value={assignee}
      >
        <MenuItem value='Unassigned'>
          <div className='unassigned-card'>
            <TeamAvatar userId={'Unassigned'} size='small' />
            <div className='assignee-metadata'>
              <p className='name'>Unassigned</p>
            </div>
          </div>
        </MenuItem>
        {projectMembers.map(member => (
          <MenuItem key={member._id} value={member._id}>
            <div className='user-card'>
              <TeamAvatar userId={member._id} size='small' />
              <div className='assignee-metadata'>
                <p className='name'>
                  {member.firstName} {member.lastName}
                </p>
                <p className='role'>{member.role}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
