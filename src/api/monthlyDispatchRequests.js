import {createRequest} from './httpUtils';
import {GET_MONTHLY_DISPATCH_API} from "./apiConstants";
import {GET_EMPLOYEE_INVOICE_DETAILS_API} from "./apiConstants";


//monthly dispatch

export const monthlyDispatchRequest = payload => {
    const api = {...GET_MONTHLY_DISPATCH_API, url: `${GET_MONTHLY_DISPATCH_API.url}/${payload.year}/${payload.month}`}
    return createRequest(api, payload.certificate, null)
}


export const employeeInvoiceDetailsRequest = payload => {
    const api = {...GET_EMPLOYEE_INVOICE_DETAILS_API, url: `${GET_EMPLOYEE_INVOICE_DETAILS_API.url}/${payload.year}/${payload.month}/${payload.isSpecialDisp}/${payload.teamId}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}




