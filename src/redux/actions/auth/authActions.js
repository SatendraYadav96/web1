import {
  LOAD_USER_PROFILE_FAIL_ACTION,
  LOAD_USER_PROFILE_START_ACTION,
  LOAD_USER_PROFILE_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_START_ACTION,
  LOGIN_SUCCESS_ACTION,
} from './authActionConstants'

export const loginStartAction = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN_START_ACTION,
    payload: payload,
  })
}

export const loginSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS_ACTION,
    payload: payload,
  })
}

export const loginFailAction = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN_FAIL_ACTION,
    payload: payload,
  })
}

export const loadUserProfileStartAction = (payload) => (dispatch) => {
  dispatch({
    type: LOAD_USER_PROFILE_START_ACTION,
    payload: payload,
  })
}

export const loadUserProfileSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: LOAD_USER_PROFILE_SUCCESS_ACTION,
    payload: payload,
  })
}

export const loadUserProfileFailAction = (payload) => (dispatch) => {
  dispatch({
    type: LOAD_USER_PROFILE_FAIL_ACTION,
    payload: payload,
  })
}
