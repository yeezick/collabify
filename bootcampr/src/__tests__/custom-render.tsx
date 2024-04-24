import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import userReducer from 'utils/redux/slices/userSlice'
import { BrowserRouter as Router } from 'react-router-dom'

const customRender = (
  ui: React.ReactElement,
  preloadedState?: object,
  mockedStore?,
  options?: Omit<RenderOptions, 'queries'>
) => {
  const store = mockedStore
    ? mockedStore
    : configureStore({
        reducer: {
          ui: userReducer,
          notification: notificationReducer,
        },
        preloadedState: preloadedState,
      })

  const Providers = ({ children }) => {
    return (
      <Router>
        <Provider store={store}>{children}</Provider>
      </Router>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...options }),
  }
}
export * from '@testing-library/react'
export { customRender as render }
