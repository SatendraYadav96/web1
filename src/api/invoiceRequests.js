import {createRequest} from './httpUtils';
import {GET_GROUP_INVOICE_API, GET_INVOICE_DROPDOWN_API, GET_PRINT_INVOICE_API, SEARCH_INVOICE_API} from "./apiConstants";

//monthly dispatch
export const printInvoiceRequest = payload => {
    const api = {...GET_PRINT_INVOICE_API, url: `${GET_PRINT_INVOICE_API.url}/${payload.inhId}`}
    return createRequest(api, payload.certificate, payload.inh)
}

export const searchInvoiceRequest = (payload) => {
    const api = {...SEARCH_INVOICE_API, url: `${SEARCH_INVOICE_API.url}`}
    return createRequest(SEARCH_INVOICE_API, payload.certificate, payload.searchInvoice)
}

export const groupInvoiceRequest = payload => {
    const api = {...GET_GROUP_INVOICE_API, url: `${GET_GROUP_INVOICE_API.url}`}
    return createRequest(api, payload.certificate, payload.groupInvoice)
}
