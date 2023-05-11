import { createReducer } from './reducerUtils'
import {INVOICE_UPLOAD_SUCCESS, INVOICE_UPLOAD_FAIL} from "../actions/dispatchInvoice/invoiceUploadActionConstants";


//Monthly Dispatch
const initialState = {
    invoiceUploadList: [],
    invoiceUploadLoading: false,
}

const invoiceUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        invoiceUploadList:payload.invoiceUploadList,
        invoiceUploadLoading: false

    }
}

const invoiceUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUploadList:[],
        invoiceUploadLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [INVOICE_UPLOAD_SUCCESS]: invoiceUploadSuccessReducer,
    [INVOICE_UPLOAD_FAIL]: invoiceUploadFailReducer,
})
