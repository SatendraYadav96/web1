import { createReducer } from './reducerUtils'
import {GET_NEAR_TO_EXPIRY_INPUT_REPORT_FAIL, GET_NEAR_TO_EXPIRY_INPUT_REPORT_SUCCESS} from "../actions/reports/nearToExpiryInputReportActionConstants";

//NEAR_TO_EXPIRY_INPUT REPORT REDUCER


const initialState = {
    nearToExpiryInputList: [],
    nearToExpiryInputReportLoading: false,
    error: {}
}

const getNearToExpiryInputReportSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        nearToExpiryInputList:payload.nearToExpiryInputList,
        nearToExpiryInputReportLoading: false

    }
}

const getNearToExpiryInputReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        nearToExpiryInputList:[],
        nearToExpiryInputReportLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_NEAR_TO_EXPIRY_INPUT_REPORT_SUCCESS]: getNearToExpiryInputReportSuccessReducer,
    [GET_NEAR_TO_EXPIRY_INPUT_REPORT_FAIL]: getNearToExpiryInputReportFailReducer

})



