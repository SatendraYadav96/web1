import { createReducer } from './reducerUtils'
import {
    GET_MONTHLYDISPATCH_SUCCESS, GET_MONTHLYDISPATCH_FAIL,
    GET_EMPLOYEEINVOICEDETAILS_SUCCESS, GET_EMPLOYEEINVOICEDETAILS_FAIL, GET_PRINT_INVOICE_SUCCESS, GET_PRINT_INVOICE_FAIL, GET_GENERATE_INVOICE_SUCCESS, GET_GENERATE_INVOICE_FAIL, GET_GENERATE_LABEL_SUCCESS, GET_GENERATE_LABEL_FAIL
} from "../actions/dispatchInvoice/monthlyDispatchActionConstant";



//Monthly Dispatch


const initialState = {
    monthList: [],
    monthlyDispatchLoading: false,
    invoiceList: [],
    invoiceDetailsLoading: false,
    printList: [],
    printInvoiceLoading: false,
    generateInvoiceList: [],
    generateInvoiceLoading: false,
    generateLabelList: [],
    generateLabelLoading: false,
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


const getPrintInvoiceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        printList:payload.printList,
        printInvoiceLoading: false

    }
}


const getPrintInvoiceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        printList:[],
        printInvoiceLoading: false,
        error: payload.error,

    }
}



const getGenerateInvoiceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        generateInvoiceList:payload.generateInvoiceList,
        generateInvoiceLoading: false

    }
}


const getGenerateInvoiceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        generateInvoiceList:[],
        generateInvoiceLoading: false,
        error: payload.error,

    }
}


const getGenerateLabelSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        generateLabelList:payload.generateLabelList,
        generateLabelLoading: false

    }
}


const getGenerateLabelFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        generateLabelList:[],
        generateLabelLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_MONTHLYDISPATCH_SUCCESS]: getMonthlyDispatchSuccessReducer,
    [GET_MONTHLYDISPATCH_FAIL]: getMonthlyDispatchFailReducer,
    [GET_EMPLOYEEINVOICEDETAILS_SUCCESS]: getEmployeeInvoiceDetailSuccessReducer,
    [GET_EMPLOYEEINVOICEDETAILS_FAIL]: getEmployeeInvoiceDetailFailReducer,
    [GET_PRINT_INVOICE_SUCCESS]: getPrintInvoiceSuccessReducer,
    [GET_PRINT_INVOICE_FAIL]: getPrintInvoiceFailReducer,
    [GET_GENERATE_INVOICE_SUCCESS]: getGenerateInvoiceSuccessReducer,
    [GET_GENERATE_INVOICE_FAIL]: getGenerateInvoiceFailReducer,
    [GET_GENERATE_LABEL_SUCCESS]: getGenerateLabelSuccessReducer,
    [GET_GENERATE_LABEL_FAIL]: getGenerateLabelFailReducer,
})
