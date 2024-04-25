import { TicketDialogButtons } from '../Buttons'
import { SelectAssignee, SelectDate, SelectStatus, TicketCreator } from '.'
import '../../styles/TicketDropdownFields.scss'

export const TicketDropdownFields = () => {
  return (
    <div className='ticket-dropdown-fields'>
      <SelectStatus />
      <TicketCreator />
      <SelectAssignee />
      <SelectDate />
      <TicketDialogButtons />
    </div>
  )
}
