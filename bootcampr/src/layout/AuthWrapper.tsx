import { Loader } from 'components/Loader/Loader'
import { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { verify } from 'utils/api/users'
import { isMobileWidth } from 'utils/helpers'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  setAuthUser,
  uiStatus,
} from 'utils/redux/slices/userSlice'

const unprotectedRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/sign-up/:id/confirmation-email-sent',
  '/success/:userId',
  '/users/:id/expired-link',
  '/users/:id/reset-password/:token',
  '/how-to',
  '/about-us',
]

export const AuthWrapper = ({ children }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const status = useAppSelector(uiStatus)
  const isProtectedRoute = !unprotectedRoutes.some(route =>
    matchPath({ path: route, end: true }, location.pathname)
  )

  useEffect(() => {
    const verifyAndNavigateUser = async () => {
      try {
        const token = localStorage.getItem('bootcamprAuthToken')
        //to syncronize and get user info again after refreshing the page
        if (token && !authUser?._id) {
          const verifiedAuthUser = await verify()
          if (verifiedAuthUser?._id) {
            await storeUserProject(
              dispatch,
              verifiedAuthUser.projects.activeProject || 'sandbox'
            )
            dispatch(setAuthUser(verifiedAuthUser))
          } else if (isProtectedRoute) {
            navigate('/sign-in')
          }
        } else if (!token && isProtectedRoute) {
          //user is not verified and the route is protected
          navigate('/sign-in')
        }
      } catch (error) {
        console.error('Error in auth verification: ', error)
        if (isProtectedRoute) {
          navigate('/sign-in')
        }
      }
    }

    verifyAndNavigateUser()
  }, [authUser._id, dispatch, location.pathname, navigate])

  useEffect(() => {
    const routeToMobileGate = () => {
      const { pathname } = location
      const currentPath = pathname.split('/').pop()
      const isMobileScreen =
        currentPath === 'confirmation-email-sent' || currentPath === 'sign-up'

      if (isMobileWidth() && !isMobileScreen) {
        navigate('/mobile')
      }
    }
    routeToMobileGate()
    window.addEventListener('resize', routeToMobileGate)
    return () => {
      window.removeEventListener('resize', routeToMobileGate)
    }
  }, [location.pathname])

  if (status.isLoading) {
    return <Loader />
  }

  return <>{children}</>
}
