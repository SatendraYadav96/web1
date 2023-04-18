import {EDIT_BLOCK_ITEM_REPORT_API, EDIT_SAMPLES_API, EDIT_UNIT_ALLOCATION_REPORT_API, GET_INVENTORY_REPORT_API, GET_INVENTORY_REVERSAL_HISTORY_REPORT_API, GET_RECIPIENT_REPORT_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const inventoryReportRequest = payload => {
  const api = {...GET_INVENTORY_REPORT_API, url: `${GET_INVENTORY_REPORT_API.url}/${payload.isExhausted}/${payload.isPopup}`}
  return createRequest(api, payload.certificate, null)
}
export const inventoryReversalHistoryRequest = payload => {
  const api = {...GET_INVENTORY_REVERSAL_HISTORY_REPORT_API, url: `${GET_INVENTORY_REVERSAL_HISTORY_REPORT_API.url}/${payload.invId}`}
  return createRequest(api, payload.certificate, null)
}
export const editUnitAllocationRequest=  payload => {
    const api = {...EDIT_UNIT_ALLOCATION_REPORT_API, url: `${EDIT_UNIT_ALLOCATION_REPORT_API.url}/${payload.invId}`}
    return createRequest(api, payload.certificate, payload.isUnitAllocation)
}
export const editBlockItemRequest=  payload => {
    const api = {...EDIT_BLOCK_ITEM_REPORT_API, url: `${EDIT_BLOCK_ITEM_REPORT_API.url}/${payload.invId}`}
    return createRequest(api, payload.certificate, payload.invId, payload.isBlockItem)
}
