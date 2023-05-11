import {INVOICE_UPLOAD_FAIL, INVOICE_UPLOAD_START, INVOICE_UPLOAD_SUCCESS} from "./invoiceUploadActionConstants";

export const invoiceUploadStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: INVOICE_UPLOAD_START,
        payload: payload,
    })
}

export const invoiceUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const invoiceUploadFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: INVOICE_UPLOAD_FAIL,
        payload: payload,
    })
}
