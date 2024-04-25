import { TimezonesUTC } from '@/utils/data/timeZoneConstants'
import { api } from '../apiConfig'
import {
  PasswordFormData,
  EmailFormData,
} from '@/interfaces/AccountSettingsInterface'

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users')
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getOneUser = async (id: any) => {
  try {
    const res = await api.get(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getOneUserByEmail = async (email: string) => {
  try {
    const res = await api.get(`/users/email/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (userProfile: any) => {
  try {
    const res = await api.post('/onboarding', userProfile)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (id: any, userUpdate: any) => {
  try {
    const res = await api.post(`/users/${id}`, userUpdate)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addPortfolioProject = async (id: any, newProject: any) => {
  try {
    const res = await api.patch(`/users/${id}`, newProject)
    return res.data
  } catch (error) {
    throw error
  }
}

export const signUp = async (credentials: any) => {
  try {
    const res = await api.post('/sign-up', credentials)
    const { message } = res.data
    if (message) return res.data
  } catch (error) {
    throw error
  }
}

export const signIn = async (credentials: any) => {
  try {
    const res = await api.post('/sign-in', credentials)
    if (res.data.invalidCredentials) {
      return { message: res.data.message }
    }
    const { token, user } = res.data
    localStorage.setItem('bootcamprAuthToken', token)
    return user
  } catch (error) {
    throw error
  }
}

export const logOut = async () => {
  try {
    localStorage.removeItem('bootcamprAuthToken')
  } catch (error) {
    throw error
  }
}

export const verify = async () => {
  const bootcamprAuthToken = localStorage.getItem('bootcamprAuthToken')
  try {
    if (bootcamprAuthToken) {
      const { data: payload } = await api.get('/verify')
      const { data: user } = await api.get(`/users/${payload.userID}`)
      return user
    }
  } catch (error) {
    console.error('Error in verify function:', error)
    return false
  }
}

export const verifyEmail = async email => {
  const { data, status } = await api.get(`/verify-email/${email}`)
  const msg = status >= 400 ? 'error' : 'message'

  return { status, message: data[msg] }
}

export const verifyTokenExpiration = async token => {
  try {
    const res = await api.get(`/verify-token-expiration/${token}`)
    return res.data.expired
  } catch (error) {
    console.error(error)
    return false
  }
}

export const resendNewEmailLink = async (userId: string) => {
  try {
    const res = await api.post(`/users/${userId}/expired-link`)
    return res
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateUnverifiedEmail = async (newEmail, userId) => {
  const reqBody = {
    userId: userId,
    newEmail: newEmail,
  }
  const response = await api.post(
    `/users/${userId}/update-email-verification`,
    reqBody
  )
  return response
}

export const updateUsersEmail = async (
  formData: PasswordFormData | EmailFormData,
  userId: string | undefined
) => {
  try {
    const data = await api.patch(`/update-email/${userId}`, formData)
    return data
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}
export const updateUsersPassword = async (
  formData: PasswordFormData | EmailFormData,
  userId: string | undefined
) => {
  try {
    const { data, status } = await api.patch(
      `/update-password/${userId}`,
      formData
    )
    const msg = 'message'
    const fm = 'friendlyMessage'
    return { status, message: data[msg], friendlyMessage: data[fm] }
  } catch (error) {
    return { error: { status: 500, message: 'Something went wrong' } }
  }
}

export const forgotPasswordEmailVerification = async (
  email: string,
  userId?: string
) => {
  try {
    const data = await api.post(`/reset-password`, { email: email, userId })
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateAvailability = async (
  userId: string,
  newAvailability: any,
  userTimezone: TimezonesUTC
) => {
  try {
    const res = await api.post(`/updateAvailability`, {
      newAvailability,
      userId,
      userTimezone,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const deleteUserAccount = async (id: string) => {
  try {
    const res = await api.delete(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
