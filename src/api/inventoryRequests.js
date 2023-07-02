import {ADD_SAMPLES_API, EDIT_BLOCK_ITEM_REPORT_API, EDIT_SAMPLES_API, EDIT_UNIT_ALLOCATION_REPORT_API, EXPORT_ALLOCATION_API, GET_INVENTORY_REPORT_API, GET_INVENTORY_REVERSAL_HISTORY_REPORT_API, GET_RECIPIENT_REPORT_API, REVERSE_INVENTORY_API, SWITCH_INVENTORY_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const inventoryReportRequest = payload => {
  const api = {...GET_INVENTORY_REPORT_API, url: `${GET_INVENTORY_REPORT_API.url}/${payload.isExhausted}`}
  return createRequest(api, payload.certificate, null)
}
export const inventoryReversalHistoryRequest = payload => {
  const api = {...GET_INVENTORY_REVERSAL_HISTORY_REPORT_API, url: `${GET_INVENTORY_REVERSAL_HISTORY_REPORT_API.url}/${payload.invId}`}
  return createRequest(api, payload.certificate, null)
}

export const editUnitAllocationRequest=  payload => {
    const api = {...EDIT_UNIT_ALLOCATION_REPORT_API, url: `${EDIT_UNIT_ALLOCATION_REPORT_API.url}/${payload.invId}`}
    return createRequest(api, payload.certificate, payload.inv)
}

export const editBlockItemRequest=  payload => {
    const api = {...EDIT_BLOCK_ITEM_REPORT_API, url: `${EDIT_BLOCK_ITEM_REPORT_API.url}/${payload.invId}`}
    return createRequest(api, payload.certificate, payload.inv)
}

export const reverseInventory=  payload => {
    return createRequest(REVERSE_INVENTORY_API, payload.certificate, payload.inv)
}
export const switchInventory=  payload => {
    return createRequest(SWITCH_INVENTORY_API, payload.certificate, payload.inv)
}

export const exportAllocation =  payload => {
    const api = {...EXPORT_ALLOCATION_API, url: `${EXPORT_ALLOCATION_API.url}/${payload.year}/${payload.month}/${payload.teamId}/${payload.status}/${payload.planId}/${payload.isVirtual}/${payload.isSpecial}`}
    return createRequest(api, payload.certificate, null)
}
