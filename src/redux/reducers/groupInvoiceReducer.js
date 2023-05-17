import { createReducer } from './reducerUtils'
import {GROUP_INVOICE_SUCCESS, GROUP_INVOICE_FAIL, GROUP_INVOICE_UPLOAD_SUCCESS, GROUP_INVOICE_UPLOAD_FAIL} from "../actions/dispatchInvoice/groupInvoiceActionConstants";


//Monthly Dispatch
const initialState = {
    groupInvoiceList: [],
    groupInvoiceLoading: false,
    groupInvoiceUploadList: [],
    groupInvoiceUploadLoading: false,
}

const groupInvoiceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        groupInvoiceList:payload.groupInvoiceList,
        groupInvoiceLoading: false

    }
}

const groupInvoiceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        groupInvoiceList:[],
        groupInvoiceLoading: false,
        error: payload.error,

    }
}

const groupInvoiceUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        groupInvoiceUploadList:payload.groupInvoiceUploadList,
        groupInvoiceUploadLoading: false

    }
}

const groupInvoiceUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        groupInvoiceUploadList:[],
        groupInvoiceUploadLoading: false,
        error: payload.error,

    }
}
export default createReducer(initialState, {
    [GROUP_INVOICE_SUCCESS]: groupInvoiceSuccessReducer,
    [GROUP_INVOICE_FAIL]: groupInvoiceFailReducer,
    [GROUP_INVOICE_UPLOAD_SUCCESS]: groupInvoiceUploadSuccessReducer,
    [GROUP_INVOICE_UPLOAD_FAIL]: groupInvoiceUploadFailReducer,
})
