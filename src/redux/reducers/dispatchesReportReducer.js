import { createReducer } from './reducerUtils'
import {GET_DISPATCHES_REPORT_SUCCESS,GET_DISPATCHES_REPORT_FAIL} from "../actions/reports/dispatchesReportActionConstants";



//DISPATCHES REPORT REDUCER


const initialState = {
    dispatchesList: [],
    dispatchesReportLoading: false,
    error: {}
}

const getDispatchesReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      dispatchesList:payload.dispatchesList,
      dispatchesReportLoading: false

    }
}



const getDispatchesReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    dispatchesList:[],
    dispatchesReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_DISPATCHES_REPORT_SUCCESS]: getDispatchesReportSuccessReducer,
    [GET_DISPATCHES_REPORT_FAIL]: getDispatchesReportFailReducer


})



