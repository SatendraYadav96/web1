import {
    GET_COMPLIANCE_DETAILS_FAIL,
    GET_COMPLIANCE_DETAILS_START,
    GET_COMPLIANCE_DETAILS_SUCCESS,
    GET_MAIL_LOG_FAIL,
    GET_MAIL_LOG_START,
    GET_MAIL_LOG_SUCCESS,
    GET_NON_COMPLIANCE_FAIL,
    GET_NON_COMPLIANCE_START,
    GET_NON_COMPLIANCE_SUCCESS, OVER_SAMPLING_DETAILS_DATA_FAIL, OVER_SAMPLING_DETAILS_DATA_START, OVER_SAMPLING_DETAILS_DATA_SUCCESS, SAVE_MASTER_BLOCKED_RECIPIENT_FAIL, SAVE_MASTER_BLOCKED_RECIPIENT_START, SAVE_MASTER_BLOCKED_RECIPIENT_SUCCESS, SAVE_NON_COMPLIANCE_ADMIN_REMARK_FAIL,
    SAVE_NON_COMPLIANCE_ADMIN_REMARK_START, SAVE_NON_COMPLIANCE_ADMIN_REMARK_SUCCESS, SAVE_OVER_SAMPLING_FAIL, SAVE_OVER_SAMPLING_START, SAVE_OVER_SAMPLING_SUCCESS
} from "./nonComplianceActionConstants";


export const getNonComplianceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_NON_COMPLIANCE_START,
        payload: payload,
    })
}

export const getNonComplianceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_NON_COMPLIANCE_SUCCESS,
        payload: payload,
    })
}

export const getNonComplianceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_NON_COMPLIANCE_FAIL,
        payload: payload,
    })
}


export const getComplianceDetailsStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COMPLIANCE_DETAILS_START,
        payload: payload,
    })
}

export const getComplianceDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_COMPLIANCE_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const getComplianceDetailsFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COMPLIANCE_DETAILS_FAIL,
        payload: payload,
    })
}


export const getMailLogStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MAIL_LOG_START,
        payload: payload,
    })
}

export const getMailLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MAIL_LOG_SUCCESS,
        payload: payload,
    })
}

export const getMailLogFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MAIL_LOG_FAIL,
        payload: payload,
    })
}

export const saveNonComplianceStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_NON_COMPLIANCE_ADMIN_REMARK_START,
        payload: payload
    })
}

export const saveNonComplianceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_NON_COMPLIANCE_ADMIN_REMARK_SUCCESS,
        payload: payload
    })
}

export const saveNonComplianceFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_NON_COMPLIANCE_ADMIN_REMARK_FAIL,
        payload: payload
    })
}

export const saveOverSamplingStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_OVER_SAMPLING_START,
        payload: payload
    })
}

export const saveOverSamplingSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_OVER_SAMPLING_SUCCESS,
        payload: payload
    })
}

export const saveOverSamplingFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_OVER_SAMPLING_FAIL,
        payload: payload
    })
}

export const overSamplingDetailsDataStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_DATA_START,
        payload: payload
    })
}

export const overSamplingDetailsDataSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_DATA_SUCCESS,
        payload: payload
    })
}

export const overSamplingDetailsDataFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_DATA_FAIL,
        payload: payload
    })
}

export const saveMasterRecipientBlockedStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_MASTER_BLOCKED_RECIPIENT_START,
        payload: payload
    })
}

export const saveMasterRecipientBlockedSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_MASTER_BLOCKED_RECIPIENT_SUCCESS,
        payload: payload
    })
}

export const saveMasterRecipientBlockedFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SAVE_MASTER_BLOCKED_RECIPIENT_FAIL,
        payload: payload
    })
}
