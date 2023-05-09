import { createReducer } from './reducerUtils'
import {GROUP_INVOICE_SUCCESS, GROUP_INVOICE_FAIL} from "../actions/dispatchInvoice/groupInvoiceActionConstants";


//Monthly Dispatch
const initialState = {
    groupInvoiceList: [],
    groupInvoiceLoading: false,
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

export default createReducer(initialState, {
    [GROUP_INVOICE_SUCCESS]: groupInvoiceSuccessReducer,
    [GROUP_INVOICE_FAIL]: groupInvoiceFailReducer,
})
