import {createRequest} from './httpUtils';
import {
    DISTRIBUTION_PLAN_INVENTORY_API, GET_ACTIVE_USERS_API,
    GET_ALLOCATIONS_FOR_PLAN, GET_BLOCKED_RECIPIENTS_API, GET_DOWNLOAD_ALLOCATION_API,
    GET_ITEMS_TO_ALLOCATE_API,
    MONTHLY_ALLOCATION_START_API,
    MONTHLY_COMMON_ALLOCATION_SAVE_API,
    MONTHLY_COMMON_TEAM_API,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_API,
    MONTHLY_DIFFERENTIAL_TEAM_API, MONTHLY_QUANTITY_ALLOCATED_DIFFERENTIAL_RECIPIENT_API,
    MONTHLY_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API, SEARCH_SPECIAL_PLAN_API, VIRTUAL_ALLOCATION_START_API, VIRTUAL_COMMON_ALLOCATION_SAVE_API, VIRTUAL_COMMON_TEAM_API
} from "./apiConstants";

export const itemsToAllocateListRequest = payload => {
    return createRequest(GET_ITEMS_TO_ALLOCATE_API, payload.certificate, null)
}

export const allocationsForPlanRequest = payload => {
    const api = {...GET_ALLOCATIONS_FOR_PLAN, url: `${GET_ALLOCATIONS_FOR_PLAN.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyPlanCreateViewRequest=  payload => {
    const api = {...MONTHLY_ALLOCATION_START_API, url: `${MONTHLY_ALLOCATION_START_API.url}/${payload.year}/${payload.month}`}
    return createRequest(api, payload.certificate, null)
}

export const virtualPlanCreateViewRequest=  payload => {
    const api = {...VIRTUAL_ALLOCATION_START_API, url: `${VIRTUAL_ALLOCATION_START_API.url}/${payload.year}/${payload.month}`}
    return createRequest(api, payload.certificate, null)
}

export const distributionForPlanRequest = payload => {
    const api = {...DISTRIBUTION_PLAN_INVENTORY_API, url: `${DISTRIBUTION_PLAN_INVENTORY_API.url}/${payload.planId}/${payload.inventoryId}`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyCommonTeamRequest = payload => {
    const api = {...MONTHLY_COMMON_TEAM_API, url: `${MONTHLY_COMMON_TEAM_API.url}/${payload.ccmId}`}
    console.log(api)
    return createRequest(api, payload.certificate, null)
}

export const VirtualCommonTeamRequest = payload => {
    const api = {...VIRTUAL_COMMON_TEAM_API, url: `${VIRTUAL_COMMON_TEAM_API.url}/${payload.ccmId}`}
    console.log(api)
    return createRequest(api, payload.certificate, null)
}

export const monthlyDifferentialTeamRequest = payload => {
    const api = {...MONTHLY_DIFFERENTIAL_TEAM_API, url: `${MONTHLY_DIFFERENTIAL_TEAM_API.url}/${payload.planId}/${payload.teamId}/${payload.inventoryId}`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyQuantityAllocatedOfUserToItemRequest = payload => {
    const api = {...MONTHLY_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API, url: `${MONTHLY_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API.url}/${payload.userId}/${payload.inventoryId}/${payload.month}/${payload.year}/0`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyQuantityAllocatedDifferentialRecipientRequest = payload => {
    const api = {...MONTHLY_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API, url: `${MONTHLY_QUANTITY_ALLOCATED_DIFFERENTIAL_RECIPIENT_API.url}/${payload.planId}/${payload.inventoryId}/${payload.teamId}`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyCommonAllocationSaveRequest = payload => {
    return createRequest(MONTHLY_COMMON_ALLOCATION_SAVE_API, payload.certificate, payload.data)
}

export const virtualCommonAllocationSaveRequest = payload => {
    return createRequest(VIRTUAL_COMMON_ALLOCATION_SAVE_API, payload.certificate, payload.data)
}

export const monthlyDifferentialAllocationSaveRequest = payload => {
    return createRequest(MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_API, payload.certificate, payload.data)
}

export const getDownloadAllocationRequest = payload => {
    const api = {...GET_DOWNLOAD_ALLOCATION_API, url: `${GET_DOWNLOAD_ALLOCATION_API.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}

export const getBlockedRecipientRequest = payload => {
    const api = {...GET_BLOCKED_RECIPIENTS_API, url: `${GET_BLOCKED_RECIPIENTS_API.url}/${payload.code}`}
    return createRequest(api, payload.certificate, null)
}

export const getActiveUsersRequest = payload => {
    const api = {...GET_ACTIVE_USERS_API, url: `${GET_ACTIVE_USERS_API.url}/${payload.userId}`}
    return createRequest(api, payload.certificate, null)
}

export const searchSpecialPlanRequest = payload => {
    const api = {...SEARCH_SPECIAL_PLAN_API, url: `${SEARCH_SPECIAL_PLAN_API.url}/${payload.month}/${payload.year}/${payload.status}/${payload.remark}`}
    return createRequest(api, payload.certificate, null)
}
