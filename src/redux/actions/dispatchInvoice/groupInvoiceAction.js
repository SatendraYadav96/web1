import {GROUP_INVOICE_FAIL, GROUP_INVOICE_START, GROUP_INVOICE_SUCCESS, GROUP_INVOICE_UPLOAD_FAIL, GROUP_INVOICE_UPLOAD_START, GROUP_INVOICE_UPLOAD_SUCCESS} from "./groupInvoiceActionConstants";

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

export const groupInvoiceUploadStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GROUP_INVOICE_UPLOAD_START,
        payload: payload,
    })
}

export const groupInvoiceUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GROUP_INVOICE_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const groupInvoiceUploadFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GROUP_INVOICE_UPLOAD_FAIL,
        payload: payload,
    })
}

