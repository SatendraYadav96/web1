import {GET_DISPATCHES_REPORT_START,GET_DISPATCHES_REPORT_SUCCESS,GET_DISPATCHES_REPORT_FAIL} from "./dispatchesReportActionConstants";




//  DISPATCHES REPORT ACTION


export const getDispatchesReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DISPATCHES_REPORT_START,
        payload: payload,
    })
}

export const getDispatchesReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DISPATCHES_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getDispatchesReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DISPATCHES_REPORT_FAIL,
        payload: payload,
    })
}
