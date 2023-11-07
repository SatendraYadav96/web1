import { createReducer } from './reducerUtils'
import {GET_BATCH_RECONCILIATION_FAIL, GET_BATCH_RECONCILIATION_SUCCESS, GET_SHIP_ROCKET_REPORT_FAIL, GET_SHIP_ROCKET_REPORT_SUCCESS, GET_VIRTUAL_RECONCILIATION_REPORT_FAIL, GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS} from "../actions/reports/batchReconciliationReportActionConstants";



//BATCH RECONCILIATION REPORT REDUCER


const initialState = {
    batchReconciliationList: [],
    batchReconciliationLoading: false,
    virtualReconciliation:{},
    shipRocketReport: {},
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

const getVirtualReconciliationSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        virtualReconciliation: payload.getVirtualReconciliationList,
    }
}

export const getVirtualReconciliationFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        virtualReconciliation: {},
        error: payload.error
    }
}

const getShipRocketSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        shipRocketReport: payload.shipRocketReport,
    }
}

export const getShipRocketReportFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        shipRocketReport: {},
        error: payload.error
    }
}

export default createReducer(initialState, {
    [GET_BATCH_RECONCILIATION_SUCCESS]: getBatchReconciliationSuccessReducer,
    [GET_BATCH_RECONCILIATION_FAIL]: getBatchReconciliationFailReducer,
    [GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS]: getBatchReconciliationSuccessReducer,
    [GET_VIRTUAL_RECONCILIATION_REPORT_FAIL]: getVirtualReconciliationFailReducer,
    [GET_SHIP_ROCKET_REPORT_SUCCESS]: getShipRocketSuccessReducer,
    [GET_SHIP_ROCKET_REPORT_FAIL]: getShipRocketReportFailReducer

})



