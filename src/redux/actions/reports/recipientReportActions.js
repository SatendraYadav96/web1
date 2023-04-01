import {GET_RECIPIENT_REPORT_START,GET_RECIPIENT_REPORT_SUCCESS,GET_RECIPIENT_REPORT_FAIL} from "./recipientReportActionConstants";




//  RECIPIENT REPORT ACTION


export const getRecipientReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_RECIPIENT_REPORT_START,
        payload: payload,
    })
}

export const getRecipientReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_RECIPIENT_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getRecipientReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_RECIPIENT_REPORT_FAIL,
        payload: payload,
    })
}
