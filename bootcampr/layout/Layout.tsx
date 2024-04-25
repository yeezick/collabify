import { Loader } from 'components/Loader/Loader'
import { useAppSelector } from '@/redux/hooks'
import {
  selectUserId,
  selectUserProjectId,
  uiStatus,
} from '@/redux/slices/userSlice'
import { Nav } from '.'
import { Footer } from 'layout/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation } from 'react-router-dom'
import './styles/Layout.scss'
import { doesUrlBelongToPortal } from '@/utils/helpers'
import { PortalView } from './Portal'

export const Layout = ({ children }) => {
  const status = useAppSelector(uiStatus)
  const projectId = useAppSelector(selectUserProjectId)
  const userId = useAppSelector(selectUserId)
  const { pathname } = useLocation()

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      {doesUrlBelongToPortal(pathname, userId, projectId) ? (
        <PortalView>{children}</PortalView>
      ) : (
        <DefaultView>{children}</DefaultView>
      )}
      <Footer />
    </>
  )
}

const DefaultView = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <div className='main-content-container'>{children}</div>
    </div>
  )
}
