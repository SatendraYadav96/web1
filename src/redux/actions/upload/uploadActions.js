

// TRANSPORT_UPLOAD
import {
    FF_UPLOAD_FAIL,
    FF_UPLOAD_START,
    FF_UPLOAD_SUCCESS, GRN_EXCEL_UPLOAD_FAIL,
    GRN_EXCEL_UPLOAD_START, GRN_EXCEL_UPLOAD_SUCCESS,
    GRN_UPLOAD_FAIL,
    GRN_UPLOAD_START,
    GRN_UPLOAD_SUCCESS, INVOICE_UPLOAD_FAIL, INVOICE_UPLOAD_START, INVOICE_UPLOAD_SUCCESS, TRANSPORT_EXCEL_UPLOAD_FAIL, TRANSPORT_EXCEL_UPLOAD_START, TRANSPORT_EXCEL_UPLOAD_SUCCESS,
    TRANSPORT_UPLOAD_FAIL,
    TRANSPORT_UPLOAD_START,
    TRANSPORT_UPLOAD_SUCCESS,
    VIRTUAL_UPLOAD_FAIL,
    VIRTUAL_UPLOAD_START,
    VIRTUAL_UPLOAD_SUCCESS
} from "./uploadActionConstants";

export const transportUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_START,
        payload: payload,
    })
}

export const transportUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const transportUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_FAIL,
        payload: payload,
    })
}

export const transportExcelUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_EXCEL_UPLOAD_START,
        payload: payload,
    })
}

export const transportExcelUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_EXCEL_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const transportExcelUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_EXCEL_UPLOAD_FAIL,
        payload: payload,
    })
}

export const grnUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_UPLOAD_START,
        payload: payload,
    })
}

export const grnUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const grnUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_UPLOAD_FAIL,
        payload: payload,
    })
}

export const grnExcelUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_EXCEL_UPLOAD_START,
        payload: payload,
    })
}

export const grnExcelUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_EXCEL_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const grnExcelUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GRN_EXCEL_UPLOAD_FAIL,
        payload: payload,
    })
}


export const ffUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_START,
        payload: payload,
    })
}

export const ffUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const ffUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_FAIL,
        payload: payload,
    })
}


export const virtualUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_UPLOAD_START,
        payload: payload,
    })
}

export const virtualUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const virtualUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_UPLOAD_FAIL,
        payload: payload,
    })
}

export const invoiceUploadStartAction = (payload) => (dispatch) => {
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

export const invoiceUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_UPLOAD_FAIL,
        payload: payload,
    })
}


