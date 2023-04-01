import { createReducer } from './reducerUtils'
import {GET_RECIPIENT_REPORT_SUCCESS,GET_RECIPIENT_REPORT_FAIL} from "../actions/reports/recipientReportActionConstants";



//RECIPIENT REPORT REDUCER


const initialState = {
    recipientList: [],
    recipientReportLoading: false,
    error: {}
}

const getRecipientReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      recipientList:payload.recipientList,
      recipientReportLoading: false

    }
}



const getRecipientReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    recipientList:[],
    recipientReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_RECIPIENT_REPORT_SUCCESS]: getRecipientReportSuccessReducer,
    [GET_RECIPIENT_REPORT_FAIL]: getRecipientReportFailReducer


})



