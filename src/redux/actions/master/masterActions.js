import {GET_VENDOR_START,GET_VENDOR_SUCCESS,GET_VENDOR_FAIL,
ADD_VENDOR_START,ADD_VENDOR_SUCCESS,ADD_VENDOR_FAIL,
EDIT_VENDOR_START,EDIT_VENDOR_SUCCESS,EDIT_VENDOR_FAIL } from "./masterActionConstants";




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

