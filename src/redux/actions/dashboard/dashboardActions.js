import {
    HUB_GRN_ERROR_LOG_FAIL_ACTION,
    HUB_GRN_ERROR_LOG_START_ACTION, HUB_GRN_ERROR_LOG_SUCCESS_ACTION,
    HUB_NEAR_EXPIRY_FAIL_ACTION,
    HUB_NEAR_EXPIRY_START_ACTION,
    HUB_NEAR_EXPIRY_SUCCESS_ACTION,
    HUB_PENDING_REVALIDATION_FAIL_ACTION,
    HUB_PENDING_REVALIDATION_START_ACTION, HUB_PENDING_REVALIDATION_SUCCESS_ACTION, ITEM_EXPIRED_DETAILS_FAIL_ACTION, ITEM_EXPIRED_DETAILS_START_ACTION, ITEM_EXPIRED_DETAILS_SUCCESS_ACTION, MANAGEMENT_DASHBOARD_FAIL_ACTION, MANAGEMENT_DASHBOARD_START_ACTION, MANAGEMENT_DASHBOARD_SUCCESS_ACTION,
    PENDING_DISPATCH_FAIL_ACTION,
    PENDING_DISPATCH_START_ACTION,
    PENDING_DISPATCH_SUCCESS_ACTION
} from "./dashboardActionConstants";

//PENDING_DISPATCH
export const pendingDispatchStartAction = (payload) => (dispatch) => {
    dispatch({
        type: PENDING_DISPATCH_START_ACTION,
        payload: payload,
    })
}

export const pendingDispatchSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: PENDING_DISPATCH_SUCCESS_ACTION,
        payload: payload,
    })
}

export const pendingDispatchFailAction = (payload) => (dispatch) => {
    dispatch({
        type: PENDING_DISPATCH_FAIL_ACTION,
        payload: payload,
    })
}


//HUB_NEAR_EXPIRY
export const hubNearExpiryStartAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_NEAR_EXPIRY_START_ACTION,
        payload: payload,
    })
}

export const hubNearExpirySuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_NEAR_EXPIRY_SUCCESS_ACTION,
        payload: payload,
    })
}
export const hubNearExpiryFailAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_NEAR_EXPIRY_FAIL_ACTION,
        payload: payload,
    })
}


//HUB_GRN_ERROR_LOG
export const hubPendingRevalidationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_PENDING_REVALIDATION_START_ACTION,
        payload: payload,
    })
}

export const hubPendingRevalidationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_PENDING_REVALIDATION_SUCCESS_ACTION,
        payload: payload,
    })
}

export const hubPendingRevalidationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_PENDING_REVALIDATION_FAIL_ACTION,
        payload: payload,
    })
}


//HUB_GRN_ERROR_LOG
export const hubGrnErrorLogStartAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_GRN_ERROR_LOG_START_ACTION,
        payload: payload,
    })
}

export const hubGrnErrorLogSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_GRN_ERROR_LOG_SUCCESS_ACTION,
        payload: payload,
    })
}

export const hubGrnErrorLogFailAction = (payload) => (dispatch) => {
    dispatch({
        type: HUB_GRN_ERROR_LOG_FAIL_ACTION,
        payload: payload,
    })
}


//ITEM_EXPIRED_DETAILS
export const itemExpiredDetailsStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ITEM_EXPIRED_DETAILS_START_ACTION,
        payload: payload,
    })
}


export const itemExpiredDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ITEM_EXPIRED_DETAILS_SUCCESS_ACTION,
        payload: payload,
    })
}

export const itemExpiredDetailsFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ITEM_EXPIRED_DETAILS_FAIL_ACTION,
        payload: payload,
    })
}


//MANAGEMENT_DASHBOARD
export const managementDashboardStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MANAGEMENT_DASHBOARD_START_ACTION,
        payload: payload,
    })
}

export const managementDashboardSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MANAGEMENT_DASHBOARD_SUCCESS_ACTION,
        payload: payload,
    })
}

export const managementDashboardFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MANAGEMENT_DASHBOARD_FAIL_ACTION,
        payload: payload,
    })
}
