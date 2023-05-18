import {createRequest} from './httpUtils';
import {GET_BRAND_DROPDOWN_API, GET_BUSINESS_UNIT_DROPDOWN_API, GET_COST_CENTER_DROPDOWN_API, GET_DIVISION_DROPDOWN_API, GET_INVOICE_DROPDOWN_API, GET_RECIPIENT_DROPDOWN_API, GET_TEAM_DROPDOWN_API, GET_TRANSPORT_DROPDOWN_API} from "./apiConstants";

//DROPDOWN
export const businessUnitDropDownRequest = payload => {
    const api = {...GET_BUSINESS_UNIT_DROPDOWN_API, url: `${GET_BUSINESS_UNIT_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const brandDropDownRequest = payload => {
    const api = {...GET_BRAND_DROPDOWN_API, url: `${GET_BRAND_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const divisionDropDownRequest = payload => {
    const api = {...GET_DIVISION_DROPDOWN_API, url: `${GET_DIVISION_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const teamDropDownRequest = payload => {
    const api = {...GET_TEAM_DROPDOWN_API, url: `${GET_TEAM_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const costCenterDropDownRequest = payload => {
    const api = {...GET_COST_CENTER_DROPDOWN_API, url: `${GET_COST_CENTER_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const recipientDropDownRequest = payload => {
    const api = {...GET_RECIPIENT_DROPDOWN_API, url: `${GET_RECIPIENT_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const invoiceRequest = payload => {
    const api = {...GET_INVOICE_DROPDOWN_API, url: `${GET_INVOICE_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const transportDropdownRequest = payload => {
    const api = {...GET_TRANSPORT_DROPDOWN_API, url: `${GET_TRANSPORT_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

