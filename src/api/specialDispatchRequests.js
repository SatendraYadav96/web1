import {createRequest} from './httpUtils';
import {GET_SPECIAL_DISPATCH_API,GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_API} from "./apiConstants";



//special dispatch

export const specialDispatchRequest = payload => {
    const api = {...GET_SPECIAL_DISPATCH_API, url: `${GET_SPECIAL_DISPATCH_API.url}/${payload.year}/${payload.month}`}
    return createRequest(api, payload.certificate, null)
}



export const specialEmployeeInvoiceDetailsRequest = payload => {
    const api = {...GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_API, url: `${GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_API.url}/${payload.planId}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}



