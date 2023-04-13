import {
    GET_VENDOR_START,
    GET_VENDOR_SUCCESS,
    GET_VENDOR_FAIL,
    ADD_VENDOR_START,
    ADD_VENDOR_SUCCESS,
    ADD_VENDOR_FAIL,
    EDIT_VENDOR_START,
    EDIT_VENDOR_SUCCESS,
    EDIT_VENDOR_FAIL,
    VENDOR_BY_ID_START,
    VENDOR_BY_ID_SUCCESS,
    VENDOR_BY_ID_FAIL,
    GET_COST_CENTER_START,
    GET_COST_CENTER_SUCCESS,
    GET_COST_CENTER_FAIL,
    EDIT_COST_CENTER_SUCCESS,
    EDIT_COST_CENTER_FAIL,
    GET_COST_CENTER_BY_ID_SUCCESS,
    GET_COST_CENTER_BY_ID_FAIL,
    EDIT_COST_CENTER_START,
    GET_COST_CENTER_BY_ID_START,
    GET_SAMPLES_START,
    GET_SAMPLES_SUCCESS,
    GET_SAMPLES_FAIL,
    GET_SAMPLES_BY_ID_FAIL, GET_SAMPLES_BY_ID_SUCCESS, GET_SAMPLES_BY_ID_START, EDIT_SAMPLES_FAIL, EDIT_SAMPLES_SUCCESS, EDIT_SAMPLES_START, ADD_COST_CENTER_START, ADD_COST_CENTER_SUCCESS, ADD_COST_CENTER_FAIL
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

export const editCostCenterStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_START,
        payload: payload,
    })
}

export const editCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const editCostCenterFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_FAIL,
        payload: payload,
    })
}


export const getCostCenterByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_BY_ID_START,
        payload: payload,
    })
}

export const getCostCenterByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_COST_CENTER_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getCostCenterByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_BY_ID_FAIL,
        payload: payload,
    })
}

export const addCostCenterStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_START,
        payload: payload,
    })
}

export const addCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const addCostCenterFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_FAIL,
        payload: payload,
    })
}


// SAMPLES
export const getSamplesStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_START,
    payload: payload,
  })
}

export const getSamplesSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_SAMPLES_SUCCESS,
    payload: payload,
  })
}

export const getSamplesFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_FAIL,
    payload: payload,
  })
}

export const editSamplesStartAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_START,
    payload: payload,
  })
}

export const editSamplesSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_SUCCESS,
    payload: payload,
  })
}

export const editSamplesFailAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_FAIL,
    payload: payload,
  })
}


export const getSamplesByIdStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_BY_ID_START,
    payload: payload,
  })
}

export const getSamplesByIdSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_SAMPLES_BY_ID_SUCCESS,
    payload: payload,
  })
}

export const getSamplesByIdFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_BY_ID_FAIL,
    payload: payload,
  })
}
