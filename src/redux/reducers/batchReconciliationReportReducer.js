import { createReducer } from './reducerUtils'
import {
    GET_BATCH_RECONCILIATION_FAIL,
    GET_BATCH_RECONCILIATION_SUCCESS,
    GET_SHIP_ROCKET_REPORT_FAIL,
    GET_SHIP_ROCKET_REPORT_SUCCESS,
    GET_VIRTUAL_RECONCILIATION_REPORT_FAIL,
    GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS, OVER_SAMPLING_MAIL_FAIL,
    OVER_SAMPLING_MAIL_SUCCESS
} from "../actions/reports/batchReconciliationReportActionConstants";



//BATCH RECONCILIATION REPORT REDUCER


const initialState = {
    batchReconciliationList: [],
    overSamplingMail:[],
    overSamplingMailLoading:false,
    batchReconciliationLoading: false,
    virtualReconciliationList:[],
    virtualReconciliationListLoading:false,
    shipRocketReport: [],
    shipRocketReportLoading:false,
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
        virtualReconciliationList: payload.virtualReconciliationList,
        virtualReconciliationListLoading: false
    }
}

export const getVirtualReconciliationFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        virtualReconciliationList: [],
        virtualReconciliationListLoading: false,
        error: payload.error
    }
}

const getShipRocketSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        shipRocketReport: payload.shipRocketReport,
        shipRocketReportLoading: false
    }
}

export const getShipRocketReportFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        shipRocketReport: [],
        shipRocketReportLoading: false,

        error: payload.error
    }
}


const overSamplingMailSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        overSamplingMail:payload.overSamplingMail,
        overSamplingMailLoading: false

    }
}



const overSamplingMailFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingMail:[],
        overSamplingMailLoading: false,
        error: payload.error,

    }
}




export default createReducer(initialState, {
    [GET_BATCH_RECONCILIATION_SUCCESS]: getBatchReconciliationSuccessReducer,
    [GET_BATCH_RECONCILIATION_FAIL]: getBatchReconciliationFailReducer,
    [GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS]: getBatchReconciliationSuccessReducer,
    [GET_VIRTUAL_RECONCILIATION_REPORT_FAIL]: getVirtualReconciliationFailReducer,
    [GET_SHIP_ROCKET_REPORT_SUCCESS]: getShipRocketSuccessReducer,
    [GET_SHIP_ROCKET_REPORT_FAIL]: getShipRocketReportFailReducer,
    [OVER_SAMPLING_MAIL_SUCCESS]:overSamplingMailSuccessReducer,
    [OVER_SAMPLING_MAIL_FAIL]:overSamplingMailFailReducer

})



