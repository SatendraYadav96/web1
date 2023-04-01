import { createReducer } from './reducerUtils'
import {GET_DESTRUCTION_REPORT_SUCCESS,GET_DESTRUCTION_REPORT_FAIL} from "../actions/reports/destructionReportActionConstants";



//DESTRUCTION REPORT REDUCER


const initialState = {
    destructionList: [],
    destructionReportLoading: false,
    error: {}
}

const getDestructionReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      destructionList:payload.destructionList,
      destructionReportLoading: false

    }
}



const getDestructionReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    destructionList:[],
    destructionReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_DESTRUCTION_REPORT_SUCCESS]: getDestructionReportSuccessReducer,
    [GET_DESTRUCTION_REPORT_FAIL]: getDestructionReportFailReducer


})



