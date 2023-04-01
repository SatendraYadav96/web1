import { createReducer } from './reducerUtils'
import {GET_DISPATCH_REGISTER_REPORT_SUCCESS,GET_DISPATCH_REGISTER_REPORT_FAIL} from "../actions/reports/dispatchRegisterReportActionConstants";



//DISPATCH REGISTER REPORT REDUCER


const initialState = {
    dispatchRegisterList: [],
    dispatchRegisterReportLoading: false,
    error: {}
}

const getDispatchRegisterReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      dispatchRegisterList:payload.dispatchRegisterList,
      dispatchRegisterReportLoading: false

    }
}



const getDispatchRegisterReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    dispatchRegisterList:[],
    dispatchRegisterReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_DISPATCH_REGISTER_REPORT_SUCCESS]: getDispatchRegisterReportSuccessReducer,
    [GET_DISPATCH_REGISTER_REPORT_FAIL]: getDispatchRegisterReportFailReducer


})



