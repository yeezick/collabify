import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import {
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from '@/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { SecondaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'

export const UrlPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    try {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    navigate(`/project/${projectID}`)
    dispatch(updateDeployedUrl(''))
    dispatch(updatePresenting(null))
  }

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <ProjectUrl setIsDisabled={setIsDisabled} />
          <Stack className='btn-container'>
            <SecondaryButton
              className='cancel-btn'
              handler={handleCancel}
              text='Cancel'
            />
            <PaginatorButton
              buttonType='primary'
              disabled={isDisabled}
              text='Presentation'
              type='submit'
              aria-disabled={isDisabled}
              handler={handleSubmit}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
