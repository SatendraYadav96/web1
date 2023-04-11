import {createRequest} from './httpUtils';
import {GET_BRAND_DROPDOWN_API, GET_BUSINESS_UNIT_DROPDOWN_API} from "./apiConstants";

//VENDOR

export const businessUnitDropDownRequest = payload => {
    const api = {...GET_BUSINESS_UNIT_DROPDOWN_API, url: `${GET_BUSINESS_UNIT_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const brandDropDownRequest = payload => {
    const api = {...GET_BRAND_DROPDOWN_API, url: `${GET_BRAND_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}
