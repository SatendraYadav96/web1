import {createRequest} from './httpUtils';
import {GET_DELIVERY_UPDATE_API, GET_GEN_INVOICE_API, GET_GEN_VIRTUAL_INVOICE_API, GET_GENERATE_INVOICE_API, GET_GENERATE_LABEL_API, GET_GROUP_INVOICE_API, GET_INVOICE_DROPDOWN_API, GET_INVOICE_UPLOAD_API, GET_PRINT_INVOICE_API, INVOICE_UPLOAD_API, SEARCH_INVOICE_API} from "./apiConstants";

//monthly dispatch
export const printInvoiceRequest = payload => {
    const api = {...GET_PRINT_INVOICE_API, url: `${GET_PRINT_INVOICE_API.url}`}
    return createRequest(api, payload.certificate, payload.inh)
}

export const searchInvoiceRequest = (payload) => {
    const api = {...SEARCH_INVOICE_API, url: `${SEARCH_INVOICE_API.url}`}
    return createRequest(SEARCH_INVOICE_API, payload.certificate, payload.searchInvoice)
}

export const groupInvoiceRequest = payload => {
    const api = {...GET_GROUP_INVOICE_API, url: `${GET_GROUP_INVOICE_API.url}`}
    return createRequest(GET_GROUP_INVOICE_API, payload.certificate, payload.groupInvoice)
}

export const deliveryUpdateRequest = payload => {
    const api = {...GET_DELIVERY_UPDATE_API, url: `${GET_DELIVERY_UPDATE_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const invoiceUploadRequest = payload => {
    const api = {...GET_INVOICE_UPLOAD_API, url: `${GET_INVOICE_UPLOAD_API.url}`}
    return createRequest(api, payload.certificate, )
}

export const invoiceUploadCsvRequest = payload => {
    const api = {...INVOICE_UPLOAD_API, url: `${INVOICE_UPLOAD_API.url}`}
    return createRequest(api, payload.certificate, payload.dto)
}

export const generateInvoiceRequest = payload => {
    const api = {...GET_GENERATE_INVOICE_API, url: `${GET_GENERATE_INVOICE_API.url}`}
    return createRequest(api, payload.certificate, payload.inh)
}

export const genInvoiceRequest = payload => {
    const api = {...GET_GEN_INVOICE_API, url: `${GET_GEN_INVOICE_API.url}`}
    return createRequest(api, payload.certificate, payload.genInv)
}

export const genVirtualInvoiceRequest = payload => {
    const api = {...GET_GEN_VIRTUAL_INVOICE_API, url: `${GET_GEN_VIRTUAL_INVOICE_API.url}`}
    return createRequest(api, payload.certificate, payload.genInv)
}

export const generateLabelRequest = payload => {
    const api = {...GET_GENERATE_LABEL_API, url: `${GET_GENERATE_LABEL_API.url}`}
    return createRequest(api, payload.certificate, payload.inh)
}

