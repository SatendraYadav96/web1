import {GET_COMPLIANCE_DETAILS_FAIL, GET_COMPLIANCE_DETAILS_START, GET_COMPLIANCE_DETAILS_SUCCESS, GET_MAIL_LOG_FAIL, GET_MAIL_LOG_START, GET_MAIL_LOG_SUCCESS, GET_NON_COMPLIANCE_FAIL, GET_NON_COMPLIANCE_START, GET_NON_COMPLIANCE_SUCCESS} from "./nonComplianceActionConstants";


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
