import { createReducer } from './reducerUtils'
import {
  UI_MENU_FAIL_ACTION,
  UI_MENU_SUCCESS_ACTION,
  UI_SET_PAGE_TITLE,
} from '../actions/ui/uiActionConstants'
const initialState = {
  menus: [],
  pageTitle: '',
  error: null,
}

const uiMenuSuccessReducer = (state = initialState, payload) => {
  let menus = []
  return {
    ...state,
    menus: payload.menus,
    error: null,
  }
}

const uiMenuFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    loggedIn: false,
  }
}

const uiSetMenuPageReducer = (state = initialState, payload) => {
  return {
    ...state,
    pageTitle: payload.title,
  }
}

export default createReducer(initialState, {
  [UI_MENU_SUCCESS_ACTION]: uiMenuSuccessReducer,
  [UI_MENU_FAIL_ACTION]: uiMenuFailReducer,
  [UI_SET_PAGE_TITLE]: uiSetMenuPageReducer,
})
