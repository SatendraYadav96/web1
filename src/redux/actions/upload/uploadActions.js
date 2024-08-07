

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
    INVOICE_UPLOAD_SUCCESS,
    MATERIAL_EXPIRY_EXCEL_FAIL,
    MATERIAL_EXPIRY_EXCEL_START,
    MATERIAL_EXPIRY_EXCEL_SUCCESS, MATERIAL_EXPIRY_UPLOAD_FAIL,
    MATERIAL_EXPIRY_UPLOAD_LOG_FAIL,
    MATERIAL_EXPIRY_UPLOAD_LOG_START,
    MATERIAL_EXPIRY_UPLOAD_LOG_SUCCESS, MATERIAL_EXPIRY_UPLOAD_START, MATERIAL_EXPIRY_UPLOAD_SUCCESS,
    NON_COMPLIANCE_EXCEL_FAIL,
    NON_COMPLIANCE_EXCEL_START,
    NON_COMPLIANCE_EXCEL_SUCCESS, NON_COMPLIANCE_UPLOAD_FAIL,
    NON_COMPLIANCE_UPLOAD_LOG_FAIL,
    NON_COMPLIANCE_UPLOAD_LOG_START,
    NON_COMPLIANCE_UPLOAD_LOG_SUCCESS, NON_COMPLIANCE_UPLOAD_START, NON_COMPLIANCE_UPLOAD_SUCCESS,
    OVER_SAMPLING_DETAILS_EXCEL_FAIL,
    OVER_SAMPLING_DETAILS_EXCEL_START,
    OVER_SAMPLING_DETAILS_EXCEL_SUCCESS, OVER_SAMPLING_DETAILS_UPLOAD_FAIL,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_FAIL,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_START,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_SUCCESS, OVER_SAMPLING_DETAILS_UPLOAD_START, OVER_SAMPLING_DETAILS_UPLOAD_SUCCESS,
    OVER_SAMPLING_EXCEL_FAIL,
    OVER_SAMPLING_EXCEL_START,
    OVER_SAMPLING_EXCEL_SUCCESS, OVER_SAMPLING_UPLOAD_FAIL,
    OVER_SAMPLING_UPLOAD_LOG_FAIL,
    OVER_SAMPLING_UPLOAD_LOG_START,
    OVER_SAMPLING_UPLOAD_LOG_SUCCESS, OVER_SAMPLING_UPLOAD_START, OVER_SAMPLING_UPLOAD_SUCCESS,
    RECIPIENT_UPLOAD_LOG_FAIL,
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



export const overSamplingUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const overSamplingUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const overSamplingUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}


export const overSamplingDetailsUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const overSamplingDetailsUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const overSamplingDetailsUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}


export const materialExpiryUploadLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_LOG_START,
        payload: payload,
    })
}

export const materialExpiryUploadLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_LOG_SUCCESS,
        payload: payload,
    })
}

export const materialExpiryUploadLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_LOG_FAIL,
        payload: payload,
    })
}



export const nonComplianceExcelStartAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_EXCEL_START,
        payload: payload,
    })
}

export const nonComplianceExcelSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_EXCEL_SUCCESS,
        payload: payload,
    })
}

export const nonComplianceExcelFailAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_EXCEL_FAIL,
        payload: payload,
    })
}



export const overSamplingExcelStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_EXCEL_START,
        payload: payload,
    })
}

export const overSamplingExcelSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_EXCEL_SUCCESS,
        payload: payload,
    })
}

export const overSamplingExcelFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_EXCEL_FAIL,
        payload: payload,
    })
}


export const overSamplingDetailsExcelStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_EXCEL_START,
        payload: payload,
    })
}

export const overSamplingDetailsExcelSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_EXCEL_SUCCESS,
        payload: payload,
    })
}

export const overSamplingDetailsExcelFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_EXCEL_FAIL,
        payload: payload,
    })
}



export const materialExpiryExcelStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_EXCEL_START,
        payload: payload,
    })
}

export const materialExpiryExcelSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_EXCEL_SUCCESS,
        payload: payload,
    })
}

export const materialExpiryExcelFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_EXCEL_FAIL,
        payload: payload,
    })
}

export const nonComplianceUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_START,
        payload: payload,
    })
}

export const nonComplianceUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const nonComplianceUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: NON_COMPLIANCE_UPLOAD_FAIL,
        payload: payload,
    })
}

export const overSamplingUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_START,
        payload: payload,
    })
}

export const overSamplingUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const overSamplingUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_UPLOAD_FAIL,
        payload: payload,
    })
}

export const overSamplingDetailsUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_START,
        payload: payload,
    })
}

export const overSamplingDetailsUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const overSamplingDetailsUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: OVER_SAMPLING_DETAILS_UPLOAD_FAIL,
        payload: payload,
    })
}

export const materialExpiryUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_START,
        payload: payload,
    })
}

export const materialExpiryUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const materialExpiryUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MATERIAL_EXPIRY_UPLOAD_FAIL,
        payload: payload,
    })
}
