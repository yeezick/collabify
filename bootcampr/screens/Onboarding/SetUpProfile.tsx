import './SetUpProfile.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  selectAuthUser,
  setAuthUser,
  updateUserExperience,
} from '@/redux/slices/userSlice'
import { emptyUser } from '@/utils/data/userConstants'
import { UserInterface } from '@/interfaces/UserInterface'
import { updateUser, updateUserProfile } from '@/@/api/users'
import Avatar from 'components/Avatar/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import { createCheckout, updatePaymentExperience } from '@/@/api/payment'
import { errorSnackbar, successSnackbar } from '@/utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { isLinkedInUrl } from '@/utils/components/Inputs'

// BC-787: remove BEM styling
export const SetUpProfile = ({ handlePageNavigation }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()

  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const [errorStates, setErrorStates] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    linkedinUrl: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [isInvalidURL, setIsInvalidURL] = useState(false)

  const { firstName, lastName, bio, links } = updateUserForm
  const nestedLinks = ['githubUrl', 'linkedinUrl', 'portfolioUrl']

  let inputString =
    "I'm from... I live in... I chose this career path because... My hobbies are... A fun fact about me is..."
  const placeholder = inputString.replace(/\.\.\. /g, '...\n')

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }

    isLinkedInUrl(links.linkedinUrl)
      ? setIsInvalidURL(false)
      : setIsInvalidURL(true)
  }, [authUser])

  useEffect(() => {
    const charCount =
      authUser.bio && authUser.bio.length > 0 ? authUser.bio.length : 0
    setBioCharCount(charCount)

    const { firstName, lastName, bio, links } = updateUserForm
    const validForm = firstName && lastName && bio && links.linkedinUrl
    const validLinkedIn = isLinkedInUrl(links.linkedinUrl)

    validForm && validLinkedIn ? setIsDisabled(false) : setIsDisabled(true)
  }, [updateUserForm])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    checkErrorState(name, value)

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

    if (isInvalidURL) {
      isLinkedInUrl(links.linkedinUrl)
        ? setIsInvalidURL(false)
        : setIsInvalidURL(true)
    }
  }

  const checkErrorState = (name, value) => {
    setErrorStates({
      ...errorStates,
      [name]: value.length === 0,
    })
  }

  const handleSecondaryClick = async e => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      dispatch(successSnackbar('User profile has been updated!'))
      handlePageNavigation('previous')
    } catch (error) {
      console.error('Error occured when trying to create User Profile', error)
    }
  }

  const handlePrimaryClick = async () => {
    const updatedUserProfile = await updateUserProfile(updateUserForm)
    const checkoutResponse = await createCheckout()

    if (updatedUserProfile.error) {
      dispatch(errorSnackbar(updatedUserProfile.error))
      return
    } else if (checkoutResponse.error && !checkoutResponse.checkoutUrl) {
      dispatch(errorSnackbar(checkoutResponse.error))
      return
    }

    const updatedUserExperience = await updatePaymentExperience(authUser._id, {
      experience: 'waitlist',
    })

    if (updatedUserExperience.error) {
      dispatch(errorSnackbar('Error setting project experience.'))
      return
    } else {
      dispatch(updateUserExperience(updatedUserExperience))
      window.location.href = checkoutResponse.checkoutUrl
    }
  }

  return (
    <div className='setupProfile'>
      <div className='setupProfile__profile-header-cont'>
        <h2>Profile</h2>
        <p>Set up your profile so your team can get to know you.</p>
        <p>You can edit your profile later by going to My Account.</p>
        <i>*Required fields</i>
      </div>
      <div className='setupProfile__profile-container'>
        <form
          onSubmit={e => handlePageNavigation(e, 'next')}
          className='setupProfile__profile-form'
        >
          <div className='setupProfile__inputs-container'>
            <div className='setupProfile__profile-image'>
              <Avatar
                hasIcon={true}
                clickable={false}
                iconButtonClassName='setupProfile__cameraIcon'
                addPhotoIconId='imageChange'
              />
            </div>
            <label className='setupProfile__profile-label'>
              *First name
              <input
                type='text'
                name='firstName'
                className={`setupProfile__profile-input ${
                  errorStates.firstName && 'error'
                }`}
                value={firstName}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                required
              />
              {errorStates.firstName && (
                <h6 className='error'>First name is required.</h6>
              )}
            </label>
            <label className='setupProfile__profile-label'>
              *Last name
              <input
                type='text'
                name='lastName'
                className={`setupProfile__profile-input ${
                  errorStates.lastName && 'error'
                }`}
                value={lastName}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                required
              />
              {errorStates.lastName && (
                <h6 className='error'>Last name is required.</h6>
              )}
            </label>
            <label className='setupProfile__profile-label'>
              *About me
              <TextareaAutosize
                name='bio'
                className={`setupProfile__profile-label ${
                  errorStates.bio && 'error'
                }`}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                maxLength={500}
                minRows={8}
                placeholder={placeholder}
                value={bio}
              />
              <div className='bio-undertext'>
                <div>
                  {errorStates.bio && (
                    <h6 className='error'>Tell us something about yourself.</h6>
                  )}
                </div>
                <div
                  className={`setupProfile__profile-bioCharCount ${
                    errorStates.bio && 'error'
                  }`}
                >
                  <p className={`${errorStates.bio && 'error'}`}>
                    {500 - bioCharCount}/500
                  </p>
                </div>
              </div>
            </label>
            <label className='setupProfile__profile-label'>
              *Linkedin profile (URL)
              <input
                type='text'
                name='linkedinUrl'
                className={`setupProfile__profile-input ${
                  errorStates.linkedinUrl && 'error'
                }`}
                onChange={handleInputChange}
                onBlur={e => {
                  checkErrorState(e.target.name, e.target.value)
                  isLinkedInUrl(links.linkedinUrl)
                    ? setIsInvalidURL(false)
                    : setIsInvalidURL(true)
                }}
                placeholder='https://www.linkedin.com/in/name'
                value={links.linkedinUrl}
              />
              {errorStates.linkedinUrl && (
                <h6 className='error'>LinkedIn profile is required.</h6>
              )}
              {isInvalidURL && (
                <h6 className='error'>Not a valid LinkedIn URL.</h6>
              )}
            </label>
            <label className='setupProfile__profile-label'>
              Portfolio
              <input
                type='text'
                name='portfolioUrl'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
                placeholder='myportfoliokicksass.com'
                value={links.portfolioUrl}
              />
            </label>
            {authUser.role === 'Software Engineer' && (
              <label className='setupProfile__profile-label'>
                GitHub (URL)
                <input
                  type='text'
                  name='githubUrl'
                  className='setupProfile__profile-input'
                  onChange={handleInputChange}
                  placeholder='myGitHubkicksass.com'
                  value={links.githubUrl}
                />
              </label>
            )}
          </div>
          <div className='setupProfile__profile-btns'>
            <div className='setupProfile__cta-container'>
              <PaginatorButton
                buttonType='secondary'
                text='Availability'
                handler={handleSecondaryClick}
              />
              <div className='complete-payment'>
                <PaginatorButton
                  buttonType='primary'
                  text='Complete payment'
                  handler={handlePrimaryClick}
                  disabled={isDisabled}
                />
                <p className='payment-disclaimer'>
                  *You will be directed to a third-party payment processor. It
                  is secure.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
