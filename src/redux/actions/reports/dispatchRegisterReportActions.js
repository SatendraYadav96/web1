import {GET_DISPATCH_REGISTER_REPORT_START,GET_DISPATCH_REGISTER_REPORT_SUCCESS,GET_DISPATCH_REGISTER_REPORT_FAIL} from "./dispatchRegisterReportActionConstants";




//  DISPATCH REGISTER REPORT ACTION


export const getDispatchRegisterReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DISPATCH_REGISTER_REPORT_START,
        payload: payload,
    })
}

export const getDispatchRegisterReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DISPATCH_REGISTER_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getDispatchRegisterReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_DISPATCH_REGISTER_REPORT_FAIL,
        payload: payload,
    })
}
