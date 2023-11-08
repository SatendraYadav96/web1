import {GET_COMPLIANCE_DETAILS_API, GET_MAIL_LOG_API, GET_MONTHLY_APPROVAL_API, GET_NON_COMPLIANCE_API, OVER_SAMPLING_DETAILS_DATA_API, SAVE_MASTER_BLOCKED_RECIPIENT, SAVE_NON_COMPLIANCE_ADMIN_REMARK_API, SAVE_OVER_SAMPLING_API} from "./apiConstants";
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
export const saveNonComplianceAdminRemarkRequest = payload => {
    return createRequest(SAVE_NON_COMPLIANCE_ADMIN_REMARK_API, payload.certificate, payload.nonComp)
}
export const saveOverSamplingRequest = payload => {
    return createRequest(SAVE_OVER_SAMPLING_API, payload.certificate, payload.data)
}

export const overSamplingDetailsDataRequest = payload =>{
    const api = {...OVER_SAMPLING_DETAILS_DATA_API, url:`${OVER_SAMPLING_DETAILS_DATA_API.url}/${payload.month}/${payload.year}/${payload.ffTerritory}/${payload.personCode}`}
    return createRequest(api, payload.certificate, null)
}

export const saveMasterBlockedRecipientRequest = payload => {
    return createRequest(SAVE_MASTER_BLOCKED_RECIPIENT, payload.certificate, payload.data)
}
