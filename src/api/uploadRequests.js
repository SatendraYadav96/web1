import {createRequest} from "./httpUtils";

import {ADD_BUISNESS_UNIT_API, FF_UPLOAD_API, GET_HUB_NEAR_EXPIRY_API, GRN_EXCEL_UPLOAD_API, GRN_UPLOAD_API, INVOICE_UPLOAD_API, TRANSPORT_EXCEL_UPLOAD_API, TRANSPORT_UPLOAD_API, VIRTUAL_UPLOAD_API} from "./apiConstants";

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
