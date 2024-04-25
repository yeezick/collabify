// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '@/redux/hooks'
// import { selectProjectTracker } from '@/redux/slices/projectSlice'
// import { BoardColumns } from './BoardColumns/BoardColumns'
// import { NoTicketsCreated } from './NoTicketsCreated'
// import {
//   setVisibleTickets,
//   setInitialVisibleTickets,
// } from '@/redux/slices/taskBoardSlice'
// import { selectUserId } from '@/redux/slices/userSlice'
// import { TicketDialog } from '../TicketDialog/TicketDialog'

// export const TaskBoard = () => {
//   const projectTracker = useAppSelector(selectProjectTracker)
//   const userId = useAppSelector(selectUserId)
//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     dispatch(setInitialVisibleTickets(projectTracker))
//   }, [])

//   useEffect(() => {
//     dispatch(
//       setVisibleTickets({
//         projectTracker,
//         userId,
//         changeVisibleTicketType: false,
//       })
//     )
//   }, [projectTracker])

//   return (
//     <>
//       <BoardColumns />
//       <NoTicketsCreated />
//       <TicketDialog />
//     </>
//   )
// }

import React from 'react'

const TaskBoard = () => {
  return <div>TaskBoard</div>
}

export default TaskBoard
