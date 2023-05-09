import {GROUP_INVOICE_FAIL, GROUP_INVOICE_START, GROUP_INVOICE_SUCCESS} from "./groupInvoiceActionConstants";

export const groupInvoiceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GROUP_INVOICE_START,
        payload: payload,
    })
}

export const groupInvoiceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GROUP_INVOICE_SUCCESS,
        payload: payload,
    })
}

export const groupInvoiceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GROUP_INVOICE_FAIL,
        payload: payload,
    })
}
