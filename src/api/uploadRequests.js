import {createRequest} from "./httpUtils";

import {
    ADD_BUISNESS_UNIT_API,
    FF_EXCEL_UPLOAD_API,
    FF_UPLOAD_API,
    FF_UPLOAD_LOG_API,
    GET_HUB_NEAR_EXPIRY_API,
    GRN_EXCEL_UPLOAD_API,
    GRN_UPLOAD_API,
    INVOICE_EXCEL_UPLOAD_API,
    INVOICE_UPLOAD_API,
    MATERIAL_EXPIRY_EXCEL_API, MATERIAL_EXPIRY_UPLOAD_API,
    MATERIAL_EXPIRY_UPLOAD_LOG_API,
    NON_COMPLIANCE_EXCEL_API,
    NON_COMPLIANCE_UPLOAD_API,
    NON_COMPLIANCE_UPLOAD_LOG_API,
    OVER_SAMPLING_DETAILS_EXCEL_API, OVER_SAMPLING_DETAILS_UPLOAD_API,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_API,
    OVER_SAMPLING_EXCEL_API, OVER_SAMPLING_UPLOAD_API,
    OVER_SAMPLING_UPLOAD_LOG_API,
    RECIPIENT_UPLOAD_LOG_API,
    TRANSPORT_EXCEL_UPLOAD_API,
    TRANSPORT_UPLOAD_API,
    VIRTUAL_SAMPLE_UPLOAD_API,
    VIRTUAL_SAMPLE_UPLOAD_EXCEL_API,
    VIRTUAL_SAMPLE_UPLOAD_LOG_API,
    VIRTUAL_UPLOAD_API
} from "./apiConstants";

export const transportUploadRequest=  payload => {
    return createRequest(TRANSPORT_UPLOAD_API, payload.certificate, payload.dto)
}
export const transportExcelUploadRequest=  payload => {
    const api = {...TRANSPORT_EXCEL_UPLOAD_API, url: `${TRANSPORT_EXCEL_UPLOAD_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}
export const grnUploadRequest=  payload => {
    return createRequest(GRN_UPLOAD_API, payload.certificate, payload.dto)
}
export const grnExcelUploadRequest=  payload => {
    const api = {...GRN_EXCEL_UPLOAD_API, url: `${GRN_EXCEL_UPLOAD_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}
export const ffUploadRequest=  payload => {
    return createRequest(FF_UPLOAD_API, payload.certificate, payload.dto)
}
export const virtualUploadRequest=  payload => {
    return createRequest(VIRTUAL_UPLOAD_API, payload.certificate, payload.dto)
}
export const invoicesUploadRequest=  payload => {
    return createRequest(INVOICE_UPLOAD_API, payload.certificate, payload.dto)
}
export const invoiceExcelUploadRequest=  payload => {
    const api = {...INVOICE_EXCEL_UPLOAD_API, url: `${INVOICE_EXCEL_UPLOAD_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}
export const virtualSampleRequest=  payload => {
    const api = {...VIRTUAL_SAMPLE_UPLOAD_API, url: `${VIRTUAL_SAMPLE_UPLOAD_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}
export const virtualSampleLogRequest=  payload => {
    const api = {...VIRTUAL_SAMPLE_UPLOAD_LOG_API, url: `${VIRTUAL_SAMPLE_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}
export const ffExcelUploadRequest=  payload => {
    const api = {...FF_EXCEL_UPLOAD_API, url: `${FF_EXCEL_UPLOAD_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}
export const ffUploadLogRequest=  payload => {
    const api = {...FF_UPLOAD_LOG_API, url: `${FF_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}
export const recipientUploadLogRequest=  payload => {
    const api = {...RECIPIENT_UPLOAD_LOG_API, url: `${RECIPIENT_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}
export const nonComplianceUploadLogRequest=  payload => {
    const api = {...NON_COMPLIANCE_UPLOAD_LOG_API, url: `${NON_COMPLIANCE_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const overSamplingUploadLogRequest=  payload => {
    const api = {...OVER_SAMPLING_UPLOAD_LOG_API, url: `${OVER_SAMPLING_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const overSamplingDetailsUploadLogRequest=  payload => {
    const api = {...OVER_SAMPLING_DETAILS_UPLOAD_LOG_API, url: `${OVER_SAMPLING_DETAILS_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const materialExpiryUploadLogRequest=  payload => {
    const api = {...MATERIAL_EXPIRY_UPLOAD_LOG_API, url: `${MATERIAL_EXPIRY_UPLOAD_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const nonComplianceExcelRequest=  payload => {
    const api = {...NON_COMPLIANCE_EXCEL_API, url: `${NON_COMPLIANCE_EXCEL_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}

export const overSamplingExcelRequest=  payload => {
    const api = {...OVER_SAMPLING_EXCEL_API, url: `${OVER_SAMPLING_EXCEL_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}

export const overSamplingDetailsExcelRequest=  payload => {
    const api = {...OVER_SAMPLING_DETAILS_EXCEL_API, url: `${OVER_SAMPLING_DETAILS_EXCEL_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}

export const materialExpiryExcelRequest=  payload => {
    const api = {...MATERIAL_EXPIRY_EXCEL_API, url: `${MATERIAL_EXPIRY_EXCEL_API.url}/${payload.uplId}`}
    return createRequest(api, payload.certificate, null)
}

export const nonComplianceUploadRequest = payload => {
    return createRequest(NON_COMPLIANCE_UPLOAD_API, payload.certificate, payload.dto)
}

export const overSamplingUploadRequest = payload => {
    return createRequest(OVER_SAMPLING_UPLOAD_API, payload.certificate, payload.dto)
}

export const overSamplingDetailsUploadRequest = payload => {
    return createRequest(OVER_SAMPLING_DETAILS_UPLOAD_API, payload.certificate, payload.dto)
}

export const materialExpiryUploadRequest = payload => {
    return createRequest(MATERIAL_EXPIRY_UPLOAD_API, payload.certificate, payload.dto)
}
