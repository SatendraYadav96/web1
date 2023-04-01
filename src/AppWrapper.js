import React, { useEffect } from 'react'
import { Route, useLocation, withRouter } from 'react-router-dom'
import App from './App'
import Login from './components/auth/Login'

const AppWrapper = () => {
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  switch (location.pathname) {
    case '/login':
      return <Route path="/login" component={Login} />
    case '/error':
      return <Route path="/error" component={Error} />
    default:
      return <App />
  }
}

export default withRouter(AppWrapper)
