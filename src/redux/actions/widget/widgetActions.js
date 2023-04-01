import {GET_LOV_FAIL, GET_LOV_START, GET_LOV_SUCCESS} from "./widgetActionConstants";

export const getLOVStartAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_LOV_START,
    payload: payload,
  })
}

export const getLOVSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_LOV_SUCCESS,
    payload: payload,
  })
}

export const getLOVFailAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_LOV_FAIL,
    payload: payload,
  })
}
