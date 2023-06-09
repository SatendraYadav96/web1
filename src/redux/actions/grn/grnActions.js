import {
    UNACKNOWLEDGE_LIST_FAIL, UNACKNOWLEDGE_LIST_START, UNACKNOWLEDGE_LIST_SUCCESS, REJECT_ACKNOWLEDGE_START, REJECT_ACKNOWLEDGE_SUCCESS, REJECT_ACKNOWLEDGE_FAIL, APPROVE_ACKNOWLEDGE_START, APPROVE_ACKNOWLEDGE_SUCCESS, APPROVE_ACKNOWLEDGE_FAIL,
    GRN_UPLOAD_START, GRN_UPLOAD_SUCCESS, GRN_UPLOAD_FAIL, GRN_START, GRN_SUCCESS, GRN_FAIL
} from "./grnActionConstants";

export const unacknowledgeListStartAction = (payload) => (dispatch) => {
  dispatch({
    type: UNACKNOWLEDGE_LIST_START,
    payload: payload,
  })
}

export const unacknowledgeListSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: UNACKNOWLEDGE_LIST_SUCCESS,
    payload: payload,
  })
}

export const unacknowledgeListFailAction = (payload) => (dispatch) => {
  dispatch({
    type: UNACKNOWLEDGE_LIST_FAIL,
    payload: payload,
  })
}

export const rejectAcknowledgeStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: REJECT_ACKNOWLEDGE_START,
        payload: payload,
    })
}

export const rejectAcknowledgeSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: REJECT_ACKNOWLEDGE_SUCCESS,
        payload: payload,
    })
}

export const rejectAcknowledgeFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: REJECT_ACKNOWLEDGE_FAIL,
        payload: payload,
    })
}

export const approveAcknowledgeStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: APPROVE_ACKNOWLEDGE_START,
        payload: payload,
    })
}

export const approveAcknowledgeSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: APPROVE_ACKNOWLEDGE_SUCCESS,
        payload: payload,
    })
}

export const approveAcknowledgeFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: APPROVE_ACKNOWLEDGE_FAIL,
        payload: payload,
    })
}



export const grnStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GRN_START,
        payload: payload,
    })
}

export const grnSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_SUCCESS,
        payload: payload,
    })
}

export const grnFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GRN_FAIL,
        payload: payload,
    })
}
