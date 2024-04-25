import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectAuthUser } from '@/redux/slices/userSlice'
import { selectSortedThreads } from '@/redux/slices/chatSlice'
import { chatRouterHandler } from '@/utils/helpers/emailRouterHelpers'

export const EmailRouter = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const path = useLocation()
  const queryParams = new URLSearchParams(path.search)
  const notificationPage = queryParams.get('type')
  const threads = useAppSelector(selectSortedThreads)

  useEffect(() => {
    if (authUser?._id && notificationPage === 'chat' && threads.length > 0) {
      const chatRoomId = queryParams.get('chatRoomId')
      chatRouterHandler(threads, authUser, chatRoomId, dispatch, navigate)
    }
  }, [authUser?._id, notificationPage, dispatch, navigate, threads])

  return null
}