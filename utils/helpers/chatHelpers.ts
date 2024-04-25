import { setActiveChatRoomId, toggleChatClose } from '@/redux/slices/chatSlice'

export const closeChatBox = dispatch => {
  dispatch(setActiveChatRoomId(null))
  dispatch(toggleChatClose())
}
