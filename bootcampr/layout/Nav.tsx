import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { selectAuthUser, selectUserExperience } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { useSocketEvents } from 'components/Notifications/Socket'
import Avatar from 'components/Avatar/Avatar'
import {
  fetchThreads,
  selectChatUI,
  selectUnreadMessageCount,
  setActiveChatRoomId,
  toggleChat,
} from '@/redux/slices/chatSlice'
import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'
import { buildPortal } from '@/utils/helpers'
import { resetPortal } from '@/redux/slices/userInterfaceSlice'
import { CustomBadge } from 'components/Badge/Badge'
import { selectMembersAsTeam } from '@/redux/slices/projectSlice'
import './styles/Nav.scss'

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)
  const experience = useAppSelector(selectUserExperience)
  const {
    _id: userId,
    projects: { activeProject },
  } = authUser
  const dispatch = useAppDispatch()
  const location = useLocation()
  const excludedRoutes = [
    '/payment',
    '/sign-up',
    '/sign-in',
    '/onboarding',
    '/mobile',
  ]
  const isExcludedRoute = excludedRoutes.some(route =>
    location.pathname.startsWith(route)
  )
  const closeDropdown = () => setAnchorEl(null)
  const handlePortalLink = () =>
    buildPortal(dispatch, 'project', activeProject, experience)
  const handleNonPortalLink = () => dispatch(resetPortal())
  const isActiveLink = path =>
    location.pathname.includes(path) ? 'active' : ''

  const landingPage =
    process.env.REACT_APP_API_ENV === 'local'
      ? '/'
      : 'https://landing.bootcampr.io/'

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <Link to={landingPage} onClick={handleNonPortalLink}>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
      </div>
      {!isExcludedRoute && (
        <div className='navbar-wrapper'>
          <div className='header-list'>
            {userId && (
              <Link
                className={`header-link ${isActiveLink('project')}`}
                to={`/project/${activeProject || 'sandbox'}`}
                onClick={handlePortalLink}
              >
                Project Portal
              </Link>
            )}
            <Link
              className={`header-link ${isActiveLink('contact-us')}`}
              to='/contact-us'
              onClick={handleNonPortalLink}
            >
              Contact Us
            </Link>
            <Link
              className={`header-link ${isActiveLink('community')}`}
              to='/community'
              onClick={handleNonPortalLink}
            >
              Community
            </Link>
            <Link
              className={`header-link ${isActiveLink('enterprise')}`}
              to='/enterprise'
              onClick={handleNonPortalLink}
            >
              Enterprise
            </Link>
          </div>
          {userId ? (
            <AuthorizedNavLinks
              notificationCount={notificationCount}
              setAnchorEl={setAnchorEl}
            />
          ) : (
            <UnauthorizedNavLinks />
          )}
        </div>
      )}
      <AccountDropdown anchorEl={anchorEl} closeDropdown={closeDropdown} />
    </nav>
  )
}

const AuthorizedNavLinks = ({ notificationCount, setAnchorEl }) => {
  const dispatch = useAppDispatch()
  const { visibleChat } = useAppSelector(selectChatUI)
  const unreadMessagesCount = useAppSelector(selectUnreadMessageCount)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const chatRef = useRef(null)
  useSocketEvents(false)

  useEffect(() => {
    //Warning: needs to be checked if members are loaded
    dispatch(fetchThreads())
    dispatch(setActiveChatRoomId(null))
  }, [dispatch, projectMembers.length])

  const toggleChatBox = () => {
    dispatch(toggleChat())
  }

  const handleToggleChatBox = () => {
    toggleChatBox()
  }

  return (
    <div className='notifications'>
      <div className='nav-icons-container'>
        <div className='messages-icon' ref={chatRef}>
          <BsFillChatLeftTextFill
            size={23}
            className='chat-icon'
            onClick={handleToggleChatBox}
          />
          <CustomBadge content={unreadMessagesCount} variant='standard' />
          {visibleChat && <ChatDialogMain />}
        </div>
        <p className='account'>Messages</p>
      </div>
      <div className='nav-icons-container'>
        <div className='account avatar'>
          <Avatar clickable={false} setAnchorEl={setAnchorEl} size='medium' />
        </div>
        <div onClick={setAnchorEl}>
          <p className='account'>My Account </p>
          <MdArrowDropDown size={33} className='drop-down' />
        </div>
      </div>
    </div>
  )
}
const UnauthorizedNavLinks = () => (
  <div className='auth-btn'>
    <div>
      <Link className='log-in' to='/sign-in'>
        Log in
      </Link>
    </div>
    <div>
      <Link
        className='sign-up'
        to='/sign-up'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sign up
      </Link>
    </div>
  </div>
)
