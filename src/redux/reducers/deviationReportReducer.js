import { createReducer } from './reducerUtils'
import {GET_DEVIATION_REPORT_SUCCESS,GET_DEVIATION_REPORT_FAIL} from "../actions/reports/deviationReportActionConstants";



//DEVIATION REPORT REDUCER


const initialState = {
    deviationList: [],
    deviationReportLoading: false,
    error: {}
}

const getDeviationReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      deviationList:payload.deviationList,
      deviationReportLoading: false

    }
}



const getDeviationReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    deviationList:[],
    deviationReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_DEVIATION_REPORT_SUCCESS]: getDeviationReportSuccessReducer,
    [GET_DEVIATION_REPORT_FAIL]: getDeviationReportFailReducer


})



