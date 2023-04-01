import {GET_DEVIATION_REPORT_START,GET_DEVIATION_REPORT_SUCCESS,GET_DEVIATION_REPORT_FAIL} from "./deviationReportActionConstants";




//  DEVIATION REPORT ACTION


export const getDeviationReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DEVIATION_REPORT_START,
        payload: payload,
    })
}

export const getDeviationReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DEVIATION_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getDeviationReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DEVIATION_REPORT_FAIL,
        payload: payload,
    })
}
