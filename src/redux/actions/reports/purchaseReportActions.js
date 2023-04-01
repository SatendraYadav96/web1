import {GET_PURCHASE_REPORT_START,GET_PURCHASE_REPORT_SUCCESS,GET_PURCHASE_REPORT_FAIL} from "./purchaseReportActionConstants";




//  PURCHASE REPORT ACTION


export const getPurchaseReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PURCHASE_REPORT_START,
        payload: payload,
    })
}

export const getPurchaseReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PURCHASE_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getPurchaseReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PURCHASE_REPORT_FAIL,
        payload: payload,
    })
}
