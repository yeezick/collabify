import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UserDetails } from '../UserDetails/UserDetails'
import './EditChatRoom.scss'
import { onScreenUpdate, selectChat } from '@/redux/slices/chatSlice'
import { selectAuthUser } from '@/redux/slices/userSlice'
import { getSortedParticipants } from '@/utils/functions/chatLogic'
import { ChatScreen } from '@/utils/data/chatConstants'
import { Button } from '@mui/material'
import { FiPlus } from 'react-icons/fi'
import { ChatAvatar } from '../ChatAvatar/ChatAvatar'
import './EditChatRoom.scss'

export const EditChatRoom = () => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const { groupPhoto, chatType, isTeamChat, participants } = currentConversation

  const handleInviteMember = () => {
    dispatch(onScreenUpdate(ChatScreen.InviteNewMembers))
  }

  const sortedParticipants = getSortedParticipants(participants, authUser._id)
  const hideButton = currentConversation.isTeamChat

  return (
    <div className='edit-chat-container'>
      <ChatAvatar
        groupPhoto={groupPhoto}
        chatType={chatType}
        isTeamChat={isTeamChat}
        participants={participants}
        avatarSize='large'
      />
      <div className='members-container'>
        <p>Member</p>
        <div className='members-list'>
          {sortedParticipants.map(pp => (
            <div className='member'>
              <UserDetails
                key={pp.userInfo._id}
                title={`${pp.userInfo.firstName} ${pp.userInfo.lastName}`}
                description={pp.userInfo.role}
                avatarSize='x-small'
                userId={pp.userInfo._id}
              />
            </div>
          ))}
        </div>
        {!hideButton && (
          <div className='invite-button'>
            <Button onClick={handleInviteMember} variant='text'>
              <FiPlus size={20} />
              Invite New Member
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
