

// TRANSPORT_UPLOAD
import {
    FF_EXCEL_UPLOAD_FAIL,
    FF_EXCEL_UPLOAD_START,
    FF_EXCEL_UPLOAD_SUCCESS,
    FF_UPLOAD_FAIL,
    FF_UPLOAD_LOG_FAIL,
    FF_UPLOAD_LOG_START,
    FF_UPLOAD_LOG_SUCCESS,
    FF_UPLOAD_START,
    FF_UPLOAD_SUCCESS,
    GRN_EXCEL_UPLOAD_FAIL,
    GRN_EXCEL_UPLOAD_START,
    GRN_EXCEL_UPLOAD_SUCCESS,
    GRN_UPLOAD_FAIL,
    GRN_UPLOAD_START,
    GRN_UPLOAD_SUCCESS,
    INVOICE_EXCEL_UPLOAD_FAIL,
    INVOICE_EXCEL_UPLOAD_START,
    INVOICE_EXCEL_UPLOAD_SUCCESS,
    INVOICE_UPLOAD_FAIL,
    INVOICE_UPLOAD_START,
    INVOICE_UPLOAD_SUCCESS, NON_COMPLIANCE_UPLOAD_LOG_FAIL, NON_COMPLIANCE_UPLOAD_LOG_START, NON_COMPLIANCE_UPLOAD_LOG_SUCCESS, RECIPIENT_UPLOAD_LOG_FAIL,
    RECIPIENT_UPLOAD_LOG_START,
    RECIPIENT_UPLOAD_LOG_SUCCESS,
    TRANSPORT_EXCEL_UPLOAD_FAIL,
    TRANSPORT_EXCEL_UPLOAD_START,
    TRANSPORT_EXCEL_UPLOAD_SUCCESS,
    TRANSPORT_UPLOAD_FAIL,
    TRANSPORT_UPLOAD_START,
    TRANSPORT_UPLOAD_SUCCESS,
    VIRTUAL_SAMPLE_UPLOAD_FAIL,
    VIRTUAL_SAMPLE_UPLOAD_LOG_FAIL,
    VIRTUAL_SAMPLE_UPLOAD_LOG_START,
    VIRTUAL_SAMPLE_UPLOAD_LOG_SUCCESS,
    VIRTUAL_SAMPLE_UPLOAD_START,
    VIRTUAL_SAMPLE_UPLOAD_SUCCESS,
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

export const invoiceExcelUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_EXCEL_UPLOAD_START,
        payload: payload,
    })
}

export const invoiceExcelUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_EXCEL_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const invoiceExcelUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_EXCEL_UPLOAD_FAIL,
        payload: payload,
    })
}

export const virtualSampleStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_START,
        payload: payload,
    })
}

export const virtualSampleSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const virtualSampleFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_FAIL,
        payload: payload,
    })
}

export const virtualSampleLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const virtualSampleLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const virtualSampleLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_SAMPLE_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}

export const ffExcelUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_EXCEL_UPLOAD_START,
        payload: payload,
    })
}

export const ffExcelUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_EXCEL_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const ffExcelUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_EXCEL_UPLOAD_FAIL,
        payload: payload,
    })
}

export const ffUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const ffUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const ffUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: FF_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}

export const recipientUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const recipientUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const recipientUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}

export const nonComplianceUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const nonComplianceUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const nonComplianceUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}

