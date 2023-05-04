import { createReducer } from './reducerUtils'
import {GET_ITEM_WISE_REPORT_SUCCESS,GET_ITEM_WISE_REPORT_FAIL} from "../actions/reports/itemWiseReportActionConstants";



//ITEM_WISE REPORT REDUCER


const initialState = {
    itemWiseList: [],
    itemWiseReportLoading: false,
    error: {}
}

const getItemWiseReportSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        itemWiseList:payload.itemWiseList,
        itemWiseReportLoading: false

    }
}



const getItemWiseReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        itemWiseList:[],
        itemWiseReportLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_ITEM_WISE_REPORT_SUCCESS]: getItemWiseReportSuccessReducer,
    [GET_ITEM_WISE_REPORT_FAIL]: getItemWiseReportFailReducer


})



