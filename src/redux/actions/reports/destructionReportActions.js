import {GET_DESTRUCTION_REPORT_START,GET_DESTRUCTION_REPORT_SUCCESS,GET_DESTRUCTION_REPORT_FAIL} from "./destructionReportActionConstants";




//  DESTRUCTION REPORT ACTION


export const getDestructionReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DESTRUCTION_REPORT_START,
        payload: payload,
    })
}

export const getDestructionReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DESTRUCTION_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getDestructionReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DESTRUCTION_REPORT_FAIL,
        payload: payload,
    })
}
