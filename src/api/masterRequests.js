import {createRequest} from './httpUtils';
import {GET_VENDOR_API, ADD_VENDOR_API, EDIT_VENDOR_API, GET_VENDOR_BY_ID_API, VENDOR_BY_ID_API} from "./apiConstants";

//VENDOR

export const vendorRequest = payload => {
    const api = {...GET_VENDOR_API, url: `${GET_VENDOR_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const addVendorRequest=  payload => {
    return createRequest(ADD_VENDOR_API, payload.certificate, payload.vnd)
}

export const editVendorRequest=  payload => {
    const api = {...EDIT_VENDOR_API, url: `${EDIT_VENDOR_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, payload.vnd)
}

export const vendorByIdRequest = payload => {
    const api = {...VENDOR_BY_ID_API, url: `${VENDOR_BY_ID_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, null)
}

