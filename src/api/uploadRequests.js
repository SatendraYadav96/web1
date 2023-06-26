import {createRequest} from "./httpUtils";

import {ADD_BUISNESS_UNIT_API, FF_UPLOAD_API, GRN_UPLOAD_API, TRANSPORT_UPLOAD_API, VIRTUAL_UPLOAD_API} from "./apiConstants";

export const transportUploadRequest=  payload => {
    return createRequest(TRANSPORT_UPLOAD_API, payload.certificate, payload.dto)
}
export const grnUploadRequest=  payload => {
    return createRequest(GRN_UPLOAD_API, payload.certificate, payload.dto)
}
export const ffUploadRequest=  payload => {
    return createRequest(FF_UPLOAD_API, payload.certificate, payload.dto)
}
export const virtualUploadRequest=  payload => {
    return createRequest(VIRTUAL_UPLOAD_API, payload.certificate, payload.dto)
}
