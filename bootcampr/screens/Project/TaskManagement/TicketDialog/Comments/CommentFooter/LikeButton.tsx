import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { useEffect, useState } from 'react'
import { updateComment } from '@/@/api/comments'
import {
  determineLikeIcon,
  errorSnackbar,
} from '@/utils/helpers/commentHelpers'
import { isSandboxId } from '@/utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUsersById } from '@/redux/slices/projectSlice'
import { selectUserId } from '@/redux/slices/userSlice'

export const LikeButton = ({
  commentId,
  fetchComments,
  likes,
  toggleFetchComments,
}) => {
  const [likedByUser, toggleLikedByUser] = useState(false)
  const likers = useAppSelector(selectUsersById(likes))
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (likes.includes(userId)) {
      toggleLikedByUser(true)
    } else {
      toggleLikedByUser(false)
    }
  }, [likes, userId])

  //BC-763
  const handleCommentLike = async () => {
    if (isSandboxId(commentId)) {
      dispatch(errorSnackbar('This feature is disabled for the sandbox!'))
    } else {
      let updatedLikes
      if (likes.includes(userId)) {
        updatedLikes = {
          likes: likes.filter(likeId => likeId !== userId),
        }
      } else {
        updatedLikes = {
          likes: [...likes, userId],
        }
      }
      await updateComment(commentId, updatedLikes)
      toggleFetchComments(!fetchComments)
    }
  }

  const tooltipTitle =
    likers.length > 0 &&
    likers.map(liker => `${liker.firstName} ${liker.lastName}`).join(', ')

  return (
    <LikeToolTip
      title={tooltipTitle}
      placement='top-start'
      slotProps={TooltipSlotProps}
    >
      <div className='like-button'>
        <div onClick={handleCommentLike}>{determineLikeIcon(likedByUser)}</div>
        <p>{likes.length}</p>
      </div>
    </LikeToolTip>
  )
}

const LikeToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#424242',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '8px',
  },
}))

const TooltipSlotProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -14],
        },
      },
    ],
  },
}
