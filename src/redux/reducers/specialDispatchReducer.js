import { createReducer } from './reducerUtils'
import {GET_SPECIALDISPATCH_SUCCESS,GET_SPECIALDISPATCH_FAIL,
GET_SPECIALEMPLOYEEINVOICEDETAILS_SUCCESS,GET_SPECIALEMPLOYEEINVOICEDETAILS_FAIL} from "../actions/dispatchInvoice/specialDispatchActionConstant";



//Special Dispatch


const initialState = {
    specialData: [],
    specialDispatchLoading: false,

    specialInvoiceDetails: [],
    specialInvoiceDetailsLoading: false,
    error: {}
}

const getSpecialDispatchSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      specialData:payload.specialData,
      specialDispatchLoading: false

    }
}



const getSpecialDispatchFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    specialData:[],
    specialDispatchLoading: false,
    error: payload.error,

  }
}



//special invoice details


const getSpecialEmployeeInvoiceDetailSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      specialInvoiceDetails:payload.specialInvoiceDetails,
      specialInvoiceDetailsLoading: false

    }
}



const getSpecialEmployeeInvoiceDetailFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    specialInvoiceDetails:[],
    specialInvoiceDetailsLoading: false,
    error: payload.error,

  }
}








export default createReducer(initialState, {
    [GET_SPECIALDISPATCH_SUCCESS]: getSpecialDispatchSuccessReducer,
    [GET_SPECIALDISPATCH_FAIL]: getSpecialDispatchFailReducer,
    [GET_SPECIALEMPLOYEEINVOICEDETAILS_SUCCESS]: getSpecialEmployeeInvoiceDetailSuccessReducer,
    [GET_SPECIALEMPLOYEEINVOICEDETAILS_FAIL]: getSpecialEmployeeInvoiceDetailFailReducer



})
