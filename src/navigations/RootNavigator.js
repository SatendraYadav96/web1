import React, {createContext, Suspense, useEffect} from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectAuthInfo } from '../redux/selectors/authSelectors'
import {message} from 'antd';
import {selectMessage, selectShowMessage} from "../redux/selectors/globalSelectors";
import {resetMessageAction} from "../redux/actions/global/GlobalActions";
const key = 'updatable'

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
)

const authContext = createContext()
// Containers
const DefaultLayout = React.lazy(() => import('./../layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./../components/auth/Login'))

const ProtectedRoute = ({ authInfo, children }) => {
  if (authInfo === null) {
    return <Navigate to='/login' replace />
  }
  return children
}

const RootNavigator = ({ authInfo, showMessage, messageObj, handleResetMessage }) => {
  useEffect(()=> {
    if (showMessage === false) {
        return
    }
    if (messageObj.type === 'error') {
        message.error({content: messageObj.text, style: {width: '50%', height: 30, marginRight: '5vh'}})
    }
    if (messageObj.type === 'success') {
        message.success({content: messageObj.text, style: {width: '50%', height: 30, marginRight: '5vh'}})
    }
    handleResetMessage()
  },[showMessage])

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path='/login' name='Login Page' element={<Login />} />
          <Route
            path='*'
            name='Home'
            element={
              <ProtectedRoute authInfo={authInfo}>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

ProtectedRoute.propTypes = {
  authInfo: PropTypes.any,
  children: PropTypes.any,
}

RootNavigator.propTypes = {
    authInfo: PropTypes.any,
    showMessage: PropTypes.bool,
    message: PropTypes.any,
    handleResetMessage: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const showMessage = selectShowMessage(state)
    const messageObj = selectMessage(state)
    return { authInfo, showMessage, messageObj }
}

const actions = {
    handleResetMessage: resetMessageAction
}

export default connect(mapState, actions)(RootNavigator)
