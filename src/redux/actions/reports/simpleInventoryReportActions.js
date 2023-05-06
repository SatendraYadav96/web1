import {GET_SIMPLE_INVENTORY_REPORT_START,GET_SIMPLE_INVENTORY_REPORT_SUCCESS,GET_SIMPLE_INVENTORY_REPORT_FAIL} from "./simpleInventoryReportActionConstants";


//  SIMPLE_INVENTORY REPORT ACTION
export const getSimpleInventoryReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SIMPLE_INVENTORY_REPORT_START,
        payload: payload,
    })
}

export const getSimpleInventoryReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SIMPLE_INVENTORY_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getSimpleInventoryReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SIMPLE_INVENTORY_REPORT_FAIL,
        payload: payload,
    })
}
