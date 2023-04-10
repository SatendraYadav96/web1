import {createRequest} from './httpUtils';
import {GET_BUSINESS_UNIT_DROPDOWN_API} from "./apiConstants";

//VENDOR

export const businessUnitDropDownRequest = payload => {
    const api = {...GET_BUSINESS_UNIT_DROPDOWN_API, url: `${GET_BUSINESS_UNIT_DROPDOWN_API.url}`}
    return createRequest(api, payload.certificate, null)
}
