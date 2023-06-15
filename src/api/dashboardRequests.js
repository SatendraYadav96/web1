import {GET_HUB_GRN_ERROR_LOG_API, GET_HUB_NEAR_EXPIRY_API, GET_HUB_PENDING_REVALIDATION_API, GET_ITEM_EXPIRED_DETAILS_API, GET_MANAGEMENT_DASHBOARD_API, GET_PENDING_DISPATCH_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const pendingDispatchRequest = payload => {
    const api = {...GET_PENDING_DISPATCH_API, url: `${GET_PENDING_DISPATCH_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const hubNearExpiryRequest = payload => {
    const api = {...GET_HUB_NEAR_EXPIRY_API, url: `${GET_HUB_NEAR_EXPIRY_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const hubPendingRevalidationRequest = payload => {
    const api = {...GET_HUB_PENDING_REVALIDATION_API, url: `${GET_HUB_PENDING_REVALIDATION_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const hubGrnErrorLogRequest = payload => {
    const api = {...GET_HUB_GRN_ERROR_LOG_API, url: `${GET_HUB_GRN_ERROR_LOG_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const itemExpiredDetailsRequest = payload => {
    const api = {...GET_ITEM_EXPIRED_DETAILS_API, url: `${GET_ITEM_EXPIRED_DETAILS_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const managementDashboardRequest = payload => {
    const api = {...GET_MANAGEMENT_DASHBOARD_API, url: `${GET_MANAGEMENT_DASHBOARD_API.url}/${payload.month}/${payload.year}/${payload.toMonth}/${payload.toYear}/${payload.type}`}
    return createRequest(api, payload.certificate, null)
}

