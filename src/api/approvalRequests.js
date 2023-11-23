
//APPROVAL
import {
    APPROVE_PLAN_API,
    GET_MONTHLY_APPROVAL_API,
    GET_MONTHLY_APPROVAL_DETAILS_API,
    GET_SPECIAL_PLAN_APPROVAL_API,
    GET_SPECIAL_PLAN_DETAILS_APPROVAL_DETAILS_API, GET_VIRTUAL_APPROVAL_DOWNLOAD_API,
    GET_VIRTUAL_PLAN_APPROVAL_API,
    GET_VIRTUAL_PLAN_DETAILS_APPROVAL_DETAILS_API,
    MONTHLY_TO_SPECIAL_API,
    REJECT_PLAN_API,
    RESET_PLAN_API,
    UNLOCK_PLAN_API
} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const monthlyApprovalRequest = payload => {
    const api = {...GET_MONTHLY_APPROVAL_API, url: `${GET_MONTHLY_APPROVAL_API.url}/${payload.month}/${payload.year}/${payload.userId}/${payload.userDesgId}`}
    return createRequest(api, payload.certificate, null)
}
export const monthlyApprovalDetailsRequest = payload => {
    const api = {...GET_MONTHLY_APPROVAL_DETAILS_API, url: `${GET_MONTHLY_APPROVAL_DETAILS_API.url}/${payload.userId}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}
export const resetPlanRequest = payload => {
    const api = {...RESET_PLAN_API, url: `${RESET_PLAN_API.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}
export const unlockPlanRequest = payload => {
    const api = {...UNLOCK_PLAN_API, url: `${UNLOCK_PLAN_API.url}`}
    return createRequest(api, payload.certificate, payload.plan)
}
export const approvePlanRequest = payload => {
    const api = {...APPROVE_PLAN_API, url: `${APPROVE_PLAN_API.url}`}
    return createRequest(api, payload.certificate, payload.plan)
}
export const rejectPlanRequest = payload => {
    const api = {...REJECT_PLAN_API, url: `${REJECT_PLAN_API.url}`}
    return createRequest(api, payload.certificate, payload.plan)
}
export const getVirtualApprovalDownload = payload => {
    return createRequest(GET_VIRTUAL_APPROVAL_DOWNLOAD_API, payload.certificate, payload.data)
}
export const monthlyToSpecialRequest = payload => {
    const api = {...MONTHLY_TO_SPECIAL_API, url: `${MONTHLY_TO_SPECIAL_API.url}`}
    return createRequest(api, payload.certificate, payload.plan)
}
export const specialPlanApprovalRequest = payload => {
    const api = {...GET_SPECIAL_PLAN_APPROVAL_API, url: `${GET_SPECIAL_PLAN_APPROVAL_API.url}/${payload.month}/${payload.year}/${payload.userId}/${payload.userDesgId}`}
    return createRequest(api, payload.certificate, null)
}
export const specialPlanApprovalDetailsRequest = payload => {
    const api = {...GET_SPECIAL_PLAN_DETAILS_APPROVAL_DETAILS_API, url: `${GET_SPECIAL_PLAN_DETAILS_APPROVAL_DETAILS_API.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}
export const virtualPlanApprovalRequest = payload => {
    const api = {...GET_VIRTUAL_PLAN_APPROVAL_API, url: `${GET_VIRTUAL_PLAN_APPROVAL_API.url}/${payload.month}/${payload.year}/${payload.userId}/${payload.userDesgId}`}
    return createRequest(api, payload.certificate, null)
}
export const virtualPlanApprovalDetailsRequest = payload => {
    const api = {...GET_VIRTUAL_PLAN_DETAILS_APPROVAL_DETAILS_API, url: `${GET_VIRTUAL_PLAN_DETAILS_APPROVAL_DETAILS_API.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}
