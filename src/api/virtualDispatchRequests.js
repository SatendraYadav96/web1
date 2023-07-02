import {createRequest} from './httpUtils';
import {GET_VIRTUAL_DISPATCH_API, GET_VIRTUAL_DISPATCH_DETAILS_API} from "./apiConstants";
import {getVirtualDispatchDetailsStartEpic} from "../redux/epics";



//virtual dispatch

export const virtualDispatchRequest = payload => {
    const api = {...GET_VIRTUAL_DISPATCH_API, url: `${GET_VIRTUAL_DISPATCH_API.url}/${payload.year}/${payload.month}`}
    return createRequest(api, payload.certificate, null)
}



export const virtualDispatchDetailsRequest = payload => {
    const api = {...GET_VIRTUAL_DISPATCH_DETAILS_API, url: `${GET_VIRTUAL_DISPATCH_DETAILS_API.url}/${payload.planId}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}



