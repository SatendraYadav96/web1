import { createReducer } from './reducerUtils'
import {INVOICE_UPLOAD_SUCCESS, INVOICE_UPLOAD_FAIL, GET_INVOICE_UPLOAD_SUCCESS, GET_INVOICE_UPLOAD_FAIL, GET_INVOICE_UPLOAD_CSV_SUCCESS, GET_INVOICE_UPLOAD_CSV_FAIL, GET_INVOICE_UPLOAD_START} from "../actions/dispatchInvoice/invoiceUploadActionConstants";


//Monthly Dispatch
const initialState = {
    invoiceUploadList: [],
    invoiceUploadSuccess: false,
    invoiceUploadLoading: false,
    invoiceUploadCsv: [],
    invoiceUploadCsvLoading: false,
}

const invoiceUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUploadSuccess: false,
    }
}

const invoiceUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUploadSuccess: true,
        invoiceUploadList:payload.invoiceUploadList,
        invoiceUploadLoading: false

    }
}

const invoiceUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUploadList:[],
        invoiceUploadLoading: false,
        invoiceUploadSuccess: false,
        error: payload.error,

    }
}

const invoiceUploadCsvSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        invoiceUploadCsvList:payload.invoiceUploadCsvList,
        invoiceUploadCsvLoading: false

    }
}

const invoiceUploadCsvFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUploadCsvList:[],
        invoiceUploadCsvLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_INVOICE_UPLOAD_START]: invoiceUploadStartReducer,
    [GET_INVOICE_UPLOAD_SUCCESS]: invoiceUploadSuccessReducer,
    [GET_INVOICE_UPLOAD_FAIL]: invoiceUploadFailReducer,
    [GET_INVOICE_UPLOAD_CSV_SUCCESS]: invoiceUploadCsvSuccessReducer,
    [GET_INVOICE_UPLOAD_CSV_FAIL]: invoiceUploadCsvFailReducer,
})
