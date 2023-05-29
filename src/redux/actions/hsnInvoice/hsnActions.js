import {
  ADD_HSN_START_ACTION,
  ADD_HSN_SUCCESS_ACTION,
  ADD_HSN_FAIL_ACTION,
  ADD_BOX_WEIGHT_START_ACTION,
  ADD_BOX_WEIGHT_SUCCESS_ACTION,
  ADD_BOX_WEIGHT_FAIL_ACTION
} from './hsnActionConstants'


//Add Hsn API
export const addHsnStartAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_HSN_START_ACTION,
    payload: payload,
  })
}

export const addHsnSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_HSN_SUCCESS_ACTION,
    payload: payload,
  })
}

export const addHsnFailAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_HSN_FAIL_ACTION,
    payload: payload,
  })
}


//EditInvoiceHeader API
export const addBoxWeightStartAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_BOX_WEIGHT_START_ACTION,
    payload: payload,
  })
}

export const addBoxWeightSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_BOX_WEIGHT_SUCCESS_ACTION,
    payload: payload,
  })
}

export const addBoxWeightFailAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_BOX_WEIGHT_FAIL_ACTION,
    payload: payload,
  })
}
