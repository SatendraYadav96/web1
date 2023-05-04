import { createReducer } from './reducerUtils'
import {GET_AGEING_REPORT_SUCCESS,GET_AGEING_REPORT_FAIL} from "../actions/reports/ageingReportActionConstants";



//AGEING REPORT REDUCER


const initialState = {
    ageingList: [],
    ageingReportLoading: false,
    error: {}
}

const getAgeingReportSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        ageingList:payload.ageingList,
        ageingReportLoading: false

    }
}



const getAgeingReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ageingList:[],
        ageingReportLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_AGEING_REPORT_SUCCESS]: getAgeingReportSuccessReducer,
    [GET_AGEING_REPORT_FAIL]: getAgeingReportFailReducer


})



