import {createRequest} from './httpUtils';
import {APPROVE_ACKNOWLEDGE_API, GET_UNACKNOWLEDGE_LIST_API, REJECT_ACKNOWLEDGE_API, GRN_UPLOAD_API, GET_ITEM_CODE_API, GRN_API} from "./apiConstants";

export const unacknowledgeListRequest = payload => {
    const api = {...GET_UNACKNOWLEDGE_LIST_API, url: `${GET_UNACKNOWLEDGE_LIST_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const rejectAcknowledgeRequest = payload =>{
    let api = {...REJECT_ACKNOWLEDGE_API, url: `${REJECT_ACKNOWLEDGE_API.url}/${payload.id}/${payload.reason}`};
    return createRequest(api, payload.certificate, null)
}

export const approveAcknowledgeRequest = payload => {
    return createRequest(APPROVE_ACKNOWLEDGE_API, payload.certificate, payload.data)
}

// export const grnUploadRequest = payload => {
//     return createRequest(GRN_UPLOAD_API, payload.certificate,null)
// }

export const grnRequest = payload => {
    const api = {...GRN_API, url: `${GRN_API.url}`}
    return createRequest(api, payload.certificate, null)
}
