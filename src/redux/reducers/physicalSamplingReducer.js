import { createReducer } from './reducerUtils'
import {GET_PHYSICAL_SAMPLING_REPORT_FAIL, GET_PHYSICAL_SAMPLING_REPORT_SUCCESS} from "../actions/reports/physicalSamplingReportActionConstants";



//PHYSICAL SAMPLING REDUCER


const initialState = {
    physicalSamplingList: [],
    error: {}
}

const getPhysicalSamplingSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        physicalSamplingList:payload.physicalSamplingList,

    }
}



const getPhysicalSamplingFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        physicalSamplingList:[],
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_PHYSICAL_SAMPLING_REPORT_SUCCESS]: getPhysicalSamplingSuccessReducer,
    [GET_PHYSICAL_SAMPLING_REPORT_FAIL]: getPhysicalSamplingFailReducer


})



