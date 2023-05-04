import {GET_NEAR_TO_EXPIRY_INPUT_REPORT_START,GET_NEAR_TO_EXPIRY_INPUT_REPORT_SUCCESS,GET_NEAR_TO_EXPIRY_INPUT_REPORT_FAIL} from "./nearToExpiryInputReportActionConstants";

//  NEAR TO EXPIRY INPUT REPORT ACTION

export const getNearToExpiryInputReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_NEAR_TO_EXPIRY_INPUT_REPORT_START,
        payload: payload,
    })
}

export const getNearToExpiryInputReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_NEAR_TO_EXPIRY_INPUT_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getNearToExpiryInputReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_NEAR_TO_EXPIRY_INPUT_REPORT_FAIL,
        payload: payload,
    })
}
