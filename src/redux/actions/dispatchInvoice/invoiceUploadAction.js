import {GET_INVOICE_UPLOAD_CSV_FAIL, GET_INVOICE_UPLOAD_CSV_START, GET_INVOICE_UPLOAD_CSV_SUCCESS, GET_INVOICE_UPLOAD_FAIL, GET_INVOICE_UPLOAD_START, GET_INVOICE_UPLOAD_SUCCESS} from "./invoiceUploadActionConstants";

export const invoiceUploadStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVOICE_UPLOAD_START,
        payload: payload,
    })
}

export const invoiceUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_INVOICE_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const invoiceUploadFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVOICE_UPLOAD_FAIL,
        payload: payload,
    })
}

export const invoiceUploadCsvStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVOICE_UPLOAD_CSV_START,
        payload: payload,
    })
}

export const invoiceUploadCsvSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_INVOICE_UPLOAD_CSV_SUCCESS,
        payload: payload,
    })
}

export const invoiceUploadCsvFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVOICE_UPLOAD_CSV_FAIL,
        payload: payload,
    })
}
