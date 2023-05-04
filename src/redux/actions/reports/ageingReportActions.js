import {GET_AGEING_REPORT_START,GET_AGEING_REPORT_SUCCESS,GET_AGEING_REPORT_FAIL} from "./ageingReportActionConstants";

//  AGEING REPORT ACTION

export const getAgeingReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_AGEING_REPORT_START,
        payload: payload,
    })
}

export const getAgeingReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_AGEING_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getAgeingReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_AGEING_REPORT_FAIL,
        payload: payload,
    })
}
