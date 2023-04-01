import { createReducer } from './reducerUtils'
import {GET_MONTHLYDISPATCH_SUCCESS,GET_MONTHLYDISPATCH_FAIL,
GET_EMPLOYEEINVOICEDETAILS_SUCCESS,GET_EMPLOYEEINVOICEDETAILS_FAIL} from "../actions/dispatchInvoice/monthlyDispatchActionConstant";



//Monthly Dispatch


const initialState = {
    monthList: [],
    monthlyDispatchLoading: false,
    invoiceList: [],
    invoiceDetailsLoading: false,
    error: {}
}

const getMonthlyDispatchSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      monthList:payload.monthList,
      monthlyDispatchLoading: false

    }
}



const getMonthlyDispatchFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    monthList:[],
    monthlyDispatchLoading: false,
    error: payload.error,

  }
}


//Employee Invoice Details



//const initialStates = {
//    invoiceList: [],
//    invoiceDetailsLoading: false,
//    error: {}
//}

const getEmployeeInvoiceDetailSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      invoiceList:payload.invoiceList,
      invoiceDetailsLoading: false

    }
}



const getEmployeeInvoiceDetailFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    invoiceList:[],
    invoiceDetailsLoading: false,
    error: payload.error,

  }
}



export default createReducer(initialState, {
    [GET_MONTHLYDISPATCH_SUCCESS]: getMonthlyDispatchSuccessReducer,
    [GET_MONTHLYDISPATCH_FAIL]: getMonthlyDispatchFailReducer,
    [GET_EMPLOYEEINVOICEDETAILS_SUCCESS]: getEmployeeInvoiceDetailSuccessReducer,
    [GET_EMPLOYEEINVOICEDETAILS_FAIL]: getEmployeeInvoiceDetailFailReducer,

})
