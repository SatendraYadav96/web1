import {GET_INVENTORY_REPORT_FAIL, GET_INVENTORY_REPORT_START, GET_INVENTORY_REPORT_SUCCESS, GET_INVENTORY_REVERSAL_HISTORY_FAIL, GET_INVENTORY_REVERSAL_HISTORY_START, GET_INVENTORY_REVERSAL_HISTORY_SUCCESS} from "./inventoryReportActionConstants";

export const getInventoryReportStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_INVENTORY_REPORT_START,
    payload: payload,
  })
}

export const getInventoryReportSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_INVENTORY_REPORT_SUCCESS,
    payload: payload,
  })
}

export const getInventoryReportFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_INVENTORY_REPORT_FAIL,
    payload: payload,
  })
}

export const getInventoryReversalHistoryStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_START,
        payload: payload,
    })
}

export const getInventoryReversalHistorySuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_SUCCESS,
        payload: payload,
    })
}

export const getInventoryReversalHistoryFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_FAIL,
        payload: payload,
    })
}
