import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useParams } from 'react-router-dom'
import { selectProjectTracker } from '@/redux/slices/projectSlice'
import { StatusColumn } from './StatusColumn'
import '../../styles/BoardColumnStyles.scss'
import {
  doTicketsExist,
  handleColumnReordering,
  handleTicketMovingBetweenColumns,
} from '@/utils/helpers/taskHelpers'
import { DragDropContext } from 'react-beautiful-dnd'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const columnOrder = ['toDo', 'inProgress', 'underReview', 'completed']
  const classes = doTicketsExist(projectTracker)
    ? 'columns-wrapper full-height'
    : 'columns-wrapper'

  const handleOnDragEnd = async movingTicket => {
    const {
      source: { droppableId: oldColumnId, index: oldColumnIdx },
      destination: { droppableId: newColumnId, index: newColumnIdx },
    } = movingTicket

    // Ticket in its original position or dropped outside of a valid column
    if (
      !movingTicket.destination ||
      (oldColumnId === newColumnId && oldColumnIdx === newColumnIdx)
    ) {
      return
    }

    if (oldColumnId === newColumnId && oldColumnIdx !== newColumnIdx) {
      await handleColumnReordering(
        dispatch,
        projectId,
        projectTracker,
        movingTicket
      )
    } else {
      await handleTicketMovingBetweenColumns(
        dispatch,
        projectId,
        projectTracker,
        movingTicket
      )
    }
  }

  return (
    <div className={classes}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columnOrder.map(columnStatus => (
          <StatusColumn key={columnStatus} columnStatus={columnStatus} />
        ))}
      </DragDropContext>
    </div>
  )
}
