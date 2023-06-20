import {createRequest} from "./httpUtils";

import {ADD_BUISNESS_UNIT_API, TRANSPORT_UPLOAD_API} from "./apiConstants";

export const transportUploadRequest=  payload => {
    return createRequest(TRANSPORT_UPLOAD_API, payload.certificate, payload.dto)
}
