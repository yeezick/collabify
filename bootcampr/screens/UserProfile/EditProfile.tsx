import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/hooks'
import { selectAuthUser, setAuthUser } from '@/redux/slices/userSlice'
import { emptyUser } from '@/utils/data/userConstants'
import { updateUser } from '@/@/api/users'
import Avatar from 'components/Avatar/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import './EditProfile.scss'
import { errorSnackbar, successSnackbar } from '@/utils/helpers/commentHelpers'

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    bio,
    firstName,
    lastName,
    links: { githubUrl, linkedinUrl, portfolioUrl },
    role,
  } = updateUserForm
  const nestedLinks = Object.keys(updateUserForm.links)

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }

    if (authUser && authUser.bio) {
      setBioCharCount(authUser.bio.length)
    }
  }, [authUser])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (nestedLinks.includes(name)) {
      setUpdateUserForm(prevForm => ({
        ...prevForm,
        links: {
          ...prevForm.links,
          [name]: value,
        },
      }))
    } else {
      setUpdateUserForm({ ...updateUserForm, [name]: value })
    }

    if (name === 'bio') {
      setBioCharCount(value.length)
    }
  }

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      dispatch(successSnackbar('Profile saved!'))
      navigate(`/users/${authUser._id}`)
    } catch (error) {
      console.log('Error occurred when trying to update User Profile', error)
      dispatch(
        errorSnackbar('Failed to update user profile. Please try again.')
      )
    }
  }

  if (!authUser) {
    return <div>Loading user...</div>
  }

  return (
    <div className='editprofile'>
      <div className='editprofile__container'>
        <form onSubmit={handleUserUpdate} className='editprofile__form'>
          <div className='editprofile__imageContainer'>
            <div className='editprofile__image'>
              <Avatar
                hasIcon={true}
                clickable={false}
                iconButtonClassName='editprofile__cameraIcon'
                addPhotoIconId='imageChange'
              />
            </div>
            <button type='submit' className='editprofile__saveBtn'>
              Save Profile
            </button>
          </div>
          <div className='editprofile__labelContainer'>
            <label className='editprofile__label'>
              First name
              <input
                type='text'
                name='firstName'
                className='editprofile__input'
                value={firstName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className='editprofile__label'>
              Last name
              <input
                type='text'
                name='lastName'
                className='editprofile__input'
                value={lastName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className='editprofile__label'>
              About me
              <TextareaAutosize
                name='bio'
                className='editprofile__textarea'
                minRows={8}
                maxRows={9}
                value={bio}
                onChange={handleInputChange}
                maxLength={500}
                required
              />
              <div className='editprofile__bioCharCount'>
                {500 - bioCharCount}/500
              </div>
            </label>

            <label className='editprofile__label'>
              Linkedin profile (URL)
              <input
                type='text'
                name='linkedinUrl'
                className='editprofile__input'
                value={linkedinUrl}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className='editprofile__label'>
              Portfolio (URL)
              <input
                type='text'
                name='portfolioUrl'
                className='editprofile__input'
                value={portfolioUrl}
                onChange={handleInputChange}
              />
            </label>

            {role === 'Software Engineer' && (
              <label className='editprofile__label'>
                Github (URL) {role}
                <input
                  type='text'
                  name='githubUrl'
                  className='editprofile__input'
                  value={githubUrl}
                  onChange={handleInputChange}
                />
              </label>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
