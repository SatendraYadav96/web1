import {createRequest} from './httpUtils';
import {DISTRIBUTION_PLAN_INVENTORY_API, GET_ALLOCATIONS_FOR_PLAN, GET_ITEMS_TO_ALLOCATE_API, MONTHLY_ALLOCATION_START_API} from "./apiConstants";

export const itemsToAllocateListRequest = payload => {
    return createRequest(GET_ITEMS_TO_ALLOCATE_API, payload.certificate, null)
}

export const allocationsForPlanRequest = payload => {
    const api = {...GET_ALLOCATIONS_FOR_PLAN, url: `${GET_ALLOCATIONS_FOR_PLAN.url}/${payload.planId}`}
    return createRequest(api, payload.certificate, null)
}

export const monthlyPlanCreateViewRequest=  payload => {
    return createRequest(MONTHLY_ALLOCATION_START_API, payload.certificate, payload.yearMonth)
}

export const distributionForPlanRequest = payload => {
    const api = {...DISTRIBUTION_PLAN_INVENTORY_API, url: `${DISTRIBUTION_PLAN_INVENTORY_API.url}/${payload.planId}/${payload.inventoryId}`}
    return createRequest(api, payload.certificate, null)
}
