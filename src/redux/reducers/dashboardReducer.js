import {createReducer} from "./reducerUtils";
import {
    HUB_NEAR_EXPIRY_FAIL_ACTION,
    HUB_NEAR_EXPIRY_SUCCESS_ACTION,
    HUB_PENDING_REVALIDATION_FAIL_ACTION,
    HUB_PENDING_REVALIDATION_SUCCESS_ACTION,
    HUB_GRN_ERROR_LOG_FAIL_ACTION,
    HUB_GRN_ERROR_LOG_SUCCESS_ACTION,
    ITEM_EXPIRED_DETAILS_FAIL_ACTION,
    ITEM_EXPIRED_DETAILS_SUCCESS_ACTION,
    PENDING_DISPATCH_SUCCESS_ACTION,
    PENDING_DISPATCH_FAIL_ACTION, MANAGEMENT_DASHBOARD_SUCCESS_ACTION, MANAGEMENT_DASHBOARD_FAIL_ACTION
} from "../actions/dashboard/dashboardActionConstants";

const initialState = {
    pendingDispatch: [],
    pendingDispatchLoading: false,
    hubNearExpiry: [],
    hubNearExpiryLoading: false,
    hubPendingRevalidation: [],
    hubPendingRevalidationLoading: false,
    hubGrnErrorLog: [],
    hubGrnErrorLogLoading: false,
    itemExpiredDetails: [],
    itemExpiredDetailsLoading: false,
    managementDashboard: [],
    managementDashboardLoading: false,
    error: null,
}

//HUB_NEAR_EXPIRY
const pendingDispatchSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        pendingDispatch: payload.pendingDispatchDropdown,
        pendingDispatchLoading: false,
        error: null

    }
}

const pendingDispatchFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        pendingDispatch:[],
        error: payload.error,
        pendingDispatchLoading: false,
    }
}


//HUB_NEAR_EXPIRY

const hubNearExpirySuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubNearExpiry: payload.hubNearExpiryDropdown,
        hubNearExpiryLoading: false,
        error: null

    }
}

const hubNearExpiryFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubNearExpiry:[],
        error: payload.error,
        hubNearExpiryLoading: false,
    }
}


//HUB_PENDING_REVALIDATION

const hubPendingRevalidationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubPendingRevalidation: payload.hubPendingRevalidation,
        hubPendingRevalidationLoading: false,
        error: null

    }
}

const hubPendingRevalidationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubPendingRevalidation:[],
        error: payload.error,
        hubPendingRevalidationLoading: false,
    }
}


//HUB_GRN_ERROR_LOG

const hubGrnErrorLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubGrnErrorLog: payload.hubGrnErrorLog,
        hubGrnErrorLogLoading: false,
        error: null

    }
}

const hubGrnErrorLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        hubGrnErrorLog:[],
        error: payload.error,
        hubGrnErrorLogLoading: false,
    }
}


//ITEM_EXPIRED_DETAILS

const itemExpiredDetailsSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        itemExpiredDetails: payload.itemExpiredDetailsList,
        itemExpiredDetailsLoading: false,
        error: null

    }
}

const itemExpiredDetailsFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        itemExpiredDetails:[],
        error: payload.error,
        itemExpiredDetailsLoading: false,
    }
}


//MANAGEMENT_DASHBOARD

const managementDashboardSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        managementDashboard: payload.managementDashboardList,
        managementDashboardLoading: false,
        error: null

    }
}

const managementDashboardFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        managementDashboard:[],
        error: payload.error,
        managementDashboardLoading: false,
    }
}

export default createReducer(initialState, {
    [PENDING_DISPATCH_SUCCESS_ACTION]: pendingDispatchSuccessReducer,
    [PENDING_DISPATCH_FAIL_ACTION]: pendingDispatchFailReducer,
    [HUB_NEAR_EXPIRY_SUCCESS_ACTION]: hubNearExpirySuccessReducer,
    [HUB_NEAR_EXPIRY_FAIL_ACTION]: hubNearExpiryFailReducer,
    [HUB_PENDING_REVALIDATION_SUCCESS_ACTION]: hubPendingRevalidationSuccessReducer,
    [HUB_PENDING_REVALIDATION_FAIL_ACTION]: hubPendingRevalidationFailReducer,
    [HUB_GRN_ERROR_LOG_SUCCESS_ACTION]: hubGrnErrorLogSuccessReducer,
    [HUB_GRN_ERROR_LOG_FAIL_ACTION]: hubGrnErrorLogFailReducer,
    [ITEM_EXPIRED_DETAILS_SUCCESS_ACTION]: itemExpiredDetailsSuccessReducer,
    [ITEM_EXPIRED_DETAILS_FAIL_ACTION]: itemExpiredDetailsFailReducer,
    [MANAGEMENT_DASHBOARD_SUCCESS_ACTION]: managementDashboardSuccessReducer,
    [MANAGEMENT_DASHBOARD_FAIL_ACTION]: managementDashboardFailReducer,
})
