import {GET_INVENTORY_REPORT_API, GET_RECIPIENT_REPORT_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const inventoryReportRequest = payload => {
  const api = {...GET_INVENTORY_REPORT_API, url: `${GET_INVENTORY_REPORT_API.url}/${payload.isExhausted}/${payload.isPopup}`}
  return createRequest(api, payload.certificate, null)
}
