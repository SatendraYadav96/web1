import {
    LOAD_USER_PROFILE_FAIL_ACTION,
    LOAD_USER_PROFILE_START_ACTION,
    LOAD_USER_PROFILE_SUCCESS_ACTION,
    LOGIN_FAIL_ACTION,
    LOGIN_START_ACTION,
    LOGIN_SUCCESS_ACTION, LOGOUT_FAIL_ACTION, LOGOUT_START_ACTION, LOGOUT_SUCCESS_ACTION,
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


export const logoutStartAction = (payload) => (dispatch) => {
    dispatch({
        type: LOGOUT_START_ACTION,
        payload: payload,
    })
}

export const logoutSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS_ACTION,
        payload: payload,
    })
}

export const logoutFailAction = (payload) => (dispatch) => {
    dispatch({
        type: LOGOUT_FAIL_ACTION,
        payload: payload,
    })
}
