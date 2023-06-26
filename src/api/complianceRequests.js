import {GET_COMPLIANCE_DETAILS_API, GET_MAIL_LOG_API, GET_MONTHLY_APPROVAL_API, GET_NON_COMPLIANCE_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const nonComplianceRequest = payload => {
    const api = {...GET_NON_COMPLIANCE_API, url: `${GET_NON_COMPLIANCE_API.url}/${payload.statusType}/${payload.month}/${payload.year}`}
    return createRequest(api, payload.certificate, null)
}
export const complianceDetailsRequest = payload => {
    const api = {...GET_COMPLIANCE_DETAILS_API, url: `${GET_COMPLIANCE_DETAILS_API.url}/${payload.month}/${payload.year}`}
    return createRequest(api, payload.certificate, null)
}
export const optimalMailLogRequest = payload => {
    const api = {...GET_MAIL_LOG_API, url: `${GET_MAIL_LOG_API.url}/${payload.type}/${payload.month}/${payload.year}`}
    return createRequest(api, payload.certificate, null)
}
