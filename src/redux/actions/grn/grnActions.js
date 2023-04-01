import {UNACKNOWLEDGE_LIST_FAIL, UNACKNOWLEDGE_LIST_START, UNACKNOWLEDGE_LIST_SUCCESS, REJECT_ACKNOWLEDGE_START, REJECT_ACKNOWLEDGE_SUCCESS, REJECT_ACKNOWLEDGE_FAIL, APPROVE_ACKNOWLEDGE_START, APPROVE_ACKNOWLEDGE_SUCCESS, APPROVE_ACKNOWLEDGE_FAIL,
GRN_UPLOAD_START,GRN_UPLOAD_SUCCESS,GRN_UPLOAD_FAIL} from "./grnActionConstants";

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



export const grnUploadStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GRN_UPLOAD_START,
        payload: payload,
    })
}

export const grnUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const grnUploadFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GRN_UPLOAD_FAIL,
        payload: payload,
    })
}
