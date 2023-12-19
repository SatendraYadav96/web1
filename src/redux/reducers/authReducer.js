import { createReducer } from './reducerUtils'
import {
  LOAD_USER_PROFILE_FAIL_ACTION,
  LOAD_USER_PROFILE_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_SUCCESS_ACTION,
} from '../actions/auth/authActionConstants'
const initialState = {
  authInfo: null,
    profileInfo: {},
    profileLoading:false,
  loggedIn: false,
  error: null,
}

const loginSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    authInfo: payload.auth,
    loggedIn: true,
    error: null,
  }
}

const loginFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    loggedIn: false,
  }
}

const loadUserProfileSuccessReducer = (state = initialState, payload) => {
    console.log(payload.profileInfo)
    console.log(state)
  return {
    ...state,
      profileInfo: payload.profileInfo,
      profileLoading:false,
    loggedIn: true,
    error: null,

  }
}

const loadUserProfileFailReducer = (state = initialState, payload) => {
  return {
    ...state,
      profileLoading:false,
    error: payload.error,
  }
}

export default createReducer(initialState, {
  [LOGIN_SUCCESS_ACTION]: loginSuccessReducer,
  [LOGIN_FAIL_ACTION]: loginFailReducer,
  [LOAD_USER_PROFILE_SUCCESS_ACTION]: loadUserProfileSuccessReducer,
  [LOAD_USER_PROFILE_FAIL_ACTION]: loadUserProfileFailReducer,
})
