import {GET_ITEM_CONSUMPTION_REPORT_START,GET_ITEM_CONSUMPTION_REPORT_SUCCESS,GET_ITEM_CONSUMPTION_REPORT_FAIL} from "./itemConsumptionReportActionConstants";




//  ITEM CONSUMPTION REPORT ACTION


export const getItemConsumptionReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_CONSUMPTION_REPORT_START,
        payload: payload,
    })
}

export const getItemConsumptionReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ITEM_CONSUMPTION_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getItemConsumptionReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_CONSUMPTION_REPORT_FAIL,
        payload: payload,
    })
}
