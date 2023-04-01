import { createReducer } from './reducerUtils'
import {GET_PURCHASE_REPORT_SUCCESS,GET_PURCHASE_REPORT_FAIL} from "../actions/reports/purchaseReportActionConstants";



//PURCHASE REPORT REDUCER


const initialState = {
    purchaseList: [],
    purchaseReportLoading: false,
    error: {}
}

const getPurchaseReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      purchaseList:payload.purchaseList,
      purchaseReportLoading: false

    }
}



const getPurchaseReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    purchaseList:[],
    purchaseReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_PURCHASE_REPORT_SUCCESS]: getPurchaseReportSuccessReducer,
    [GET_PURCHASE_REPORT_FAIL]: getPurchaseReportFailReducer


})



