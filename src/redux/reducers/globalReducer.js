import { createReducer } from './reducerUtils'
import {
  HIDE_SPINNER,
  RESET_MESSAGE,
  SHOW_MESSAGE,
  SHOW_SPINNER,
} from '../actions/global/GlobalActionConstants'
const initialState = {
  showSpinner: false,
  showMessage: false,
  message: null,
}

const showSpinnerReducer = (state = initialState, payload) => {
  return {
    ...state,
    showSpinner: true,
    showMessage: false
  }
}

const hideSpinnerReducer = (state = initialState, payload) => {
  return {
    ...state,
    showSpinner: false,
  }
}

const showMessageReducer = (state = initialState, payload) => {
  return {
    ...state,
    showMessage: true,
    message: payload.message,
  }
}

const resetMessageReducer = (state = initialState, payload) => {
  return {
    ...state,
    showMessage: false,
    message: null,
  }
}

export default createReducer(initialState, {
  [SHOW_SPINNER]: showSpinnerReducer,
  [HIDE_SPINNER]: hideSpinnerReducer,
  [SHOW_MESSAGE]: showMessageReducer,
  [RESET_MESSAGE]: resetMessageReducer,
})
