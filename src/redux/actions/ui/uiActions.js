import {
  UI_MENU_FAIL_ACTION,
  UI_MENU_START_ACTION,
  UI_MENU_SUCCESS_ACTION,
  UI_SET_PAGE_TITLE,
} from './uiActionConstants'

export const uiMenuStartAction = (payload) => (dispatch) => {
  dispatch({
    type: UI_MENU_START_ACTION,
    payload: payload,
  })
}

export const uiMenuSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: UI_MENU_SUCCESS_ACTION,
    payload: payload,
  })
}

export const uiMenuFailAction = (payload) => (dispatch) => {
  dispatch({
    type: UI_MENU_FAIL_ACTION,
    payload: payload,
  })
}

export const setPageTitle = (payload) => (dispatch) => {
  dispatch({
    type: UI_SET_PAGE_TITLE,
    payload: payload,
  })
}
