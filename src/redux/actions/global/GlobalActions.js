import {
  DO_NOTHING,
  HIDE_SPINNER,
  RESET_MESSAGE,
  SHOW_MESSAGE,
  SHOW_SPINNER,
} from './GlobalActionConstants'

export const showMessageAction = (payload) => (dispatch) => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: payload,
  })
}

export const resetMessageAction = (payload) => (dispatch) => {
  dispatch({
    type: RESET_MESSAGE,
    payload: payload,
  })
}

export const doNothing = (payload) => (dispatch) => {
  dispatch({
    type: DO_NOTHING,
    payload: payload,
  })
}

export const showSpinner = () => (dispatch) => {
  dispatch({
    type: SHOW_SPINNER,
  })
}

export const hideSpinner = () => (dispatch) => {
  console.log('Calledgdfgdfgfdgdfzgdfzgdfgd')
  dispatch({
    type: HIDE_SPINNER,
  })
}
