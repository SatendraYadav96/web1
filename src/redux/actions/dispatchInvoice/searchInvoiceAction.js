import {SEARCH_INVOICE_FAIL, SEARCH_INVOICE_START, SEARCH_INVOICE_SUCCESS} from "./searchInvoiceActionConstants";

export const searchInvoiceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: SEARCH_INVOICE_START,
        payload: payload,
    })
}

export const searchInvoiceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SEARCH_INVOICE_SUCCESS,
        payload: payload,
    })
}

export const searchInvoiceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: SEARCH_INVOICE_FAIL,
        payload: payload,
    })
}
