import { createReducer } from './reducerUtils'
import {GET_SIMPLE_INVENTORY_REPORT_SUCCESS,GET_SIMPLE_INVENTORY_REPORT_FAIL} from "../actions/reports/simpleInventoryReportActionConstants";



//SIMPLE_INVENTORY REPORT REDUCER


const initialState = {
    simpleInventoryList: [],
    simpleInventoryReportLoading: false,
    error: {}
}

const getSimpleInventoryReportSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        simpleInventoryList:payload.simpleInventoryList,
        simpleInventoryReportLoading: false

    }
}



const getSimpleInventoryReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        simpleInventoryList:[],
        simpleInventoryReportLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_SIMPLE_INVENTORY_REPORT_SUCCESS]: getSimpleInventoryReportSuccessReducer,
    [GET_SIMPLE_INVENTORY_REPORT_FAIL]: getSimpleInventoryReportFailReducer


})



