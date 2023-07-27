import { createReducer } from './reducerUtils'
import {GET_BATCH_RECONCILIATION_FAIL, GET_BATCH_RECONCILIATION_SUCCESS} from "../actions/reports/batchReconciliationReportActionConstants";



//BATCH RECONCILIATION REPORT REDUCER


const initialState = {
    batchReconciliationList: [],
    batchReconciliationLoading: false,
    error: {}
}

const getBatchReconciliationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        batchReconciliationList:payload.batchReconciliationList,
        batchReconciliationLoading: false

    }
}



const getBatchReconciliationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        batchReconciliationList:[],
        batchReconciliationLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_BATCH_RECONCILIATION_SUCCESS]: getBatchReconciliationSuccessReducer,
    [GET_BATCH_RECONCILIATION_FAIL]: getBatchReconciliationFailReducer


})



