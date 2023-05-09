import {createRequest} from './httpUtils';
import { GET_PRINT_INVOICE_API, SEARCH_INVOICE_API} from "./apiConstants";

//monthly dispatch
export const printInvoiceRequest = payload => {
    const api = {...GET_PRINT_INVOICE_API, url: `${GET_PRINT_INVOICE_API.url}/${payload.inhId}`}
    return createRequest(api, payload.certificate, payload.inh)
}

export const searchInvoiceRequest = (payload) => {
    const api = {...SEARCH_INVOICE_API, url: `${SEARCH_INVOICE_API.url}`}

    console.log(payload.searchInvoice)
    return createRequest(SEARCH_INVOICE_API, payload.certificate, payload.searchInvoice)


}
