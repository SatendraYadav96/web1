import {GET_ITEM_WISE_REPORT_START,GET_ITEM_WISE_REPORT_SUCCESS,GET_ITEM_WISE_REPORT_FAIL} from "./itemWiseReportActionConstants";

//  ITEM_WISE REPORT ACTION

export const getItemWiseReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_WISE_REPORT_START,
        payload: payload,
    })
}

export const getItemWiseReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ITEM_WISE_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getItemWiseReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_WISE_REPORT_FAIL,
        payload: payload,
    })
}
