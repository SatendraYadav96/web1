import {GET_BATCH_RECONCILIATION_FAIL, GET_BATCH_RECONCILIATION_START, GET_BATCH_RECONCILIATION_SUCCESS} from "./batchReconciliationReportActionConstants";


//  BATCH_RECONCILIATION ACTION
export const getBatchReconciliationStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BATCH_RECONCILIATION_START,
        payload: payload,
    })
}

export const getBatchReconciliationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BATCH_RECONCILIATION_SUCCESS,
        payload: payload,
    })
}

export const getBatchReconciliationFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BATCH_RECONCILIATION_FAIL,
        payload: payload,
    })
}
