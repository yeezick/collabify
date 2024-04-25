import { updatePaymentExperience } from '@/utils/api'
import { errorSnackbar } from './commentHelpers'
import { updateUserExperience } from '@/redux/slices/userSlice'

export const handleJoinTeam = async (dispatch, navigate, userId) => {
  const updatedExperience = await updatePaymentExperience(userId, {
    experience: 'waitlist',
  })
  if (updatedExperience.error) {
    dispatch(errorSnackbar('Error setting project experience.'))
    return
  }
  dispatch(updateUserExperience(updatedExperience))
  navigate('/onboarding')
}

export const handleJoinDiscord = () => {
  window.open('https://discord.gg/JJGBf9SX6y', '_blank')
}
