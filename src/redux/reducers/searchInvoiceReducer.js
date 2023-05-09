import { createReducer } from './reducerUtils'
import {SEARCH_INVOICE_SUCCESS, SEARCH_INVOICE_FAIL} from "../actions/dispatchInvoice/searchInvoiceActionConstants";


//Monthly Dispatch
const initialState = {
    searchInvoiceList: [],
    searchInvoiceLoading: false,
}

const searchInvoiceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        searchInvoiceList:payload.searchInvoiceList,
        searchInvoiceLoading: false

    }
}

const searchInvoiceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        searchInvoiceList:[],
        searchInvoiceLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [SEARCH_INVOICE_SUCCESS]: searchInvoiceSuccessReducer,
    [SEARCH_INVOICE_FAIL]: searchInvoiceFailReducer,
})
