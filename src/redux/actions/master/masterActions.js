import {
    GET_VENDOR_START, GET_VENDOR_SUCCESS, GET_VENDOR_FAIL,
    ADD_VENDOR_START, ADD_VENDOR_SUCCESS, ADD_VENDOR_FAIL,
    EDIT_VENDOR_START, EDIT_VENDOR_SUCCESS, EDIT_VENDOR_FAIL, VENDOR_BY_ID_START, VENDOR_BY_ID_SUCCESS, VENDOR_BY_ID_FAIL, GET_COST_CENTER_START, GET_COST_CENTER_SUCCESS, GET_COST_CENTER_FAIL
} from "./masterActionConstants";




//  VENDOR


export const getVendorStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VENDOR_START,
        payload: payload,
    })
}

export const getVendorSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VENDOR_SUCCESS,
        payload: payload,
    })
}

export const getVendorFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VENDOR_FAIL,
        payload: payload,
    })
}


// ADD VENDOR


export const addVendorStartAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_START,
    payload: payload,
  })
}

export const addVendorSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_SUCCESS,
    payload: payload,
  })
}

export const addVendorFailAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_FAIL,
    payload: payload,
  })
}

//EDIT VENDOR

export const editVendorStartAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_START,
    payload: payload,
  })
}

export const editVendorSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_SUCCESS,
    payload: payload,
  })
}

export const editVendorFailAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_FAIL,
    payload: payload,
  })
}


export const getVendorByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: VENDOR_BY_ID_START,
        payload: payload,
    })
}

export const getVendorByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VENDOR_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getVendorByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: VENDOR_BY_ID_FAIL,
        payload: payload,
    })
}

// COST CENTER
export const getCostCenterStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_START,
        payload: payload,
    })
}

export const getCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const getCostCenterFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_FAIL,
        payload: payload,
    })
}
